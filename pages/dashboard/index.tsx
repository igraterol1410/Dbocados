import React, { useEffect } from 'react'
import  { Grid } from '@chakra-ui/react'
import DbocadosLogo from '@/assets/logo.svg'
import Image from 'next/image'
// import { useRouter } from 'next/router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { firebaseApp } from '@/firebase'
import { getUserData } from '@/services/users'

const Dashboard = () => {
    const auth = getAuth(firebaseApp)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user){
                getUserData(user.uid).then((res:any) => {
                    console.log(res)
                })
            }
        })
    }, [])
  return (
    <Grid 
    alignItems='center' 
    justifyContent='center'            
    h={['100%','calc(100vh - 50px)']}
    w='full'
    >
        <Image
        src={DbocadosLogo}
        alt='Logo dbocados'
        />
    </Grid>
  )
}

export default Dashboard
