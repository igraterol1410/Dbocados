import React, { useState, useEffect } from 'react'
import { Grid } from '@chakra-ui/react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getUserData } from '@/services/users'
import { firebaseApp } from '@/firebase'
import Image from 'next/image'

import DbocadosLogo from '@/assets/logo.svg'

const Courses = () => {
  const [user, setUser] = useState<any>({})
    const auth = getAuth(firebaseApp)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user){
                getUserData(user.uid).then((res:any) => {
                  setUser(res)
                })
            }
        })
    }, [])
  return (
    <Grid justifyContent='center' alignItems='center' h='calc(100vh - 50px)'>
      {
        user && user.rol === 'admin'
        ? (
          <iframe width="560" height="315" src="https://www.youtube.com/embed/XNjzhB6XYM4?si=1RW7swuQSEmBPAfO" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        )
        : (
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
    </Grid>
  )
}

export default Courses