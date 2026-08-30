"use client"

import { useState } from "react"
import { TradeTable } from "@/components/journal/trade-table"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { TradeForm } from "@/components/journal/trade-form"
import { useTrades } from "@/components/trade-context"

export default function JournalPage() {
    const [open, setOpen] = useState(false)
    const { addTrade } = useTrades()

    const handleCreateTrade = (values: any) => {
        addTrade({
            ...values,
            date: new Date().toISOString().split('T')[0], // Default to today
        })
        setOpen(false)
    }

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40 p-4 md:p-8 space-y-8">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Journal</h2>
                    <p className="text-muted-foreground">
                        Log and review your trades.
                    </p>
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusIcon className="mr-2 h-4 w-4" /> Add Trade
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add New Trade</DialogTitle>
                            <DialogDescription>
                                Enter the details of your trade here. Click log trade when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <TradeForm onSubmit={handleCreateTrade} />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-xl border bg-card text-card-foreground p-6 shadow-sm">
                <TradeTable />
            </div>
        </div>
    )
}
