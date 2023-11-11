import Layout from "@/components/layout/Layout"
import NavbarDashboard from "@/components/layout/NavbarDashboard"
import { firebaseApp } from "@/firebase"
import { Grid, Button } from '@chakra-ui/react'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"


const OnboardingScreener = () => {         
  const [asideOpen, setAsideOpen] = useState(true)
  const router = useRouter()
  const auth = getAuth(firebaseApp)

  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if(!user){
            router.push('/')
        }
    })
  }, [])
  return (
    <Layout>
        <NavbarDashboard asideOpen={asideOpen} setAsideOpen={setAsideOpen} />
        <Grid 
        alignItems='center' 
        justifyContent='center'            
        h={['100%','100vh']}
        w='full'
        >
          <Link href="/cotizador">
            <Button>Ir al panel</Button>
          </Link>
        </Grid>
    </Layout>
  )
}

export default OnboardingScreener
