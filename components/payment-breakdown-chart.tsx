"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { BarChart3 } from "lucide-react"

interface CalculationResults {
  monthlyPayment: number
  totalInterest: number
  totalPayment: number
  principalAndInterest: number
}

interface PaymentBreakdownChartProps {
  results: CalculationResults
}

export function PaymentBreakdownChart({ results }: PaymentBreakdownChartProps) {
  const principal = results.totalPayment - results.totalInterest

  const data = [
    {
      name: "Principal",
      value: principal,
      color: "hsl(var(--primary))",
      percentage: ((principal / results.totalPayment) * 100).toFixed(1),
    },
    {
      name: "Interest",
      value: results.totalInterest,
      color: "hsl(var(--accent))",
      percentage: ((results.totalInterest / results.totalPayment) * 100).toFixed(1),
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            {formatCurrency(data.value)} ({data.percentage}%)
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Payment Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={(value, entry: any) => (
                  <span style={{ color: entry.color }}>
                    {value}: {entry.payload.percentage}%
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 text-center">
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-sm font-medium">Principal</span>
            </div>
            <p className="text-lg font-bold text-primary">{formatCurrency(principal)}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent"></div>
              <span className="text-sm font-medium">Interest</span>
            </div>
            <p className="text-lg font-bold text-accent">{formatCurrency(results.totalInterest)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
