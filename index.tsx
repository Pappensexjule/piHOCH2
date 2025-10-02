
import StripeCheckoutButton from '@/components/StripeCheckoutButton'

export default function Home(){
  return (
    <main className="container">
      <h1>FINCHI (Φ) — Das Gehirn des Imperiums</h1>
      <p>Stetiger Wandel. Stetiges Wachstum. Unendliche Liebe.</p>
      <hr />
      <h2>Beispiel Checkout</h2>
      <p>Teste einen Kauffluss (39 €):</p>
      <StripeCheckoutButton amountEuro={39} label="Jetzt 39 € zahlen" />
    </main>
  )
}
