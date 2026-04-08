'use client'

import { useState } from 'react'
import { Search, ArrowLeft, Zap, ArrowRightLeft, DollarSign, Accessibility, Clock, Footprints, Bus, Train, ChevronRight, Leaf, MapPin } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { Route } from '@/lib/types'
import { cn } from '@/lib/utils'

interface SearchScreenProps {
  searchResults: Route[]
  onBack: () => void
  onSelectRoute: (route: Route) => void
}

const filters = [
  { id: 'fast', label: 'Más rápida', icon: Zap },
  { id: 'transfers', label: 'Menos transbordos', icon: ArrowRightLeft },
  { id: 'cheap', label: 'Más económica', icon: DollarSign },
  { id: 'walk', label: 'Menos caminata', icon: Footprints },
  { id: 'accessible', label: 'Accesible', icon: Accessibility },
  { id: 'eco', label: 'Ecológica', icon: Leaf },
]

export function SearchScreen({ searchResults, onBack, onSelectRoute }: SearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState('Aeropuerto Internacional')
  const [activeFilter, setActiveFilter] = useState('fast')

  const filteredResults = [...searchResults].sort((a, b) => {
    switch (activeFilter) {
      case 'fast':
        return a.duration - b.duration
      case 'transfers':
        return a.transfers - b.transfers
      case 'cheap':
        return a.cost - b.cost
      case 'walk':
        return a.walkDistance - b.walkDistance
      case 'accessible':
        // Prioriza rutas con más accesibilidad
        const aAccessible = a.steps.filter(s => s.accessibility?.hasElevator || s.accessibility?.hasRamp).length
        const bAccessible = b.steps.filter(s => s.accessibility?.hasElevator || s.accessibility?.hasRamp).length
        return bAccessible - aAccessible
      case 'eco':
        // Prioriza metro y caminata sobre bus
        const ecoScore = (route: Route) => {
          return route.steps.reduce((score, step) => {
            if (step.type === 'walk') return score + 3
            if (step.type === 'metro') return score + 2
            return score + 1
          }, 0)
        }
        return ecoScore(b) - ecoScore(a)
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header con búsqueda */}
      <div className="sticky top-0 z-20 bg-card border-b border-border p-4">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="¿A dónde vas?"
              className="pl-10"
            />
          </div>
        </div>

        {/* Filtros tipo píldora */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all',
                activeFilter === filter.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              )}
            >
              <filter.icon className="h-4 w-4" />
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Resultados */}
      <div className="p-4 space-y-3">
        <p className="text-sm text-muted-foreground">
          {filteredResults.length} rutas encontradas hacia {searchQuery}
        </p>

        {filteredResults.map((route) => (
          <Card
            key={route.id}
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onSelectRoute(route)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {route.type === 'metro' ? (
                    <div className="p-1.5 rounded-full bg-accent/20">
                      <Train className="h-4 w-4 text-accent" />
                    </div>
                  ) : (
                    <div className="p-1.5 rounded-full bg-primary/20">
                      <Bus className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <span className="font-semibold text-foreground">{route.name}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>

              {/* Detalles de la ruta */}
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-secondary rounded-lg p-2">
                  <Clock className="h-4 w-4 mx-auto mb-1 text-primary" />
                  <p className="text-sm font-bold text-foreground">{route.duration} min</p>
                  <p className="text-xs text-muted-foreground">Tiempo</p>
                </div>
                <div className="bg-secondary rounded-lg p-2">
                  <DollarSign className="h-4 w-4 mx-auto mb-1 text-primary" />
                  <p className="text-sm font-bold text-foreground">${route.cost.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">Costo</p>
                </div>
                <div className="bg-secondary rounded-lg p-2">
                  <Footprints className="h-4 w-4 mx-auto mb-1 text-primary" />
                  <p className="text-sm font-bold text-foreground">{route.walkDistance}m</p>
                  <p className="text-xs text-muted-foreground">Caminata</p>
                </div>
                <div className="bg-secondary rounded-lg p-2">
                  <ArrowRightLeft className="h-4 w-4 mx-auto mb-1 text-primary" />
                  <p className="text-sm font-bold text-foreground">{route.transfers}</p>
                  <p className="text-xs text-muted-foreground">Transbordos</p>
                </div>
              </div>

              {/* Vista previa de pasos */}
              <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1">
                {route.steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-1">
                    {step.type === 'walk' ? (
                      <span className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">Caminar</span>
                    ) : step.type === 'bus' ? (
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded font-medium">
                        Bus {step.line}
                      </span>
                    ) : (
                      <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded font-medium">
                        Metro {step.line}
                      </span>
                    )}
                    {index < route.steps.length - 1 && (
                      <ChevronRight className="h-3 w-3 text-muted-foreground" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
