import { useState } from 'react'
import axios from 'axios'

export default function PhonePairing({ onBack }: { onBack: () => void }) {
  const [phone, setPhone] = useState('')
  const [token, setToken] = useState('')
  const [status, setStatus] = useState<string | null>(null)
  const [paired, setPaired] = useState(false)

  const handlePair = async () => {
    setStatus('Pairing...')
    try {
      const res = await axios.post('/api/session/phone', { phone, token })
      if (res.data.paired) {
        setPaired(true)
        setStatus('Paired! Your WhatsApp Cloud API bot is connected.')
      } else {
        setStatus('Failed to pair. Check your details and try again.')
      }
    } catch {
      setStatus('Error pairing. Try again.')
    }
  }

  return (
    <div style={{textAlign: 'center'}}>
      <button onClick={onBack} style={{float: 'left', marginBottom: 16}}>← Back</button>
      <h3>Phone Number Pairing</h3>
      <div style={{margin: '32px 0'}}>
        <input 
          type="text" 
          placeholder="Phone Number (e.g., +1234567890)" 
          value={phone}
          onChange={e => setPhone(e.target.value)}
          style={{width: '80%', padding: 12, borderRadius: 8, border: '1px solid #ccc', marginBottom: 16}}
          disabled={paired}
        /><br/>
        <input 
          type="password" 
          placeholder="Cloud API Token"
          value={token}
          onChange={e => setToken(e.target.value)}
          style={{width: '80%', padding: 12, borderRadius: 8, border: '1px solid #ccc'}}
          disabled={paired}
        /><br/>
        <button onClick={handlePair} disabled={!phone || !token || paired} style={{marginTop: 24}}>Pair</button>
      </div>
      {status && <p>{status}</p>}
    </div>
  )
}