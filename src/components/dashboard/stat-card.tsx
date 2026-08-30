import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
    title: string
    value: string
    change?: string
    trend?: "up" | "down" | "neutral"
    icon?: React.ReactNode
    description?: string
}

export function StatCard({
    title,
    value,
    change,
    trend,
    icon,
    description,
}: StatCardProps) {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon && <div className="text-muted-foreground">{icon}</div>}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {(change || description) && (
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                        {change && (
                            <span
                                className={cn(
                                    "flex items-center font-medium mr-2",
                                    trend === "up" && "text-emerald-500",
                                    trend === "down" && "text-rose-500",
                                    trend === "neutral" && "text-yellow-500"
                                )}
                            >
                                {trend === "up" && <ArrowUpIcon className="mr-1 h-3 w-3" />}
                                {trend === "down" && <ArrowDownIcon className="mr-1 h-3 w-3" />}
                                {trend === "neutral" && <MinusIcon className="mr-1 h-3 w-3" />}
                                {change}
                            </span>
                        )}
                        {description && <span>{description}</span>}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
