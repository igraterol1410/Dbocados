import Layout from "@/components/layout/Layout"
import NavbarDashboard from "@/components/layout/NavbarDashboard"
import { Center, Grid } from '@chakra-ui/react'
import { getAuth } from "firebase/auth"
import { useRouter } from "next/router"
import { useEffect } from 'react'


const OnboardingScreener = () => {
    const router = useRouter()
    useEffect(() => {
        const auth = getAuth()
        console.log(auth.currentUser)
        if(!auth.currentUser){
            router.push('/')
        }
    }, [])
  return (
    <Layout>
        <NavbarDashboard />
        <Center>Onboarding Screener</Center>
        <Grid w='full' h='100%' alignItems='center' justifyContent='center'>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/LGh5T35hDe0?si=FLaQCM8sQLo79DWz" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </Grid>
    </Layout>
  )
}

export default OnboardingScreener
