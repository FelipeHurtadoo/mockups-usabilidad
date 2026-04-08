'use client'

import { useState } from 'react'
import { ArrowLeft, Bell, Clock, MapPin, Bus, Train, Plus, Trash2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

interface AlertConfigScreenProps {
    onBack: () => void
}

interface SavedAlert {
    id: string
    name: string
    origin: string
    destination: string
    time: string
    days: string[]
    enabled: boolean
    transport: 'bus' | 'metro' | 'mixed'
}

const daysOfWeek = [
    { id: 'L', label: 'Lun' },
    { id: 'M', label: 'Mar' },
    { id: 'X', label: 'Mié' },
    { id: 'J', label: 'Jue' },
    { id: 'V', label: 'Vie' },
    { id: 'S', label: 'Sáb' },
    { id: 'D', label: 'Dom' },
]

export function AlertConfigScreen({ onBack }: AlertConfigScreenProps) {
    const [showAddForm, setShowAddForm] = useState(false)
    const [savedAlerts, setSavedAlerts] = useState<SavedAlert[]>([
        {
            id: '1',
            name: 'Ir al trabajo',
            origin: 'Casa',
            destination: 'Oficina Centro',
            time: '07:30',
            days: ['L', 'M', 'X', 'J', 'V'],
            enabled: true,
            transport: 'metro'
        },
        {
            id: '2',
            name: 'Regreso a casa',
            origin: 'Oficina Centro',
            destination: 'Casa',
            time: '18:00',
            days: ['L', 'M', 'X', 'J', 'V'],
            enabled: true,
            transport: 'bus'
        }
    ])

    // Form state
    const [alertName, setAlertName] = useState('')
    const [origin, setOrigin] = useState('')
    const [destination, setDestination] = useState('')
    const [time, setTime] = useState('')
    const [selectedDays, setSelectedDays] = useState<string[]>([])
    const [transport, setTransport] = useState<'bus' | 'metro' | 'mixed'>('mixed')
    const [showSavedToast, setShowSavedToast] = useState(false)

    const toggleDay = (dayId: string) => {
        setSelectedDays(prev =>
            prev.includes(dayId)
                ? prev.filter(d => d !== dayId)
                : [...prev, dayId]
        )
    }

    const handleSaveAlert = () => {
        if (alertName && origin && destination && time && selectedDays.length > 0) {
            const newAlert: SavedAlert = {
                id: Date.now().toString(),
                name: alertName,
                origin,
                destination,
                time,
                days: selectedDays,
                enabled: true,
                transport
            }
            setSavedAlerts(prev => [...prev, newAlert])

            // Reset form
            setAlertName('')
            setOrigin('')
            setDestination('')
            setTime('')
            setSelectedDays([])
            setTransport('mixed')
            setShowAddForm(false)

            // Show toast
            setShowSavedToast(true)
            setTimeout(() => setShowSavedToast(false), 2000)
        }
    }

    const toggleAlert = (id: string) => {
        setSavedAlerts(prev =>
            prev.map(alert =>
                alert.id === id ? { ...alert, enabled: !alert.enabled } : alert
            )
        )
    }

    const deleteAlert = (id: string) => {
        setSavedAlerts(prev => prev.filter(alert => alert.id !== id))
    }

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
                        <Bell className="h-6 w-6" />
                        <h1 className="text-xl font-bold">Configurar Alertas</h1>
                    </div>
                </div>
                <p className="text-sm opacity-90 mt-1 ml-11">
                    Programa alertas para tus viajes frecuentes
                </p>
            </div>

            <div className="p-4 space-y-4">
                {/* Info */}
                <Card className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                        <p className="text-sm text-foreground">
                            Recibe notificaciones antes de tus viajes programados con información sobre el estado del transporte y tiempos de espera.
                        </p>
                    </CardContent>
                </Card>

                {/* Saved alerts */}
                <section>
                    <h2 className="font-semibold text-foreground mb-3">Alertas programadas</h2>

                    {savedAlerts.length === 0 ? (
                        <Card className="border border-dashed">
                            <CardContent className="p-6 text-center">
                                <Bell className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                                <p className="text-muted-foreground">No tienes alertas programadas</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-2">
                            {savedAlerts.map((alert) => (
                                <Card key={alert.id} className={cn('border', !alert.enabled && 'opacity-60')}>
                                    <CardContent className="p-4">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex items-start gap-3 flex-1">
                                                <div className={cn(
                                                    'p-2 rounded-lg',
                                                    alert.transport === 'metro' ? 'bg-accent/20' : alert.transport === 'bus' ? 'bg-primary/20' : 'bg-amber-500/20'
                                                )}>
                                                    {alert.transport === 'metro' ? (
                                                        <Train className="h-5 w-5 text-accent" />
                                                    ) : alert.transport === 'bus' ? (
                                                        <Bus className="h-5 w-5 text-primary" />
                                                    ) : (
                                                        <MapPin className="h-5 w-5 text-amber-600" />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-foreground">{alert.name}</p>
                                                    <p className="text-sm text-muted-foreground truncate">
                                                        {alert.origin} → {alert.destination}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                                                        <span className="text-xs text-muted-foreground">{alert.time}</span>
                                                        <span className="text-xs text-muted-foreground">·</span>
                                                        <span className="text-xs text-muted-foreground">{alert.days.join(', ')}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Switch
                                                    checked={alert.enabled}
                                                    onCheckedChange={() => toggleAlert(alert.id)}
                                                />
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-muted-foreground hover:text-destructive"
                                                    onClick={() => deleteAlert(alert.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </section>

                {/* Add new alert form */}
                {showAddForm ? (
                    <Card className="border-2 border-primary">
                        <CardContent className="p-4 space-y-4">
                            <h3 className="font-semibold text-foreground">Nueva alerta</h3>

                            <div>
                                <label className="text-sm font-medium text-foreground mb-1.5 block">Nombre</label>
                                <Input
                                    value={alertName}
                                    onChange={(e) => setAlertName(e.target.value)}
                                    placeholder="Ej: Ir al trabajo"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-sm font-medium text-foreground mb-1.5 block">Origen</label>
                                    <Input
                                        value={origin}
                                        onChange={(e) => setOrigin(e.target.value)}
                                        placeholder="¿Desde dónde?"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-foreground mb-1.5 block">Destino</label>
                                    <Input
                                        value={destination}
                                        onChange={(e) => setDestination(e.target.value)}
                                        placeholder="¿A dónde?"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-foreground mb-1.5 block">Hora de salida</label>
                                <Input
                                    type="time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-foreground mb-1.5 block">Días</label>
                                <div className="flex gap-1">
                                    {daysOfWeek.map((day) => (
                                        <button
                                            key={day.id}
                                            onClick={() => toggleDay(day.id)}
                                            className={cn(
                                                'flex-1 py-2 text-xs font-medium rounded-lg border transition-colors',
                                                selectedDays.includes(day.id)
                                                    ? 'bg-primary text-primary-foreground border-primary'
                                                    : 'bg-card text-foreground border-border hover:border-primary'
                                            )}
                                        >
                                            {day.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-foreground mb-1.5 block">Tipo de transporte</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        { id: 'bus' as const, icon: Bus, label: 'Bus', color: 'text-primary' },
                                        { id: 'metro' as const, icon: Train, label: 'Metro', color: 'text-accent' },
                                        { id: 'mixed' as const, icon: MapPin, label: 'Mixto', color: 'text-amber-600' },
                                    ].map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => setTransport(option.id)}
                                            className={cn(
                                                'flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-colors',
                                                transport === option.id
                                                    ? 'border-primary bg-primary/10'
                                                    : 'border-border hover:border-muted-foreground'
                                            )}
                                        >
                                            <option.icon className={cn('h-5 w-5', option.color)} />
                                            <span className="text-xs font-medium text-foreground">{option.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-2 pt-2">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setShowAddForm(false)}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    className="flex-1"
                                    onClick={handleSaveAlert}
                                    disabled={!alertName || !origin || !destination || !time || selectedDays.length === 0}
                                >
                                    Guardar
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <Button
                        className="w-full h-12"
                        onClick={() => setShowAddForm(true)}
                    >
                        <Plus className="h-5 w-5 mr-2" />
                        Agregar nueva alerta
                    </Button>
                )}
            </div>

            {/* Toast */}
            {showSavedToast && (
                <div className="fixed bottom-28 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4">
                    <Check className="h-4 w-4" />
                    <span className="text-sm font-medium">Alerta guardada</span>
                </div>
            )}
        </div>
    )
}
