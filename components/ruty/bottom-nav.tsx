'use client'

import { Map, Route, Wallet, Bell } from 'lucide-react'
import type { Screen } from '@/lib/types'
import { cn } from '@/lib/utils'

interface BottomNavProps {
  currentScreen: Screen
  onNavigate: (screen: Screen) => void
}

const navItems = [
  { id: 'home' as Screen, label: 'Inicio', icon: Map },
  { id: 'routes' as Screen, label: 'Rutas', icon: Route },
  { id: 'wallet' as Screen, label: 'Billetera', icon: Wallet },
  { id: 'alerts' as Screen, label: 'Alertas', icon: Bell },
]

export function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  return (
    <nav className="absolute bottom-0 w-full z-50 bg-card border-t border-border">
      <div className="flex items-center justify-around py-2 pb-6 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id || 
            (item.id === 'home' && currentScreen === 'navigation') ||
            (item.id === 'routes' && currentScreen === 'search')
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                'flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all',
                isActive 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <item.icon className={cn('h-6 w-6', isActive && 'stroke-[2.5px]')} />
              <span className={cn('text-xs font-medium', isActive && 'font-semibold')}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
