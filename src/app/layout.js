import './globals.css'

export const metadata = {
  title: 'AIPoster.app: Free AI Poster Generator Online',
  description: 'Click to open AIPoster.app and generate 3D posters for free.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}