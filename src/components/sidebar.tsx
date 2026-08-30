"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BarChart3, BookOpen, LayoutDashboard, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

export function Sidebar() {
    const pathname = usePathname()

    const routes = [
        {
            label: "Dashboard",
            icon: LayoutDashboard,
            href: "/",
            active: pathname === "/",
        },
        {
            label: "Journal",
            icon: BookOpen,
            href: "/journal",
            active: pathname === "/journal",
        },
        {
            label: "Analytics",
            icon: BarChart3,
            href: "/analytics",
            active: pathname === "/analytics",
            disabled: true,
        },
        {
            label: "Settings",
            icon: Settings,
            href: "/settings",
            active: pathname === "/settings",
            disabled: true,
        },
    ]

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-card border-r">
            <div className="px-3 py-2 flex-1">
                <Link href="/" className="flex items-center pl-3 mb-14">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
                        TradeMind
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Button
                            key={route.href}
                            variant={route.active ? "secondary" : "ghost"}
                            className={cn(
                                "w-full justify-start transition-all hover:translate-x-1",
                                route.active ? "bg-secondary" : "text-muted-foreground",
                                route.disabled && "opacity-50 cursor-not-allowed"
                            )}
                            asChild={!route.disabled}
                            disabled={route.disabled}
                        >
                            {!route.disabled ? (
                                <Link href={route.href}>
                                    <route.icon className={cn("h-5 w-5 mr-3", route.active ? "text-primary" : "text-muted-foreground")} />
                                    {route.label}
                                </Link>
                            ) : (
                                <div className="flex w-full">
                                    <route.icon className="h-5 w-5 mr-3 text-muted-foreground" />
                                    {route.label}
                                </div>
                            )}
                        </Button>
                    ))}
                </div>
            </div>
            <div className="px-3 py-2">
                <div className="rounded-lg bg-muted/50 p-4">
                    <p className="text-xs text-muted-foreground text-center">
                        v0.1.0 Beta
                    </p>
                </div>
            </div>
        </div>
    )
}
