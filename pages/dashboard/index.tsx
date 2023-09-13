import React from 'react'
import  { Grid } from '@chakra-ui/react'
import DbocadosLogo from '@/assets/logo.svg'
import Image from 'next/image'
import Layout from '@/components/layout/Layout'
import NavbarDashboard from '@/components/layout/NavbarDashboard'
import { useRouter } from 'next/router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { firebaseApp } from '@/firebase'
import { getUserData } from '@/services/users'

const index = () => {
    const auth = getAuth(firebaseApp)
    const router = useRouter()
    // const [user, setUser] = useState({})
    // const getUser = () => {
    //     getUserData()
    // }
    onAuthStateChanged(auth, (user) => {
        if(!user){
            router.push('/')
        } else {
            console.log(user.uid)
            getUserData(user.uid)
        }
    })
    // useEffect(() => {
    //     if(user){
    //         getUserData('R1YVPrSXYvQVWBO5WgwhwlRpixk1')
    //     }
    // }, [])
  return (
    <Layout>
        <NavbarDashboard />
        <Grid 
        alignItems='center' 
        justifyContent='center'            
        h={['100%','100vh']}
        w='full'
        >
            <Image
            src={DbocadosLogo}
            alt='Logo dbocados'
            />
        </Grid>
    </Layout>
  )
}

export default index
