'use client'

import { useState } from 'react'
import { Bell, AlertTriangle, Clock, Users, XCircle, Plus, ThumbsUp, Send, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Alert } from '@/lib/types'
import { cn } from '@/lib/utils'

interface AlertsScreenProps {
  alerts: Alert[]
  onAddAlert: (alert: Omit<Alert, 'id' | 'timestamp' | 'votes'>) => void
}

const alertTypeConfig: Record<string, { icon: typeof Clock, color: string, bg: string, label: string }> = {
  delay: { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10', label: 'Retraso' },
  cancel: { icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/10', label: 'Cancelado' },
  crowded: { icon: Users, color: 'text-primary', bg: 'bg-primary/10', label: 'Lleno' },
  closed: { icon: AlertTriangle, color: 'text-accent', bg: 'bg-accent/10', label: 'Cerrado' },
  closure: { icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/10', label: 'Cierre' },
}

export function AlertsScreen({ alerts, onAddAlert }: AlertsScreenProps) {
  const [showReportModal, setShowReportModal] = useState(false)
  const [reportType, setReportType] = useState<Alert['type']>('delay')
  const [reportLine, setReportLine] = useState('')
  const [reportTitle, setReportTitle] = useState('')
  const [reportDescription, setReportDescription] = useState('')
  const [localAlerts, setLocalAlerts] = useState(alerts)

  const handleVote = (alertId: string) => {
    setLocalAlerts(prev =>
      prev.map(alert =>
        alert.id === alertId
          ? { ...alert, votes: alert.votes + 1 }
          : alert
      )
    )
  }

  const handleSubmitReport = () => {
    if (reportLine && reportTitle) {
      onAddAlert({
        type: reportType,
        line: reportLine,
        title: reportTitle,
        description: reportDescription,
      })
      setShowReportModal(false)
      setReportLine('')
      setReportTitle('')
      setReportDescription('')
    }
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border p-4">
        <div className="flex items-center gap-2">
          <Bell className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold text-foreground">Alertas Comunitarias</h1>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Información en tiempo real de otros usuarios
        </p>
      </div>

      {/* Feed de alertas */}
      <div className="p-4 space-y-3">
        {localAlerts.map((alert) => {
          const config = alertTypeConfig[alert.type]
          const Icon = config.icon

          return (
            <Card key={alert.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={cn('p-2 rounded-full', config.bg)}>
                    <Icon className={cn('h-5 w-5', config.color)} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cn('text-xs font-medium px-2 py-0.5 rounded', config.bg, config.color)}>
                        {config.label}
                      </span>
                      <span className="text-xs text-muted-foreground">{alert.line}</span>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                    </div>
                    <h3 className="font-semibold text-foreground">{alert.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>

                    <div className="flex items-center gap-4 mt-3">
                      <button
                        onClick={() => handleVote(alert.id)}
                        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ThumbsUp className="h-4 w-4" />
                        <span>{alert.votes} confirmaciones</span>
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* FAB para reportar - dentro del contenedor con posición absoluta */}
      <div className="sticky bottom-4 flex justify-end px-4 pb-4 pointer-events-none">
        <button
          onClick={() => setShowReportModal(true)}
          className="bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:bg-primary/90 transition-colors pointer-events-auto"
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>

      {/* Modal de reporte */}
      {showReportModal && (
        <div className="fixed inset-0 bg-foreground/50 z-50 flex items-end">
          <div className="bg-card w-full rounded-t-3xl p-6 animate-in slide-in-from-bottom max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-foreground">Reportar incidencia</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowReportModal(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Tipo de incidencia */}
            <div className="mb-4">
              <label className="text-sm font-medium text-foreground mb-2 block">Tipo de incidencia</label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(alertTypeConfig) as Alert['type'][]).map((type) => {
                  const config = alertTypeConfig[type]
                  const Icon = config.icon
                  return (
                    <button
                      key={type}
                      onClick={() => setReportType(type)}
                      className={cn(
                        'flex items-center gap-2 p-3 rounded-lg border-2 transition-colors',
                        reportType === type
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-muted-foreground'
                      )}
                    >
                      <Icon className={cn('h-5 w-5', config.color)} />
                      <span className="font-medium text-sm text-foreground">{config.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Línea/Estación */}
            <div className="mb-4">
              <label className="text-sm font-medium text-foreground mb-2 block">Línea o estación</label>
              <Input
                value={reportLine}
                onChange={(e) => setReportLine(e.target.value)}
                placeholder="Ej: Metro L1, Bus 101, Estación Central"
              />
            </div>

            {/* Título */}
            <div className="mb-4">
              <label className="text-sm font-medium text-foreground mb-2 block">Título del reporte</label>
              <Input
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
                placeholder="Ej: Retraso de 15 minutos"
              />
            </div>

            {/* Descripción */}
            <div className="mb-6">
              <label className="text-sm font-medium text-foreground mb-2 block">Descripción (opcional)</label>
              <Input
                value={reportDescription}
                onChange={(e) => setReportDescription(e.target.value)}
                placeholder="Añade más detalles..."
              />
            </div>

            <Button
              className="w-full h-12"
              onClick={handleSubmitReport}
              disabled={!reportLine || !reportTitle}
            >
              <Send className="h-4 w-4 mr-2" />
              Enviar reporte
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
