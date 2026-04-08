'use client'

import { useState, useEffect } from 'react'
import { AuthScreen } from '@/components/ruty/auth-screen'
import { BottomNav } from '@/components/ruty/bottom-nav'
import { HomeScreen } from '@/components/ruty/home-screen'
import { SearchScreen } from '@/components/ruty/search-screen'
import { NavigationScreen } from '@/components/ruty/navigation-screen'
import { RoutesScreen } from '@/components/ruty/routes-screen'
import { WalletScreen } from '@/components/ruty/wallet-screen'
import { AlertsScreen } from '@/components/ruty/alerts-screen'
import {
  favoriteRoutes,
  searchResults,
  transactions as initialTransactions,
  alerts as initialAlerts,
  nearbyStops
} from '@/lib/mock-data'
import type { Screen, Route, Alert, Transaction } from '@/lib/types'

export default function RutyApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentScreen, setCurrentScreen] = useState<Screen>('home')
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null)
  const [balance, setBalance] = useState(15.50)
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts)

  const recentSearches = [
    'Aeropuerto Internacional',
    'Centro Comercial Plaza',
    'Universidad Nacional',
    'Hospital Central'
  ]

  const handleAuthenticated = () => {
    setIsAuthenticated(true)
  }

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen)
    if (screen !== 'navigation') {
      setSelectedRoute(null)
    }
  }

  // Si no está autenticado, mostrar pantalla de login/registro
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen max-w-lg mx-auto bg-background">
        <AuthScreen onAuthenticated={handleAuthenticated} />
      </main>
    )
  }

  const handleSearch = () => {
    setCurrentScreen('search')
  }

  const handleSelectRoute = (route: Route) => {
    setSelectedRoute(route)
    setCurrentScreen('navigation')
  }

  const handleRecharge = (amount: number) => {
    setBalance(prev => prev + amount)
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'recharge',
      amount: amount,
      date: new Date().toISOString().split('T')[0],
      description: 'Recarga de saldo'
    }
    setTransactions(prev => [newTransaction, ...prev])
  }

  const handleAddAlert = (alertData: Omit<Alert, 'id' | 'timestamp' | 'votes'>) => {
    const newAlert: Alert = {
      ...alertData,
      id: Date.now().toString(),
      timestamp: 'Ahora',
      votes: 1
    }
    setAlerts(prev => [newAlert, ...prev])
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen
            favoriteRoutes={favoriteRoutes}
            nearbyStops={nearbyStops}
            alerts={alerts}
            onSearch={handleSearch}
            onSelectRoute={handleSelectRoute}
          />
        )
      case 'search':
        return (
          <SearchScreen
            searchResults={searchResults}
            onBack={() => setCurrentScreen('home')}
            onSelectRoute={handleSelectRoute}
          />
        )
      case 'navigation':
        return selectedRoute ? (
          <NavigationScreen
            route={selectedRoute}
            onClose={() => setCurrentScreen('home')}
          />
        ) : null
      case 'routes':
        return (
          <RoutesScreen
            favoriteRoutes={favoriteRoutes}
            recentSearches={recentSearches}
            onSearch={handleSearch}
            onSelectRoute={handleSelectRoute}
          />
        )
      case 'wallet':
        return (
          <WalletScreen
            balance={balance}
            transactions={transactions}
            onRecharge={handleRecharge}
          />
        )
      case 'alerts':
        return (
          <AlertsScreen
            alerts={alerts}
            onAddAlert={handleAddAlert}
          />
        )
      default:
        return null
    }
  }

  return (
    <main className="min-h-screen max-w-lg mx-auto bg-background relative">
      <div className="h-screen overflow-y-auto pb-20">
        {renderScreen()}
      </div>
      <BottomNav
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
      />
    </main>
  )
}
