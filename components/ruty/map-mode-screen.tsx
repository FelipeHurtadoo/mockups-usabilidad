'use client'

import { ArrowLeft, Bus, Train, Footprints, Navigation, MapPin, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface MapModeScreenProps {
    mode: 'bus' | 'metro' | 'walk' | 'mixed'
    onBack: () => void
}

const modeConfig = {
    bus: {
        title: 'Mapa de Buses',
        icon: Bus,
        color: 'bg-primary text-primary-foreground',
        iconColor: 'text-primary',
        image: '/images/map-bus.jpg',
        description: 'Red de rutas de autobuses urbanos',
        lines: [
            { name: 'Ruta 101', description: 'Centro - Universidad', frequency: '10 min' },
            { name: 'Ruta 45', description: 'Terminal Norte - Sur', frequency: '15 min' },
            { name: 'Ruta 78', description: 'Aeropuerto - Centro', frequency: '20 min' },
        ]
    },
    metro: {
        title: 'Mapa del Metro',
        icon: Train,
        color: 'bg-accent text-accent-foreground',
        iconColor: 'text-accent',
        image: '/images/map-metro.jpg',
        description: 'Sistema de transporte subterráneo',
        lines: [
            { name: 'Línea 1', description: 'Observatorio - Pantitlán', frequency: '3 min' },
            { name: 'Línea 2', description: 'Cuatro Caminos - Tasqueña', frequency: '4 min' },
            { name: 'Línea 3', description: 'Indios Verdes - Universidad', frequency: '5 min' },
        ]
    },
    walk: {
        title: 'Rutas Peatonales',
        icon: Footprints,
        color: 'bg-emerald-500 text-white',
        iconColor: 'text-emerald-600',
        image: '/images/map-walking.jpg',
        description: 'Senderos y caminos para peatones',
        lines: [
            { name: 'Corredor Verde', description: 'Parque Central - Plaza Mayor', frequency: '15 min a pie' },
            { name: 'Ruta Histórica', description: 'Centro Histórico', frequency: '25 min a pie' },
            { name: 'Paseo Ribereño', description: 'Río - Malecón', frequency: '20 min a pie' },
        ]
    },
    mixed: {
        title: 'Transporte Multimodal',
        icon: Navigation,
        color: 'bg-amber-500 text-white',
        iconColor: 'text-amber-600',
        image: '/images/map-multimodal.jpg',
        description: 'Combina todos los modos de transporte',
        lines: [
            { name: 'Metro + Bus', description: 'Conexiones integradas', frequency: 'Variable' },
            { name: 'Bus + Caminata', description: 'Última milla incluida', frequency: 'Variable' },
            { name: 'Metro + Bici', description: 'Estaciones con biciestacionamiento', frequency: 'Variable' },
        ]
    }
}

export function MapModeScreen({ mode, onBack }: MapModeScreenProps) {
    const config = modeConfig[mode]
    const Icon = config.icon

    return (
        <div className="min-h-screen bg-background pb-24">
            {/* Header */}
            <div className={cn('sticky top-0 z-10 p-4', config.color)}>
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
                        <Icon className="h-6 w-6" />
                        <h1 className="text-xl font-bold">{config.title}</h1>
                    </div>
                </div>
                <p className="text-sm opacity-90 mt-1 ml-11">{config.description}</p>
            </div>

            {/* Mapa */}
            <div className="relative">
                <Image
                    src={config.image}
                    alt={config.title}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-3 right-3 bg-card rounded-lg shadow-lg p-2 flex items-center gap-2">
                    <MapPin className={cn('h-4 w-4', config.iconColor)} />
                    <span className="text-xs font-medium text-foreground">Tu ubicación</span>
                </div>
            </div>

            {/* Contenido */}
            <div className="p-4 space-y-4">
                {/* Info card */}
                <Card className="border-l-4 border-l-primary">
                    <CardContent className="p-4 flex items-start gap-3">
                        <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-foreground">Información en tiempo real</p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Las frecuencias mostradas son aproximadas y pueden variar según el horario y día.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Líneas disponibles */}
                <section>
                    <h2 className="font-semibold text-foreground mb-3">Líneas disponibles</h2>
                    <div className="space-y-2">
                        {config.lines.map((line, index) => (
                            <Card key={index} className="border shadow-sm">
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={cn('p-2 rounded-lg', `${config.iconColor.replace('text-', 'bg-')}/20`)}>
                                                <Icon className={cn('h-5 w-5', config.iconColor)} />
                                            </div>
                                            <div>
                                                <p className="font-medium text-foreground">{line.name}</p>
                                                <p className="text-sm text-muted-foreground">{line.description}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-semibold text-primary">{line.frequency}</p>
                                            <p className="text-xs text-muted-foreground">frecuencia</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Leyenda */}
                <section>
                    <h2 className="font-semibold text-foreground mb-3">Leyenda del mapa</h2>
                    <Card className="border">
                        <CardContent className="p-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-1 bg-primary rounded" />
                                    <span className="text-xs text-muted-foreground">Ruta principal</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-1 bg-accent rounded" />
                                    <span className="text-xs text-muted-foreground">Ruta secundaria</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-primary" />
                                    <span className="text-xs text-muted-foreground">Parada</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full border-2 border-primary bg-card" />
                                    <span className="text-xs text-muted-foreground">Transbordo</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </div>
    )
}
