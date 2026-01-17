import { AdventureGame } from "@/components/adventure-game"

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden scanlines">
      <AdventureGame />
    </main>
  )
}
