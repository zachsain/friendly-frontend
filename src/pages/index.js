import { Inter } from 'next/font/google'
import { Test } from './components/Test'
import { Home } from './components/Home'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  return (
    <>
    <div>
      <Test/>
      <Home />
    
    </div>
    {/* <App/> */}
    </>
  )
}
