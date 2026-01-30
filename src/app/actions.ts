'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase-server'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
const prisma = globalForPrisma.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// --- 1. FETCHING ACTIONS ---

// Get ALL Active Items (For Map)
export async function getScrapItems() {
  try {
    const items = await prisma.scrapItem.findMany({
      where: { status: 'ACTIVE' },
      orderBy: { createdAt: 'desc' }
    })
    return items
  } catch (error) {
    console.error("Error fetching map items:", error)
    return []
  }
}

// Get SELLER'S Items (My Listings)
export async function getMyListings() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  try {
    return await prisma.scrapItem.findMany({
      where: { sellerId: user.id },
      orderBy: { createdAt: 'desc' }
    })
  } catch (error) {
    return []
  }
}

// Get COLLECTOR'S Jobs (My Jobs)
export async function getCollectorJobs() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  try {
    return await prisma.scrapItem.findMany({
      where: { collectorId: user.id },
      orderBy: { createdAt: 'desc' }
    })
  } catch (error) {
    return []
  }
}

// --- 2. MUTATION ACTIONS ---

export async function createScrapItem(formData: FormData) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Unauthorized")

    await prisma.scrapItem.create({
      data: {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        wasteType: formData.get('wasteType') as any,
        estimatedWeight: parseFloat(formData.get('estimatedWeight') as string),
        latitude: parseFloat(formData.get('latitude') as string),
        longitude: parseFloat(formData.get('longitude') as string),
        address: formData.get('address') as string,
        imageUrl: formData.get('imageUrl') as string || "",
        status: 'ACTIVE',
        seller: { connect: { id: user.id } }
      }
    })

    revalidatePath('/')
    revalidatePath('/seller/dashboard')
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, error: "Failed to create" }
  }
}

export async function updateScrapItem(id: string, formData: FormData) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Unauthorized")

    await prisma.scrapItem.update({
      where: { id, sellerId: user.id },
      data: {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        wasteType: formData.get('wasteType') as any,
        estimatedWeight: parseFloat(formData.get('estimatedWeight') as string),
        address: formData.get('address') as string,
        imageUrl: formData.get('imageUrl') as string || "",
      }
    })

    revalidatePath('/seller/dashboard')
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, error: "Failed to update" }
  }
}

export async function deleteScrapItem(id: string) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Unauthorized")

    await prisma.scrapItem.delete({
      where: { id, sellerId: user.id }
    })

    revalidatePath('/seller/dashboard')
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, error: "Failed to delete" }
  }
}

// COLLECTOR: Accept Pickup with Precise Time
export async function acceptPickup(itemId: string, pickupTime: Date) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Unauthorized")

    await prisma.scrapItem.update({
      where: { id: itemId },
      data: {
        status: 'RESERVED',
        collector: { connect: { id: user.id } },
        pickupTime: pickupTime
      }
    })

    revalidatePath('/collector/dashboard')
    revalidatePath('/map')
    return { success: true }
  } catch (error) {
    console.error("Error accepting pickup:", error)
    return { success: false, error: "Failed to accept" }
  }
}

// COLLECTOR: Mark as Collected with Pricing
export async function markAsCollected(itemId: string, unitPrice: number, totalAmount: number) {
  try {
    await prisma.scrapItem.update({
      where: { id: itemId },
      data: {
        status: 'COLLECTED',
        completedAt: new Date(),
        unitPrice: unitPrice,
        totalAmount: totalAmount
      }
    })
    revalidatePath('/collector/dashboard')
    revalidatePath('/seller/dashboard')
    return { success: true }
  } catch (error) {
    console.error("Error marking as collected:", error)
    return { success: false }
  }
}

// SELLER: Dispute/Cancel Pickup
export async function disputePickup(itemId: string) {
  try {
    await prisma.scrapItem.update({
      where: { id: itemId },
      data: {
        status: 'ACTIVE', // Revert to active map
        collectorId: null, // Remove collector
        pickupTime: null
      }
    })
    revalidatePath('/seller/dashboard')
    revalidatePath('/collector/dashboard')
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}

// COLLECTOR: Release/Reject Pickup
export async function releasePickup(itemId: string) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Unauthorized")

    await prisma.scrapItem.update({
      where: { id: itemId, collectorId: user.id },
      data: {
        status: 'ACTIVE',
        collectorId: null,
        pickupTime: null
      }
    })
    revalidatePath('/collector/dashboard')
    revalidatePath('/seller/dashboard')
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}