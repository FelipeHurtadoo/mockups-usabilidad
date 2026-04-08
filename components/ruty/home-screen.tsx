'use client'

import { Search, Clock, Bus, Train, ChevronRight, MapPin, Star, Footprints, ArrowRight, Navigation, AlertTriangle, Bike, Zap } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Route, Stop, Alert } from '@/lib/types'
import { cn } from '@/lib/utils'

interface HomeScreenProps {
  favoriteRoutes: Route[]
  nearbyStops: Stop[]
  alerts?: Alert[]
  onSearch: () => void
  onSelectRoute?: (route: Route) => void
}

export function HomeScreen({ favoriteRoutes, nearbyStops, alerts = [], onSearch, onSelectRoute }: HomeScreenProps) {
  const activeAlerts = alerts.filter(a => a.type === 'delay' || a.type === 'closure').slice(0, 2)

  return (
    <div className="flex flex-col min-h-full">
      {/* Header con logo */}
      <header className="bg-primary text-primary-foreground px-4 py-5 pb-16 relative">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">RUTY</h1>
            <p className="text-primary-foreground/80 text-sm">Tu ruta, tu destino</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-primary-foreground/20 rounded-full p-2">
              <Navigation className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Ubicación actual */}
        <div className="flex items-center gap-2 text-primary-foreground/90 text-sm">
          <MapPin className="h-4 w-4" />
          <span>Av. Insurgentes Sur 1234, CDMX</span>
        </div>
      </header>

      {/* Buscador flotante */}
      <div className="px-4 -mt-10 relative z-10">
        <Card className="shadow-lg border-0">
          <CardContent className="p-4">
            <button
              onClick={onSearch}
              className="w-full flex items-center gap-3 p-3 bg-secondary rounded-xl text-left hover:bg-secondary/80 transition-colors"
            >
              <Search className="h-5 w-5 text-muted-foreground" />
              <span className="text-muted-foreground">¿A dónde quieres ir?</span>
            </button>

            {/* Accesos rápidos */}
            <div className="flex gap-2 mt-3">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 gap-2 text-xs"
                onClick={onSearch}
              >
                <Star className="h-3.5 w-3.5 text-amber-500" />
                Casa
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 gap-2 text-xs"
                onClick={onSearch}
              >
                <Star className="h-3.5 w-3.5 text-amber-500" />
                Trabajo
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 gap-2 text-xs"
                onClick={onSearch}
              >
                <Clock className="h-3.5 w-3.5" />
                Recientes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contenido scrolleable */}
      <div className="flex-1 px-4 py-4 space-y-4">

        {/* Alertas activas */}
        {activeAlerts.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <h2 className="font-semibold text-sm text-foreground">Alertas en tu zona</h2>
            </div>
            <div className="space-y-2">
              {activeAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={cn(
                    "p-3 rounded-lg border-l-4",
                    alert.type === 'closure'
                      ? "bg-destructive/10 border-l-destructive"
                      : "bg-amber-500/10 border-l-amber-500"
                  )}
                >
                  <p className="text-sm font-medium text-foreground">{alert.line}</p>
                  <p className="text-xs text-muted-foreground">{alert.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Próximas salidas cercanas */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-foreground">Próximas salidas</h2>
            <span className="text-xs text-muted-foreground">A 5 min caminando</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {nearbyStops.slice(0, 4).map((stop) => (
              <Card key={stop.id} className="border shadow-sm">
                <CardContent className="p-3">
                  <div className="flex items-start gap-2 mb-2">
                    <div className={cn(
                      "p-1.5 rounded-lg",
                      stop.type === 'metro' ? "bg-accent/20" : "bg-primary/20"
                    )}>
                      {stop.type === 'metro' ? (
                        <Train className="h-4 w-4 text-accent" />
                      ) : (
                        <Bus className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-foreground truncate">{stop.name}</p>
                      <p className="text-xs text-muted-foreground">{stop.line}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Footprints className="h-3 w-3" />
                      <span>{stop.distance}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs font-bold text-primary">
                      {stop.nextArrival}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Rutas favoritas */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-foreground">Tus rutas guardadas</h2>
            <Button variant="ghost" size="sm" className="text-xs text-primary h-auto p-0">
              Ver todas
            </Button>
          </div>

          <div className="space-y-2">
            {favoriteRoutes.slice(0, 3).map((route) => (
              <Card
                key={route.id}
                className="border shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onSelectRoute?.(route)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className={cn(
                        'p-2 rounded-lg',
                        route.type === 'metro' ? 'bg-accent/20' : 'bg-primary/20'
                      )}>
                        {route.type === 'metro' ? (
                          <Train className="h-5 w-5 text-accent" />
                        ) : (
                          <Bus className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{route.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                          <span>{route.duration} min</span>
                          <span>·</span>
                          <span>${route.cost.toFixed(2)}</span>
                          {route.transfers > 0 && (
                            <>
                              <span>·</span>
                              <span>{route.transfers} transbordo{route.transfers > 1 ? 's' : ''}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">{route.eta}</p>
                        <p className="text-xs text-muted-foreground">próximo</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Modos de transporte */}
        <section>
          <h2 className="font-semibold text-foreground mb-3">Explorar por modo</h2>
          <div className="grid grid-cols-4 gap-2">
            {[
              { icon: Bus, label: 'Bus', color: 'bg-primary/20 text-primary' },
              { icon: Train, label: 'Metro', color: 'bg-accent/20 text-accent' },
              { icon: Footprints, label: 'Caminar', color: 'bg-emerald-500/20 text-emerald-600' },
              { icon: Navigation, label: 'Mixto', color: 'bg-amber-500/20 text-amber-600' },
            ].map((mode) => (
              <button
                key={mode.label}
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-card border hover:bg-secondary transition-colors"
              >
                <div className={cn('p-2 rounded-lg', mode.color)}>
                  <mode.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium text-foreground">{mode.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Servicios de última milla */}
        <section>
          <h2 className="font-semibold text-foreground mb-3">Última milla</h2>
          <div className="grid grid-cols-2 gap-3">
            <Card className="border shadow-sm cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/20 p-2.5 rounded-xl">
                    <Bike className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Bicicletas</p>
                    <p className="text-xs text-muted-foreground">12 disponibles cerca</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Desde</span>
                  <span className="font-semibold text-foreground">$0.50/min</span>
                </div>
              </CardContent>
            </Card>
            <Card className="border shadow-sm cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-lime-500/20 p-2.5 rounded-xl">
                    <Zap className="h-6 w-6 text-lime-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Scooters</p>
                    <p className="text-xs text-muted-foreground">8 disponibles cerca</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Desde</span>
                  <span className="font-semibold text-foreground">$0.75/min</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Banner informativo */}
        <section className="pb-4">
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 rounded-full p-2">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-foreground">Planifica tu viaje con anticipación</p>
                  <p className="text-xs text-muted-foreground">Configura alertas para no perder tu transporte</p>
                </div>
                <ArrowRight className="h-5 w-5 text-primary" />
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
