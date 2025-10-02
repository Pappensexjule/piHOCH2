
import React, { useState } from 'react'

type Props = {
  priceId?: string
  label?: string
  amountEuro?: number
  successUrl?: string
  cancelUrl?: string
  customerEmail?: string
}

export default function StripeCheckoutButton({
  priceId,
  label = 'Jetzt bezahlen',
  amountEuro,
  successUrl,
  cancelUrl,
  customerEmail
}: Props) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    try {
      const lineItems = priceId
        ? [{ price: priceId, quantity: 1 }]
        : amountEuro
          ? [{ price_data: { currency: 'eur', product_data: { name: 'Custom Payment' }, unit_amount: Math.round(amountEuro * 100) }, quantity: 1 }]
          : []

      const res = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lineItems, successUrl, cancelUrl, customerEmail })
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Fehler beim Starten des Checkouts.')
      }
    } catch (e) {
      console.error(e)
      alert('Checkout fehlgeschlagen.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button onClick={handleClick} disabled={loading} style={{padding:'12px 16px', borderRadius:12, border:'1px solid #333', background:'#111', color:'#fff'}}>
      {loading ? '…' : label}
    </button>
  )
}
