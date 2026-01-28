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
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, error: "Failed to create" }
  }
}

// COLLECTOR: Accept Pickup with ETA
export async function acceptPickup(itemId: string, etaMinutes: number) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Unauthorized")

    // Calculate actual pickup time based on ETA minutes
    const pickupTime = new Date(Date.now() + etaMinutes * 60000);

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
    return { success: false, error: "Failed to accept" }
  }
}

// COLLECTOR: Mark as Collected
export async function markAsCollected(itemId: string) {
  try {
    await prisma.scrapItem.update({
      where: { id: itemId },
      data: {
        status: 'COLLECTED',
        completedAt: new Date()
      }
    })
    revalidatePath('/collector/dashboard')
    revalidatePath('/seller/dashboard')
    return { success: true }
  } catch (error) {
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
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}