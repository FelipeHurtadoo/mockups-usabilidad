'use client'

import { useState } from 'react'
import { CreditCard, Plus, History, QrCode, ArrowUpRight, ArrowDownLeft, Check } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Transaction } from '@/lib/types'
import { cn } from '@/lib/utils'

interface WalletScreenProps {
  balance: number
  transactions: Transaction[]
  onRecharge: (amount: number) => void
}

const quickAmounts = [5, 10, 20, 50]

export function WalletScreen({ balance, transactions, onRecharge }: WalletScreenProps) {
  const [showRecharge, setShowRecharge] = useState(false)
  const [rechargeAmount, setRechargeAmount] = useState('')
  const [showQR, setShowQR] = useState(false)
  const [rechargeSuccess, setRechargeSuccess] = useState(false)

  const handleRecharge = () => {
    const amount = parseFloat(rechargeAmount)
    if (amount > 0) {
      onRecharge(amount)
      setRechargeSuccess(true)
      setTimeout(() => {
        setRechargeSuccess(false)
        setShowRecharge(false)
        setRechargeAmount('')
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 pb-20 rounded-b-3xl">
        <div className="flex items-center gap-2 mb-6">
          <CreditCard className="h-6 w-6" />
          <h1 className="text-xl font-bold">Mi Billetera</h1>
        </div>
        
        <div className="text-center">
          <p className="text-primary-foreground/80 text-sm">Saldo disponible</p>
          <p className="text-4xl font-bold mt-1">${balance.toFixed(2)}</p>
        </div>
      </div>
      
      {/* Acciones rápidas */}
      <div className="px-4 -mt-12">
        <Card className="shadow-lg">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-3">
              <Button 
                className="h-14 flex-col gap-1"
                onClick={() => setShowRecharge(true)}
              >
                <Plus className="h-5 w-5" />
                <span className="text-xs">Recargar</span>
              </Button>
              <Button 
                variant="secondary"
                className="h-14 flex-col gap-1"
                onClick={() => setShowQR(true)}
              >
                <QrCode className="h-5 w-5" />
                <span className="text-xs">Pagar con QR</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Historial de transacciones */}
      <div className="px-4 mt-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <History className="h-4 w-4" />
              Historial reciente
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-3">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'p-2 rounded-full',
                      tx.type === 'recharge' ? 'bg-primary/20' : 'bg-muted'
                    )}>
                      {tx.type === 'recharge' ? (
                        <ArrowDownLeft className="h-4 w-4 text-primary" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground">{tx.description}</p>
                      <p className="text-xs text-muted-foreground">{tx.date}</p>
                    </div>
                  </div>
                  <p className={cn(
                    'font-semibold',
                    tx.amount > 0 ? 'text-primary' : 'text-foreground'
                  )}>
                    {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Modal de recarga */}
      {showRecharge && (
        <div className="fixed inset-0 bg-foreground/50 z-50 flex items-end">
          <div className="bg-card w-full rounded-t-3xl p-6 animate-in slide-in-from-bottom">
            {rechargeSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">¡Recarga exitosa!</h3>
                <p className="text-muted-foreground mt-2">Se han añadido ${rechargeAmount} a tu saldo</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-foreground">Recargar saldo</h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowRecharge(false)}>
                    Cancelar
                  </Button>
                </div>
                
                <div className="mb-4">
                  <label className="text-sm text-muted-foreground">Monto a recargar</label>
                  <div className="relative mt-2">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input 
                      type="number"
                      value={rechargeAmount}
                      onChange={(e) => setRechargeAmount(e.target.value)}
                      placeholder="0.00"
                      className="pl-8 text-2xl h-14 font-bold"
                    />
                  </div>
                </div>
                
                <div className="flex gap-2 mb-6">
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setRechargeAmount(amount.toString())}
                      className={cn(
                        'flex-1 py-2 rounded-lg text-sm font-medium transition-colors',
                        rechargeAmount === amount.toString()
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      )}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                
                <Button className="w-full h-12" onClick={handleRecharge} disabled={!rechargeAmount}>
                  Recargar ${rechargeAmount || '0.00'}
                </Button>
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Modal QR */}
      {showQR && (
        <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-sm">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-bold mb-4 text-foreground">Código QR de pago</h3>
              
              {/* QR simulado */}
              <div className="bg-card p-4 rounded-xl border-2 border-border mx-auto w-48 h-48 flex items-center justify-center mb-4">
                <div className="grid grid-cols-5 gap-1">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        'w-6 h-6 rounded-sm',
                        Math.random() > 0.5 ? 'bg-foreground' : 'bg-card'
                      )}
                    />
                  ))}
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                Presenta este código al abordar el transporte
              </p>
              
              <p className="text-2xl font-bold text-primary mb-4">
                ${balance.toFixed(2)}
              </p>
              
              <Button variant="outline" className="w-full" onClick={() => setShowQR(false)}>
                Cerrar
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
