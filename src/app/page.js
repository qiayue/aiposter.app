"use client";

import AIPosterGenerator from '../components/AIPosterGenerator'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-0">
      <AIPosterGenerator />
      <Footer />
    </main>

  )
}
