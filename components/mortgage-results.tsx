import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, PiggyBank, Home } from "lucide-react"

interface MortgageData {
  loanAmount: number
  interestRate: number
  loanTerm: number
  downPayment: number
}

interface CalculationResults {
  monthlyPayment: number
  totalInterest: number
  totalPayment: number
  principalAndInterest: number
}

interface MortgageResultsProps {
  results: CalculationResults
  formData: MortgageData
}

export function MortgageResults({ results, formData }: MortgageResultsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  const loanToValue = ((formData.loanAmount - formData.downPayment) / formData.loanAmount) * 100

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-accent">
          <TrendingUp className="h-5 w-5" />
          Your Mortgage Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Monthly Payment - Most Important */}
        <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
          <div className="flex items-center gap-3 mb-2">
            <Home className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold">Monthly Payment</h3>
          </div>
          <p
            className="text-3xl font-bold text-primary"
            aria-label={`Monthly payment of ${formatCurrency(results.monthlyPayment)}`}
          >
            {formatCurrency(results.monthlyPayment)}
          </p>
          <p className="text-sm text-muted-foreground mt-1">Principal & Interest only</p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-5 w-5 text-accent" />
              <h4 className="font-semibold">Total Interest</h4>
            </div>
            <p className="text-xl font-bold text-accent">{formatCurrency(results.totalInterest)}</p>
            <p className="text-sm text-muted-foreground">Over {formData.loanTerm} years</p>
          </div>

          <div className="bg-muted rounded-lg p-4 border">
            <div className="flex items-center gap-2 mb-2">
              <PiggyBank className="h-5 w-5 text-foreground" />
              <h4 className="font-semibold">Total Payment</h4>
            </div>
            <p className="text-xl font-bold">{formatCurrency(results.totalPayment)}</p>
            <p className="text-sm text-muted-foreground">Principal + Interest</p>
          </div>
        </div>

        {/* Additional Details */}
        <div className="border-t pt-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Loan Amount:</span>
            <span className="font-medium">{formatCurrency(formData.loanAmount - formData.downPayment)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Down Payment:</span>
            <span className="font-medium">{formatCurrency(formData.downPayment)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Interest Rate:</span>
            <span className="font-medium">{formData.interestRate}% APR</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Loan Term:</span>
            <span className="font-medium">{formData.loanTerm} years</span>
          </div>
          {formData.downPayment > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Loan-to-Value:</span>
              <span className="font-medium">{loanToValue.toFixed(1)}%</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
