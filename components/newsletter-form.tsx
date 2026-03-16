'use client'

import { useState } from 'react'
import { Mail, CheckCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface NewsletterFormProps {
  variant?: 'default' | 'compact' | 'minimal'
  className?: string
}

export default function NewsletterForm({ variant = 'default', className = '' }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const supabase = createClient()

      const { data, error: subscribeError } = await supabase
        .from('newsletter_subscribers')
        .insert([
          {
            email,
            subscribed_at: new Date().toISOString(),
          },
        ])
        .select()

      if (subscribeError) {
        // Check if it's a duplicate email error
        if (subscribeError.code === '23505') {
          setError('Cet email est déjà abonné')
        } else {
          setError(subscribeError.message)
        }
        return
      }

      setSubmitted(true)
      setEmail('')

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.')
      console.error('Newsletter subscription error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (variant === 'minimal') {
    return (
      <div className={className}>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            disabled={loading || submitted}
            className="px-4 py-2 bg-orange-600 text-white text-sm font-semibold rounded hover:bg-orange-700 disabled:bg-slate-400 transition-colors"
          >
            {submitted ? '✓' : loading ? '...' : 'S\'abonner'}
          </button>
        </form>
        {error && <p className="text-red-600 text-xs mt-2">{error}</p>}
        {submitted && <p className="text-green-600 text-xs mt-2">Merci de vous être abonné!</p>}
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={`bg-orange-50 border border-orange-200 rounded-lg p-6 ${className}`}>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <Mail className="w-6 h-6 text-orange-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-900 mb-1">Newsletter BATIMAG</h3>
            <p className="text-sm text-slate-600 mb-4">
              Les meilleures infos du secteur directement dans votre boîte mail
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                placeholder="Votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="submit"
                disabled={loading || submitted}
                className="px-4 py-2 bg-orange-600 text-white text-sm font-semibold rounded hover:bg-orange-700 disabled:bg-slate-400 transition-colors"
              >
                {submitted ? '✓' : loading ? '...' : 'S\'abonner'}
              </button>
            </form>
            {error && <p className="text-red-600 text-xs mt-2">{error}</p>}
            {submitted && <p className="text-green-600 text-xs mt-2">Merci de vous être abonné!</p>}
          </div>
        </div>
      </div>
    )
  }

  // Default variant - large card
  return (
    <div className={`bg-gradient-to-br from-orange-600 to-orange-700 text-white rounded-lg p-8 ${className}`}>
      {submitted ? (
        <div className="text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Bienvenue!</h3>
          <p className="text-orange-100">
            Vous êtes maintenant abonné à la newsletter BATIMAG. Vous recevrez nos meilleures actualités.
          </p>
        </div>
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-2">Restez informé</h2>
          <p className="text-orange-100 mb-6">
            Recevez les dernières actualités, offres d'emploi et formations du secteur de la construction directement dans votre boîte mail.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-orange-500 text-white placeholder-orange-200 focus:outline-none focus:ring-2 focus:ring-white focus:bg-orange-400 transition-colors"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-slate-800 text-white font-bold rounded-lg hover:bg-slate-900 disabled:bg-slate-600 transition-colors"
            >
              {loading ? 'Abonnement en cours...' : 'S\'abonner maintenant'}
            </button>
          </form>

          {error && (
            <p className="text-orange-200 text-sm mt-4 p-3 bg-orange-500/30 rounded">
              {error}
            </p>
          )}

          <p className="text-xs text-orange-100 mt-4">
            Nous respectons votre confidentialité. Désinscrivez-vous à tout moment.
          </p>
        </>
      )}
    </div>
  )
}
