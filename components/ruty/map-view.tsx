'use client'

import { MapPin, Navigation, Train, Bus } from 'lucide-react'
import type { Stop } from '@/lib/types'

interface MapViewProps {
  stops: Stop[]
  showRoute?: boolean
  simplified?: boolean
}

export function MapView({ stops, showRoute = false, simplified = false }: MapViewProps) {
  return (
    <div className="relative w-full h-full bg-secondary/50 overflow-hidden">
      {/* Grid de calles simulado */}
      <div className="absolute inset-0">
        <svg className="w-full h-full" viewBox="0 0 400 600">
          {/* Calles horizontales */}
          <line x1="0" y1="100" x2="400" y2="100" stroke="currentColor" strokeWidth="2" className="text-border" />
          <line x1="0" y1="200" x2="400" y2="200" stroke="currentColor" strokeWidth="2" className="text-border" />
          <line x1="0" y1="300" x2="400" y2="300" stroke="currentColor" strokeWidth="2" className="text-border" />
          <line x1="0" y1="400" x2="400" y2="400" stroke="currentColor" strokeWidth="2" className="text-border" />
          <line x1="0" y1="500" x2="400" y2="500" stroke="currentColor" strokeWidth="2" className="text-border" />
          
          {/* Calles verticales */}
          <line x1="80" y1="0" x2="80" y2="600" stroke="currentColor" strokeWidth="2" className="text-border" />
          <line x1="160" y1="0" x2="160" y2="600" stroke="currentColor" strokeWidth="2" className="text-border" />
          <line x1="240" y1="0" x2="240" y2="600" stroke="currentColor" strokeWidth="2" className="text-border" />
          <line x1="320" y1="0" x2="320" y2="600" stroke="currentColor" strokeWidth="2" className="text-border" />
          
          {/* Avenida principal */}
          <line x1="200" y1="0" x2="200" y2="600" stroke="currentColor" strokeWidth="6" className="text-muted" />
          
          {showRoute && (
            <>
              {/* Ruta seleccionada */}
              <path 
                d="M 200 350 L 200 200 L 320 200 L 320 100" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="4" 
                strokeDasharray={simplified ? "0" : "8,4"}
                className="text-primary"
              />
              {/* Punto de destino */}
              <circle cx="320" cy="100" r="10" fill="currentColor" className="text-destructive" />
            </>
          )}
        </svg>
      </div>
      
      {/* Marcador de ubicación actual */}
      <div className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/30 rounded-full animate-ping" style={{ width: '48px', height: '48px', marginLeft: '-12px', marginTop: '-12px' }} />
          <div className="bg-primary text-primary-foreground rounded-full p-2 shadow-lg">
            <Navigation className="h-5 w-5" />
          </div>
        </div>
      </div>
      
      {/* Paradas cercanas */}
      {!simplified && stops.map((stop, index) => (
        <div 
          key={stop.id}
          className="absolute z-10"
          style={{
            left: `${30 + index * 25}%`,
            top: `${30 + index * 10}%`
          }}
        >
          <div className="bg-card text-card-foreground rounded-full p-1.5 shadow-md border border-border">
            {stop.type === 'metro' ? (
              <Train className="h-4 w-4 text-accent" />
            ) : (
              <Bus className="h-4 w-4 text-primary" />
            )}
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap">
            <span className="text-xs bg-card/90 px-2 py-0.5 rounded shadow text-card-foreground">
              {stop.name.split(' ').slice(0, 2).join(' ')}
            </span>
          </div>
        </div>
      ))}
      
      {/* Leyenda del mapa */}
      {!simplified && (
        <div className="absolute bottom-4 left-4 bg-card/95 rounded-lg p-2 shadow-lg text-xs">
          <div className="flex items-center gap-2 text-card-foreground">
            <MapPin className="h-3 w-3 text-primary" />
            <span>Tu ubicación</span>
          </div>
        </div>
      )}
    </div>
  )
}
