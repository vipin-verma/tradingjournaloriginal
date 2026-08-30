"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useTrades } from "@/components/trade-context"

export function TradeTable() {
    const { trades } = useTrades()

    return (
        <Table>
            <TableCaption>A list of your recent trades.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Date</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Entry</TableHead>
                    <TableHead className="text-right">Exit</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead className="text-right">P&L</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {trades.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                            No trades found.
                        </TableCell>
                    </TableRow>
                ) : (
                    trades.map((trade) => (
                        <TableRow key={trade.id}>
                            <TableCell className="font-medium">{trade.date}</TableCell>
                            <TableCell>{trade.symbol}</TableCell>
                            <TableCell>
                                <Badge variant={trade.type === "Long" ? "default" : "secondary"}>
                                    {trade.type}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">${trade.entry}</TableCell>
                            <TableCell className="text-right">${trade.exit}</TableCell>
                            <TableCell className="text-right">{trade.quantity}</TableCell>
                            <TableCell
                                className={`text-right font-bold ${trade.pnl > 0 ? "text-emerald-500" : "text-rose-500"
                                    }`}
                            >
                                {trade.pnl > 0 ? "+" : ""}
                                ${trade.pnl}
                            </TableCell>
                            <TableCell className="text-right">
                                <Badge
                                    variant={
                                        trade.status === "Win"
                                            ? "success"
                                            : trade.status === "Loss"
                                                ? "danger"
                                                : "outline"
                                    }
                                >
                                    {trade.status}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    )
}
