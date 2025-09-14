import { MortgageCalculator } from "@/components/mortgage-calculator"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4 text-balance">Mortgage Calculator</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Calculate your monthly mortgage payments easily and understand your loan breakdown.
            </p>
          </header>
          <MortgageCalculator />
        </div>
      </div>
    </main>
  )
}
