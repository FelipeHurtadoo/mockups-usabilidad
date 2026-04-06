'use client'

import { Search, Star, Clock, Bus, Train, ChevronRight, MapPin } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import type { Route } from '@/lib/types'
import { cn } from '@/lib/utils'

interface RoutesScreenProps {
  favoriteRoutes: Route[]
  recentSearches: string[]
  onSearch: () => void
  onSelectRoute: (route: Route) => void
}

export function RoutesScreen({ favoriteRoutes, recentSearches, onSearch, onSelectRoute }: RoutesScreenProps) {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header con búsqueda */}
      <div className="sticky top-0 z-10 bg-card border-b border-border p-4">
        <h1 className="text-xl font-bold mb-4 text-foreground">Mis Rutas</h1>
        <div 
          className="relative cursor-pointer"
          onClick={onSearch}
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar destino..."
            className="pl-10 cursor-pointer"
            readOnly
          />
        </div>
      </div>
      
      {/* Búsquedas recientes */}
      <div className="p-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              Búsquedas recientes
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={onSearch}
                  className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-secondary transition-colors text-left"
                >
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{search}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Rutas favoritas */}
      <div className="px-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2 text-muted-foreground">
              <Star className="h-4 w-4 text-amber-500" />
              Rutas favoritas
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-3">
              {favoriteRoutes.map((route) => (
                <button
                  key={route.id}
                  onClick={() => onSelectRoute(route)}
                  className="flex items-center justify-between w-full p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'p-2 rounded-full',
                      route.type === 'metro' ? 'bg-accent/20 text-accent' : 'bg-primary/20 text-primary'
                    )}>
                      {route.type === 'metro' ? (
                        <Train className="h-5 w-5" />
                      ) : (
                        <Bus className="h-5 w-5" />
                      )}
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-sm text-foreground">{route.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {route.duration} min · ${route.cost.toFixed(2)} · {route.transfers} transbordo{route.transfers !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="text-sm font-bold text-primary">{route.eta}</p>
                      <p className="text-xs text-muted-foreground">ETA</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
