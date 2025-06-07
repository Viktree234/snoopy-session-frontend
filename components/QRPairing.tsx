import { useEffect, useState } from 'react'
import axios from 'axios'

export default function QRPairing({ onBack }: { onBack: () => void }) {
  const [qr, setQR] = useState<string | null>(null)
  const [status, setStatus] = useState<string>('Generating QR...')
  const [sessionId, setSessionId] = useState<string | null>(null)

  useEffect(() => {
    axios.post('/api/session/qr').then(res => {
      setSessionId(res.data.sessionId)
      setQR(res.data.qr)
      setStatus('Scan this QR code in WhatsApp to connect Snoppy!')
    }).catch(() => setStatus('Failed to generate QR code. Please try again.'))
  }, [])

  useEffect(() => {
    if (!sessionId) return
    const interval = setInterval(() => {
      axios.get(`/api/session/status?id=${sessionId}`).then(res => {
        if (res.data.paired) {
          setStatus('Paired! Your WhatsApp bot is now connected. You can close this page.')
          clearInterval(interval)
        }
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [sessionId])

  return (
    <div style={{textAlign: 'center'}}>
      <button onClick={onBack} style={{float: 'left', marginBottom: 16}}>← Back</button>
      <h3>QR Code Pairing</h3>
      <p>{status}</p>
      {qr && <img src={qr} alt="QR Code" style={{margin: '24px 0', width: 260, height: 260, background: '#eee', borderRadius: 16}} />}
    </div>
  )
}