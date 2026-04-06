import type { Route, Transaction, Alert, Stop } from './types'

export const favoriteRoutes: Route[] = [
  {
    id: '1',
    name: 'Bus 101 → Metro L1',
    type: 'bus',
    duration: 25,
    cost: 2.50,
    walkDistance: 200,
    transfers: 1,
    eta: '3 min',
    steps: [
      {
        type: 'walk',
        from: 'Tu ubicación',
        to: 'Parada Av. Principal',
        duration: 3,
        instruction: 'Camina hacia la Av. Principal',
        accessibility: { hasRamp: true, hasElevator: false }
      },
      {
        type: 'bus',
        line: '101',
        from: 'Av. Principal',
        to: 'Estación Central',
        duration: 15,
        instruction: 'Toma el Bus 101 dirección Centro',
        accessibility: { hasRamp: true, hasElevator: false }
      },
      {
        type: 'metro',
        line: 'L1',
        from: 'Estación Central',
        to: 'Plaza Mayor',
        duration: 7,
        instruction: 'Transbordo a Metro Línea 1',
        accessibility: { hasRamp: true, hasElevator: true }
      }
    ]
  },
  {
    id: '2',
    name: 'Metro L2 Directo',
    type: 'metro',
    duration: 18,
    cost: 2.00,
    walkDistance: 350,
    transfers: 0,
    eta: '5 min',
    steps: [
      {
        type: 'walk',
        from: 'Tu ubicación',
        to: 'Estación Universidad',
        duration: 5,
        instruction: 'Camina hacia la Estación Universidad',
        accessibility: { hasRamp: true, hasElevator: true }
      },
      {
        type: 'metro',
        line: 'L2',
        from: 'Universidad',
        to: 'Plaza Mayor',
        duration: 13,
        instruction: 'Toma Metro Línea 2 dirección Sur',
        accessibility: { hasRamp: true, hasElevator: true }
      }
    ]
  }
]

export const searchResults: Route[] = [
  {
    id: '3',
    name: 'Ruta más rápida',
    type: 'metro',
    duration: 22,
    cost: 2.50,
    walkDistance: 150,
    transfers: 1,
    eta: '2 min',
    steps: [
      {
        type: 'walk',
        from: 'Tu ubicación',
        to: 'Parada Centro',
        duration: 2,
        instruction: 'Camina 150m hacia Parada Centro',
        accessibility: { hasRamp: true, hasElevator: false }
      },
      {
        type: 'bus',
        line: '45',
        from: 'Parada Centro',
        to: 'Terminal Norte',
        duration: 12,
        instruction: 'Bus 45 → Terminal Norte',
        accessibility: { hasRamp: true, hasElevator: false }
      },
      {
        type: 'metro',
        line: 'L3',
        from: 'Terminal Norte',
        to: 'Aeropuerto',
        duration: 8,
        instruction: 'Metro L3 → Aeropuerto',
        accessibility: { hasRamp: true, hasElevator: true }
      }
    ]
  },
  {
    id: '4',
    name: 'Sin transbordos',
    type: 'bus',
    duration: 35,
    cost: 2.00,
    walkDistance: 100,
    transfers: 0,
    eta: '8 min',
    steps: [
      {
        type: 'walk',
        from: 'Tu ubicación',
        to: 'Av. Libertad',
        duration: 2,
        instruction: 'Camina hacia Av. Libertad',
        accessibility: { hasRamp: true, hasElevator: false }
      },
      {
        type: 'bus',
        line: '78',
        from: 'Av. Libertad',
        to: 'Aeropuerto',
        duration: 33,
        instruction: 'Bus 78 directo al Aeropuerto',
        accessibility: { hasRamp: true, hasElevator: false }
      }
    ]
  },
  {
    id: '5',
    name: 'Más económica',
    type: 'bus',
    duration: 40,
    cost: 1.50,
    walkDistance: 400,
    transfers: 0,
    eta: '12 min',
    steps: [
      {
        type: 'walk',
        from: 'Tu ubicación',
        to: 'Plaza San Martín',
        duration: 5,
        instruction: 'Camina hacia Plaza San Martín',
        accessibility: { hasRamp: false, hasElevator: false }
      },
      {
        type: 'bus',
        line: '120',
        from: 'Plaza San Martín',
        to: 'Aeropuerto',
        duration: 35,
        instruction: 'Bus 120 → Aeropuerto (ruta larga)',
        accessibility: { hasRamp: true, hasElevator: false }
      }
    ]
  }
]

export const transactions: Transaction[] = [
  { id: '1', type: 'recharge', amount: 20.00, date: '2026-03-24', description: 'Recarga de saldo' },
  { id: '2', type: 'payment', amount: -2.50, date: '2026-03-24', description: 'Viaje Metro L1' },
  { id: '3', type: 'payment', amount: -2.00, date: '2026-03-23', description: 'Viaje Bus 101' },
  { id: '4', type: 'payment', amount: -2.50, date: '2026-03-23', description: 'Viaje combinado' },
  { id: '5', type: 'recharge', amount: 10.00, date: '2026-03-22', description: 'Recarga de saldo' },
]

export const alerts: Alert[] = [
  {
    id: '1',
    type: 'delay',
    line: 'Metro L1',
    title: 'Retraso de 10 minutos',
    description: 'Debido a un incidente técnico, la Línea 1 presenta retrasos de aproximadamente 10 minutos.',
    timestamp: 'Hace 5 min',
    votes: 24
  },
  {
    id: '2',
    type: 'crowded',
    line: 'Bus 101',
    title: 'Bus muy lleno',
    description: 'El bus 101 en dirección Centro está muy lleno en este momento. Se recomienda esperar el siguiente.',
    timestamp: 'Hace 12 min',
    votes: 15
  },
  {
    id: '3',
    type: 'closed',
    line: 'Estación Central',
    title: 'Salida Norte cerrada',
    description: 'La salida Norte de Estación Central está temporalmente cerrada por mantenimiento.',
    timestamp: 'Hace 30 min',
    votes: 42
  },
  {
    id: '4',
    type: 'cancel',
    line: 'Bus 78',
    title: 'Servicio cancelado',
    description: 'El servicio del Bus 78 está cancelado hasta las 18:00 por manifestación en la ruta.',
    timestamp: 'Hace 1 hora',
    votes: 67
  }
]

export const nearbyStops: Stop[] = [
  { id: '1', name: 'Av. Principal', type: 'bus', line: 'Bus 101', distance: '2 min', nextArrival: '3 min', lat: -12.0464, lng: -77.0428 },
  { id: '2', name: 'Universidad', type: 'metro', line: 'Línea 2', distance: '4 min', nextArrival: '5 min', lat: -12.0450, lng: -77.0400 },
  { id: '3', name: 'Centro Histórico', type: 'bus', line: 'Bus 45', distance: '5 min', nextArrival: '8 min', lat: -12.0480, lng: -77.0450 },
  { id: '4', name: 'Insurgentes', type: 'metro', line: 'Línea 1', distance: '6 min', nextArrival: '2 min', lat: -12.0490, lng: -77.0460 },
]
