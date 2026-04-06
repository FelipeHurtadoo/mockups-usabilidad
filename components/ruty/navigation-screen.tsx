'use client'

import { useState } from 'react'
import { X, ChevronDown, ChevronUp, Bus, Train, Footprints, Clock, CheckCircle, Circle, Accessibility } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapView } from './map-view'
import type { Route, RouteStep } from '@/lib/types'
import { cn } from '@/lib/utils'

interface NavigationScreenProps {
  route: Route
  onClose: () => void
}

export function NavigationScreen({ route, onClose }: NavigationScreenProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [showAllSteps, setShowAllSteps] = useState(false)

  const handleNextStep = () => {
    if (currentStep < route.steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const step = route.steps[currentStep]

  const StepIcon = ({ type }: { type: RouteStep['type'] }) => {
    switch (type) {
      case 'walk':
        return <Footprints className="h-5 w-5" />
      case 'bus':
        return <Bus className="h-5 w-5" />
      case 'metro':
        return <Train className="h-5 w-5" />
    }
  }

  return (
    <div className="relative h-full">
      {/* Mapa simplificado */}
      <div className="absolute inset-0">
        <MapView stops={[]} showRoute simplified />
      </div>
      
      {/* Header con instrucción actual */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4">
        <Card className="shadow-xl">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={cn(
                  'p-2.5 rounded-full',
                  step.type === 'walk' ? 'bg-muted text-muted-foreground' :
                  step.type === 'bus' ? 'bg-primary/20 text-primary' :
                  'bg-accent/20 text-accent'
                )}>
                  <StepIcon type={step.type} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    Paso {currentStep + 1} de {route.steps.length}
                  </p>
                  <h2 className="font-bold text-lg text-foreground">{step.instruction}</h2>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{step.duration} min</span>
                </div>
                {step.line && (
                  <span className={cn(
                    'px-2 py-0.5 rounded text-sm font-medium',
                    step.type === 'bus' ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'
                  )}>
                    {step.type === 'bus' ? 'Bus' : 'Metro'} {step.line}
                  </span>
                )}
              </div>
              
              {/* Indicadores de accesibilidad */}
              {step.accessibility && (
                <div className="flex items-center gap-2">
                  {step.accessibility.hasRamp && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded flex items-center gap-1">
                      <Accessibility className="h-3 w-3" />
                      Rampa
                    </span>
                  )}
                  {step.accessibility.hasElevator && (
                    <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">
                      Ascensor
                    </span>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Panel inferior con todos los pasos */}
      <div className="absolute bottom-24 left-0 right-0 z-20 px-4">
        <Card className="shadow-xl">
          <CardContent className="p-4">
            {/* Toggle para mostrar todos los pasos */}
            <button 
              onClick={() => setShowAllSteps(!showAllSteps)}
              className="flex items-center justify-between w-full mb-3"
            >
              <span className="font-semibold text-foreground">Pasos del viaje</span>
              {showAllSteps ? (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
            
            {/* Lista de pasos */}
            <div className={cn('space-y-2 overflow-hidden transition-all', showAllSteps ? 'max-h-60' : 'max-h-0')}>
              {route.steps.map((s, index) => (
                <div 
                  key={index}
                  className={cn(
                    'flex items-center gap-3 p-2 rounded-lg transition-colors',
                    index === currentStep ? 'bg-primary/10' :
                    index < currentStep ? 'bg-muted/50' : ''
                  )}
                >
                  {index < currentStep ? (
                    <CheckCircle className="h-5 w-5 text-primary" />
                  ) : index === currentStep ? (
                    <Circle className="h-5 w-5 text-primary fill-primary" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                  <div className={cn(
                    'p-1 rounded',
                    s.type === 'walk' ? 'bg-muted' :
                    s.type === 'bus' ? 'bg-primary/20' : 'bg-accent/20'
                  )}>
                    <StepIcon type={s.type} />
                  </div>
                  <div className="flex-1">
                    <p className={cn(
                      'text-sm',
                      index <= currentStep ? 'font-medium text-foreground' : 'text-muted-foreground'
                    )}>
                      {s.instruction}
                    </p>
                    <p className="text-xs text-muted-foreground">{s.duration} min</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Botón de siguiente paso */}
            <Button 
              className="w-full mt-3" 
              size="lg"
              onClick={handleNextStep}
              disabled={currentStep >= route.steps.length - 1}
            >
              {currentStep >= route.steps.length - 1 ? (
                'Has llegado a tu destino'
              ) : (
                `Siguiente: ${route.steps[currentStep + 1]?.instruction.slice(0, 30)}...`
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
