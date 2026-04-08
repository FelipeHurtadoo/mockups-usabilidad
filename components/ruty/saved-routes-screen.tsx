'use client'

import { ArrowLeft, Star, Bus, Train, Clock, Footprints, ArrowRightLeft, Trash2, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { Route } from '@/lib/types'
import { cn } from '@/lib/utils'

interface SavedRoutesScreenProps {
    routes: Route[]
    onBack: () => void
    onSelectRoute: (route: Route) => void
}

export function SavedRoutesScreen({ routes, onBack, onSelectRoute }: SavedRoutesScreenProps) {
    return (
        <div className="min-h-screen bg-background pb-24">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-primary text-primary-foreground p-4">
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onBack}
                        className="text-inherit hover:bg-white/20"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div className="flex items-center gap-2">
                        <Star className="h-6 w-6" />
                        <h1 className="text-xl font-bold">Rutas Guardadas</h1>
                    </div>
                </div>
                <p className="text-sm opacity-90 mt-1 ml-11">
                    {routes.length} rutas favoritas
                </p>
            </div>

            <div className="p-4 space-y-3">
                {routes.length === 0 ? (
                    <Card className="border border-dashed">
                        <CardContent className="p-8 text-center">
                            <Star className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                            <p className="font-medium text-foreground mb-1">No tienes rutas guardadas</p>
                            <p className="text-sm text-muted-foreground">
                                Guarda tus rutas frecuentes para acceder rápidamente
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    routes.map((route) => (
                        <Card
                            key={route.id}
                            className="border shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => onSelectRoute(route)}
                        >
                            <CardContent className="p-0">
                                <div className="p-4">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-start gap-3 flex-1">
                                            <div className={cn(
                                                'p-2.5 rounded-xl',
                                                route.type === 'metro' ? 'bg-accent/20' : 'bg-primary/20'
                                            )}>
                                                {route.type === 'metro' ? (
                                                    <Train className="h-6 w-6 text-accent" />
                                                ) : (
                                                    <Bus className="h-6 w-6 text-primary" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                                                    <p className="font-semibold text-foreground truncate">{route.name}</p>
                                                </div>
                                                <p className="text-sm text-muted-foreground mt-0.5">
                                                    {route.steps[0]?.from} → {route.steps[route.steps.length - 1]?.to}
                                                </p>
                                            </div>
                                        </div>
                                        <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                                    </div>

                                    {/* Stats */}
                                    <div className="flex items-center gap-4 mt-4 pt-3 border-t">
                                        <div className="flex items-center gap-1.5 text-sm">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium text-foreground">{route.duration} min</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-sm">
                                            <Footprints className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-muted-foreground">{route.walkDistance} m</span>
                                        </div>
                                        {route.transfers > 0 && (
                                            <div className="flex items-center gap-1.5 text-sm">
                                                <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-muted-foreground">
                                                    {route.transfers} transbordo{route.transfers > 1 ? 's' : ''}
                                                </span>
                                            </div>
                                        )}
                                        <div className="ml-auto">
                                            <span className="font-bold text-primary text-lg">${route.cost.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Next arrival */}
                                <div className="bg-primary/5 px-4 py-2.5 flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Próximo</span>
                                    <span className="text-sm font-semibold text-primary">{route.eta}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
