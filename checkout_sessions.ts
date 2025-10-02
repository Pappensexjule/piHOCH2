
import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-09-30.acacia',
})

const allowlist = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const origin = req.headers.origin || ''
  if (allowlist.length && !allowlist.includes(origin)) {
    return res.status(403).json({ error: 'Origin not allowed' })
  }

  try {
    const { lineItems, successUrl, cancelUrl, customerEmail, mode = 'payment' } = req.body || {}

    if (!Array.isArray(lineItems) || lineItems.length === 0) {
      return res.status(400).json({ error: 'lineItems required' })
    }

    const session = await stripe.checkout.sessions.create({
      mode,
      payment_method_types: ['card', 'sepa_debit', 'bancontact', 'ideal', 'giropay'],
      billing_address_collection: 'auto',
      customer_email: customerEmail,
      line_items: lineItems,
      success_url: successUrl || `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${origin}/cancelled`,
      automatic_tax: { enabled: true },
      phone_number_collection: { enabled: true },
      currency: 'eur',
      metadata: { project: 'pihoch2', source: 'FINCHI' }
    })

    return res.status(200).json({ id: session.id, url: session.url })
  } catch (err: any) {
    console.error(err)
    return res.status(500).json({ error: err.message || 'Stripe error' })
  }
}
