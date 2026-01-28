"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Recycle,
  ArrowRight,
  Truck,
  MapPin,
  Leaf,
  ShieldCheck,
  Users,
  PhoneCall,
  BadgeCheck,
  HandCoins,
  Timer,
  Navigation,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { useAuth } from "@/hooks/useAuth";
import { AppLayout } from "@/components/layout/AppLayout";

const stats = [
  { value: "24/7", label: "Pickup Requests" },
  { value: "Fast", label: "Collector Matching" },
  { value: "Fair", label: "Transparent Pricing" },
  { value: "Cleaner", label: "Communities" },
];

const featureGrid = [
  {
    icon: MapPin,
    title: "Nearby Collectors (Sri Lanka)",
    description:
      "Discover trusted collectors near your area and request pickups without calling around.",
  },
  {
    icon: HandCoins,
    title: "Fair Value for Scrap",
    description:
      "Clear rates and item categories so sellers know what they’ll get before pickup.",
  },
  {
    icon: Navigation,
    title: "Smarter Pickup Flow",
    description:
      "Collectors can accept jobs quickly and get optimized routes to save fuel and time.",
  },
  {
    icon: ShieldCheck,
    title: "Verified & Safer",
    description:
      "Basic verification + reputation system to reduce scams and build trust.",
  },
];

const steps = [
  {
    icon: Sparkles,
    title: "List your scrap",
    desc: "Select category, add photos (optional), and set pickup location.",
  },
  {
    icon: Timer,
    title: "Get matched",
    desc: "Nearby collectors see your request and accept based on availability.",
  },
  {
    icon: Truck,
    title: "Pickup & confirm",
    desc: "Collector arrives, you confirm weight/price, and the job is completed.",
  },
];

const trustBadges = [
  { icon: BadgeCheck, title: "Community-rated collectors" },
  { icon: ShieldCheck, title: "Basic verification" },
  { icon: PhoneCall, title: "Quick support" },
];

export default function HomePage() {
  const { user, profile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && profile) {
      const redirectPath =
        profile.role === "COLLECTOR"
          ? "/collector/dashboard"
          : "/seller/dashboard";
      router.push(redirectPath);
    }
  }, [user, profile, router]);

  return (
    <AppLayout>
      {/* HERO */}
      <section className="relative -mx-4 -mt-8 overflow-hidden px-4 pt-16 pb-10 md:pt-24 md:pb-16">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.jpg"
            alt="Scrap collection in Sri Lanka"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
          {/* subtle glow blobs */}
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        </div>

        <div className="container relative mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-sm">
                <Leaf className="h-4 w-4 text-primary" />
                <span className="font-medium">
                  Built for Sri Lanka • Cleaner cities • Better incomes
                </span>
              </div>

              <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                Make Scrap Collection{" "}
                <span className="text-primary">Simple</span> &{" "}
                <span className="text-primary">Fair</span>
              </h1>

              <p className="max-w-xl text-lg text-muted-foreground">
                A platform that connects households and businesses with scrap
                collectors—reducing the daily headache, supporting hardworking
                collectors, and keeping Sri Lanka cleaner.
              </p>

              {/* Role CTA */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href="/signup?role=seller">
                  <Button size="lg" className="gap-2">
                    I Have Scrap
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/signup?role=collector">
                  <Button size="lg" variant="outline" className="gap-2">
                    I’m a Collector
                    <Truck className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* Trust row */}
              <div className="flex flex-wrap gap-2 pt-2">
                {trustBadges.map((b) => (
                  <div
                    key={b.title}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-2 text-xs text-muted-foreground"
                  >
                    <b.icon className="h-4 w-4 text-primary" />
                    <span>{b.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-accent/10 to-transparent shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/hero-bg.jpg"
                    alt="Scrap pickup"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Floating KPI card */}
              <div className="absolute -bottom-6 left-4 right-4 mx-auto max-w-sm rounded-2xl border border-border bg-card/90 p-4 shadow-lg backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Recycle className="h-6 w-6 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-muted-foreground">
                      Community impact
                    </p>
                    <p className="text-lg font-semibold">
                      More recycling • Less street waste
                    </p>
                  </div>
                </div>
              </div>

              {/* small corner chip */}
              <div className="absolute top-4 right-4 hidden sm:block">
                <div className="rounded-full border border-border bg-card/70 px-3 py-2 text-xs text-muted-foreground backdrop-blur">
                  <span className="font-medium text-foreground">
                    Trusted pickups
                  </span>{" "}
                  across towns & cities
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border bg-card/60 p-5 text-center backdrop-blur"
              >
                <p className="text-2xl font-bold text-primary md:text-3xl">
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY / FEATURE GRID */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-3 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Why this matters in Sri Lanka
            </h2>
            <p className="mx-auto max-w-3xl text-muted-foreground">
              Scrap collection is real work—often under tough conditions. This
              platform reduces confusion for sellers, creates predictable jobs
              for collectors, and increases recycling efficiency.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {featureGrid.map((f) => (
              <Card
                key={f.title}
                className="group border-border/60 bg-card/50 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                    <f.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-base font-semibold">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {f.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-3 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">How it works</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Simple steps designed for real life—fast for sellers, practical
              for collectors.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((s, idx) => (
              <Card key={s.title} className="border-border/60 bg-card/50">
                <CardContent className="pt-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <s.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        Step {idx + 1}
                      </span>
                    </div>
                  </div>
                  <h3 className="mb-2 font-semibold">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ROLE CARDS */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="overflow-hidden border-border/60 bg-card/50">
              <CardContent className="p-8">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-2 text-sm font-medium text-primary">
                  <Users className="h-4 w-4" />
                  For Sellers (Households / Shops)
                </div>
                <h3 className="text-2xl font-bold">
                  Sell scrap without hassle
                </h3>
                <p className="mt-3 text-muted-foreground">
                  Post your items, choose a pickup time, and get matched with a
                  collector near you—no endless calls, no confusion.
                </p>
                <div className="mt-6">
                  <Link href="/signup?role=seller">
                    <Button size="lg" className="gap-2">
                      Start as Seller
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-border/60 bg-card/50">
              <CardContent className="p-8">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-2 text-sm font-medium text-primary">
                  <Truck className="h-4 w-4" />
                  For Collectors
                </div>
                <h3 className="text-2xl font-bold">
                  Get more pickups, efficiently
                </h3>
                <p className="mt-3 text-muted-foreground">
                  Accept jobs near you, reduce fuel waste, and build trust with
                  community ratings—more stable income, less uncertainty.
                </p>
                <div className="mt-6">
                  <Link href="/signup?role=collector">
                    <Button size="lg" variant="outline" className="gap-2">
                      Start as Collector
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl">
          <Card className="overflow-hidden border-border bg-primary text-primary-foreground">
            <CardContent className="relative p-8 md:p-12">
              <div className="absolute inset-0 opacity-25">
                <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary-foreground/20 blur-3xl" />
                <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-primary-foreground/10 blur-3xl" />
              </div>

              <div className="relative flex flex-col items-center gap-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-foreground/15">
                  <Leaf className="h-8 w-8" />
                </div>

                <h2 className="text-2xl font-bold md:text-3xl">
                  Build a cleaner Sri Lanka—one pickup at a time
                </h2>
                <p className="max-w-2xl text-primary-foreground/90">
                  Better recycling, less street waste, and more dignity for the
                  people who do the hard work every day.
                </p>

                <div className="flex flex-wrap justify-center gap-3">
                  <Link href="/signup">
                    <Button size="lg" variant="secondary" className="gap-2">
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                    >
                      Sign In
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Recycle className="h-5 w-5 text-primary" />
              <span className="font-semibold">EcoCycle</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 EcoCycle • Built for Sri Lanka
            </p>
          </div>
        </div>
      </footer>
    </AppLayout>
  );
}
