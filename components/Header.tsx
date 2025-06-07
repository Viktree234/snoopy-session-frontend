import Image from 'next/image';

export default function Header() {
  return (
    <header style={{display: 'flex', alignItems: 'center', gap: 16, padding: 24, background: '#fff', boxShadow: '0 2px 8px #eee'}}>
      <Image src="/snoppy-logo.png" width={48} height={48} alt="Snoppy Logo" />
      <div>
        <h1 style={{margin: 0, fontSize: 28}}>Snoppy Session Pairing</h1>
        <p style={{margin: 0, color: '#666'}}>Connect your WhatsApp bot in seconds</p>
      </div>
    </header>
  )
}