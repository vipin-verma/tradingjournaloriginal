"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export type Trade = {
    id: string
    date: string
    symbol: string
    type: "Long" | "Short"
    entry: number
    exit: number
    quantity: number
    pnl: number
    status: "Win" | "Loss" | "BreakEven" | "Open"
    setup?: string
}

type TradeContextType = {
    trades: Trade[]
    addTrade: (trade: Omit<Trade, "id" | "pnl">) => void
    metrics: {
        totalPnl: number
        winRate: number
        profitFactor: number
        activeTrades: number
    }
}

const TradeContext = createContext<TradeContextType | undefined>(undefined)

export function TradeProvider({ children }: { children: React.ReactNode }) {
    const [trades, setTrades] = useState<Trade[]>([
        {
            id: "1",
            date: "2023-10-25",
            symbol: "AAPL",
            type: "Long",
            entry: 170.50,
            exit: 173.20,
            quantity: 100,
            pnl: 270.00,
            status: "Win",
            setup: "Breakout"
        },
        {
            id: "2",
            date: "2023-10-26",
            symbol: "TSLA",
            type: "Short",
            entry: 210.00,
            exit: 215.00,
            quantity: 50,
            pnl: -250.00,
            status: "Loss",
            setup: "Rejection"
        }
    ])

    const addTrade = (newTradeData: Omit<Trade, "id" | "pnl">) => {
        const pnl = (newTradeData.exit - newTradeData.entry) * newTradeData.quantity * (newTradeData.type === "Long" ? 1 : -1)
        const newTrade: Trade = {
            ...newTradeData,
            id: Math.random().toString(36).substring(7),
            pnl: parseFloat(pnl.toFixed(2)),
        }
        setTrades((prev) => [newTrade, ...prev])
    }

    const metrics = React.useMemo(() => {
        const closedTrades = trades.filter((t) => t.status !== "Open")
        const totalPnl = trades.reduce((acc, t) => acc + t.pnl, 0)
        const winningTrades = closedTrades.filter((t) => t.pnl > 0).length
        const losingTrades = closedTrades.filter((t) => t.pnl <= 0).length
        const winRate = closedTrades.length > 0 ? (winningTrades / closedTrades.length) * 100 : 0

        const grossProfit = trades.filter((t) => t.pnl > 0).reduce((acc, t) => acc + t.pnl, 0)
        const grossLoss = Math.abs(trades.filter((t) => t.pnl < 0).reduce((acc, t) => acc + t.pnl, 0))
        const profitFactor = grossLoss > 0 ? grossProfit / grossLoss : grossProfit > 0 ? 100 : 0

        const activeTrades = trades.filter((t) => t.status === "Open").length

        return {
            totalPnl,
            winRate,
            profitFactor,
            activeTrades
        }
    }, [trades])

    return (
        <TradeContext.Provider value={{ trades, addTrade, metrics }}>
            {children}
        </TradeContext.Provider>
    )
}

export function useTrades() {
    const context = useContext(TradeContext)
    if (context === undefined) {
        throw new Error("useTrades must be used within a TradeProvider")
    }
    return context
}
