"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, DollarSign, Percent, Calendar, TrendingUp } from "lucide-react"
import { MortgageResults } from "./mortgage-results"
import { PaymentBreakdownChart } from "./payment-breakdown-chart"

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

export function MortgageCalculator() {
  const [formData, setFormData] = useState<MortgageData>({
    loanAmount: 0,
    interestRate: 0,
    loanTerm: 30,
    downPayment: 0,
  })

  const [results, setResults] = useState<CalculationResults | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const calculateMortgage = () => {
    setIsCalculating(true)

    // Simulate calculation delay for better UX
    setTimeout(() => {
      const principal = formData.loanAmount - formData.downPayment
      const monthlyRate = formData.interestRate / 100 / 12
      const numberOfPayments = formData.loanTerm * 12

      if (monthlyRate === 0) {
        // Handle 0% interest rate
        const monthlyPayment = principal / numberOfPayments
        setResults({
          monthlyPayment,
          totalInterest: 0,
          totalPayment: principal,
          principalAndInterest: monthlyPayment,
        })
      } else {
        // Standard mortgage calculation
        const monthlyPayment =
          (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
          (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

        const totalPayment = monthlyPayment * numberOfPayments
        const totalInterest = totalPayment - principal

        setResults({
          monthlyPayment,
          totalInterest,
          totalPayment,
          principalAndInterest: monthlyPayment,
        })
      }

      setIsCalculating(false)
    }, 500)
  }

  const handleInputChange = (field: keyof MortgageData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: Number.parseFloat(value) || 0,
    }))
  }

  const isFormValid = formData.loanAmount > 0 && formData.interestRate >= 0 && formData.loanTerm > 0

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Input Form */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Loan Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="loanAmount" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Loan Amount
            </Label>
            <Input
              id="loanAmount"
              type="number"
              placeholder="Enter loan amount"
              value={formData.loanAmount || ""}
              onChange={(e) => handleInputChange("loanAmount", e.target.value)}
              className="text-lg"
              aria-describedby="loanAmount-help"
            />
            <p id="loanAmount-help" className="text-sm text-muted-foreground">
              The total amount you want to borrow
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="downPayment" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Down Payment
            </Label>
            <Input
              id="downPayment"
              type="number"
              placeholder="Enter down payment"
              value={formData.downPayment || ""}
              onChange={(e) => handleInputChange("downPayment", e.target.value)}
              className="text-lg"
              aria-describedby="downPayment-help"
            />
            <p id="downPayment-help" className="text-sm text-muted-foreground">
              Amount you'll pay upfront
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="interestRate" className="flex items-center gap-2">
              <Percent className="h-4 w-4" />
              Interest Rate (Annual %)
            </Label>
            <Input
              id="interestRate"
              type="number"
              step="0.01"
              placeholder="Enter interest rate"
              value={formData.interestRate || ""}
              onChange={(e) => handleInputChange("interestRate", e.target.value)}
              className="text-lg"
              aria-describedby="interestRate-help"
            />
            <p id="interestRate-help" className="text-sm text-muted-foreground">
              Annual percentage rate (APR)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="loanTerm" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Loan Term
            </Label>
            <Select
              value={formData.loanTerm.toString()}
              onValueChange={(value) => handleInputChange("loanTerm", value)}
            >
              <SelectTrigger id="loanTerm" className="text-lg">
                <SelectValue placeholder="Select loan term" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 years</SelectItem>
                <SelectItem value="20">20 years</SelectItem>
                <SelectItem value="25">25 years</SelectItem>
                <SelectItem value="30">30 years</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">Length of time to repay the loan</p>
          </div>

          <Button
            onClick={calculateMortgage}
            disabled={!isFormValid || isCalculating}
            className="w-full text-lg py-6"
            size="lg"
          >
            {isCalculating ? (
              <>
                <TrendingUp className="mr-2 h-5 w-5 animate-spin" />
                Calculating...
              </>
            ) : (
              <>
                <Calculator className="mr-2 h-5 w-5" />
                Calculate Payment
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-6">
        {results && (
          <>
            <MortgageResults results={results} formData={formData} />
            <PaymentBreakdownChart results={results} />
          </>
        )}

        {!results && (
          <Card className="shadow-lg">
            <CardContent className="flex items-center justify-center h-64">
              <div className="text-center text-muted-foreground">
                <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Enter your loan details and click calculate to see your results</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
