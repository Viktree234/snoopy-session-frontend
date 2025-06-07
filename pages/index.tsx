import Header from '../components/Header'
import { useState } from 'react'
import QRPairing from '../components/QRPairing'
import PhonePairing from '../components/PhonePairing'

export default function Home() {
  const [mode, setMode] = useState<'qr' | 'phone' | null>(null)

  return (
    <>
      <Header />
      <main style={{maxWidth: 500, margin: '40px auto', background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 4px 24px #eee'}}>
        {!mode && (
          <>
            <h2>Choose Pairing Method</h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: 24, marginTop: 32}}>
              <button onClick={() => setMode('qr')}>Pair using QR Code (Personal)</button>
              <button onClick={() => setMode('phone')}>Pair using Phone Number (Business/Cloud API)</button>
            </div>
          </>
        )}
        {mode === 'qr' && <QRPairing onBack={() => setMode(null)} />}
        {mode === 'phone' && <PhonePairing onBack={() => setMode(null)} />}
      </main>
      <footer style={{textAlign: 'center', marginTop: 48, color: '#aaa'}}>© 2025 Snoppy | Powered by Viktree234</footer>
    </>
  )
}