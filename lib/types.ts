export type Screen = 'home' | 'routes' | 'wallet' | 'alerts' | 'search' | 'navigation'

export interface Route {
  id: string
  name: string
  type: 'bus' | 'metro' | 'walk'
  duration: number
  cost: number
  walkDistance: number
  transfers: number
  eta: string
  steps: RouteStep[]
}

export interface RouteStep {
  type: 'bus' | 'metro' | 'walk'
  line?: string
  from: string
  to: string
  duration: number
  instruction: string
  accessibility?: {
    hasRamp: boolean
    hasElevator: boolean
  }
}

export interface Transaction {
  id: string
  type: 'recharge' | 'payment'
  amount: number
  date: string
  description: string
}

export interface Alert {
  id: string
  type: 'delay' | 'cancel' | 'crowded' | 'closed' | 'closure'
  line: string
  title: string
  description: string
  timestamp: string
  votes: number
}

export interface Stop {
  id: string
  name: string
  type: 'bus' | 'metro'
  line?: string
  distance?: string
  nextArrival?: string
  lat: number
  lng: number
}
