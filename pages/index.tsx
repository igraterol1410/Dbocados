import { Inter } from 'next/font/google'
import LandingPage from '@/components/LandingPage'
import Seo from '@/components/seo/Seo'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Seo 
    title=''
    description="D'Bocados Cake Shop web site"
    >
      <LandingPage />
    </Seo>
  )
}
