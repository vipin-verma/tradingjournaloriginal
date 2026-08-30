import { EquityChart } from "@/components/dashboard/equity-chart"
import { StatCard } from "@/components/dashboard/stat-card"
import { Activity, CircleDollarSign, Percent, TrendingUp } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 p-4 md:p-8 space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Overview of your trading performance.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total P&L"
          value="$2,500.00"
          change="+20.1% from last month"
          trend="up"
          icon={<CircleDollarSign className="h-4 w-4" />}
        />
        <StatCard
          title="Win Rate"
          value="65%"
          change="+5% from last month"
          trend="up"
          icon={<Percent className="h-4 w-4" />}
        />
        <StatCard
          title="Profit Factor"
          value="2.1"
          change="Neutral"
          trend="neutral"
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <StatCard
          title="Active Trades"
          value="3"
          description="2 Long, 1 Short"
          icon={<Activity className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <EquityChart />
        <div className="col-span-3 rounded-xl border bg-card text-card-foreground p-6 shadow-sm">
          <h3 className="text-lg font-semibold">Recent Activity</h3>
          <p className="text-sm text-muted-foreground">No recent activity.</p>
          {/* Placeholder for Recent Trades List */}
        </div>
      </div>
    </div>
  )
}
