import { Inter } from 'next/font/google'
import RenderApp from './components/RenderApp'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  return (
    <>
    <div>
      <RenderApp />
    </div>
    </>
  )
}
