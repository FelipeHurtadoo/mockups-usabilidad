'use client'

import { useState } from 'react'
import { MapPin, Mail, Lock, User, Eye, EyeOff, ArrowRight, Check } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface AuthScreenProps {
    onAuthenticated: () => void
}

type AuthMode = 'login' | 'register'

export function AuthScreen({ onAuthenticated }: AuthScreenProps) {
    const [mode, setMode] = useState<AuthMode>('login')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    // Form fields
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        // Validaciones básicas
        if (!email || !password) {
            setError('Por favor completa todos los campos')
            return
        }

        if (mode === 'register') {
            if (!name) {
                setError('Por favor ingresa tu nombre')
                return
            }
            if (password !== confirmPassword) {
                setError('Las contraseñas no coinciden')
                return
            }
            if (password.length < 6) {
                setError('La contraseña debe tener al menos 6 caracteres')
                return
            }
        }

        setIsLoading(true)

        // Simulación de autenticación
        await new Promise(resolve => setTimeout(resolve, 1500))

        setIsLoading(false)
        onAuthenticated()
    }

    const toggleMode = () => {
        setMode(mode === 'login' ? 'register' : 'login')
        setError('')
        setPassword('')
        setConfirmPassword('')
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Header con branding */}
            <div className="bg-primary text-primary-foreground px-6 pt-12 pb-16 rounded-b-[2.5rem]">
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-primary-foreground/20 p-2.5 rounded-xl">
                        <MapPin className="h-7 w-7" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">RUTY</h1>
                        <p className="text-primary-foreground/80 text-sm">Tu ruta, tu destino</p>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-bold">
                        {mode === 'login' ? 'Bienvenido de vuelta' : 'Crea tu cuenta'}
                    </h2>
                    <p className="text-primary-foreground/80 mt-1">
                        {mode === 'login'
                            ? 'Inicia sesión para continuar tu viaje'
                            : 'Únete para planificar tus rutas'}
                    </p>
                </div>
            </div>

            {/* Formulario */}
            <div className="flex-1 px-4 -mt-8">
                <Card className="shadow-xl">
                    <CardContent className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Nombre (solo registro) */}
                            {mode === 'register' && (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Nombre completo</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Tu nombre"
                                            className="pl-10 h-12"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Correo electrónico</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="correo@ejemplo.com"
                                        className="pl-10 h-12"
                                    />
                                </div>
                            </div>

                            {/* Contraseña */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Contraseña</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="pl-10 pr-10 h-12"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirmar contraseña (solo registro) */}
                            {mode === 'register' && (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Confirmar contraseña</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input
                                            type={showPassword ? 'text' : 'password'}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="pl-10 h-12"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Error message */}
                            {error && (
                                <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">
                                    {error}
                                </div>
                            )}

                            {/* Olvidé mi contraseña (solo login) */}
                            {mode === 'login' && (
                                <button type="button" className="text-sm text-primary hover:underline">
                                    ¿Olvidaste tu contraseña?
                                </button>
                            )}

                            {/* Submit button */}
                            <Button
                                type="submit"
                                className="w-full h-12 text-base"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                        <span>{mode === 'login' ? 'Iniciando sesión...' : 'Creando cuenta...'}</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <span>{mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}</span>
                                        <ArrowRight className="h-5 w-5" />
                                    </div>
                                )}
                            </Button>
                        </form>

                        {/* Separator */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">o continúa con</span>
                            </div>
                        </div>

                        {/* Social login buttons */}
                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" className="h-12" type="button">
                                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Google
                            </Button>
                            <Button variant="outline" className="h-12" type="button">
                                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                                </svg>
                                Apple
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Toggle mode */}
                <div className="text-center mt-6 pb-8">
                    <p className="text-muted-foreground">
                        {mode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
                        <button
                            onClick={toggleMode}
                            className="text-primary font-semibold ml-1 hover:underline"
                        >
                            {mode === 'login' ? 'Regístrate' : 'Inicia sesión'}
                        </button>
                    </p>
                </div>
            </div>

            {/* Features highlight (solo visible en registro) */}
            {mode === 'register' && (
                <div className="px-6 pb-8 space-y-3">
                    <p className="text-sm font-medium text-foreground">Con RUTY podrás:</p>
                    <div className="space-y-2">
                        {[
                            'Planificar rutas multimodales en tiempo real',
                            'Pagar tu transporte desde la app',
                            'Recibir alertas de la comunidad'
                        ].map((feature, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Check className="h-4 w-4 text-primary" />
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}