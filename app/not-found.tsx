"use client"

import React from "react"
import Link from "next/link"
import { Button } from "../components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
      <h1 className="text-6xl font-bold text-amber-600">404</h1>
      <h2 className="mt-4 text-2xl font-medium text-neutral-800">Sidan hittades inte</h2>
      <p className="mt-2 text-neutral-600">
        Vi kan tyvärr inte hitta sidan du letar efter.
      </p>
      <Button className="mt-8 bg-amber-600 hover:bg-amber-700" asChild>
        <Link href="/">Tillbaka till startsidan</Link>
      </Button>
    </div>
  )
} 