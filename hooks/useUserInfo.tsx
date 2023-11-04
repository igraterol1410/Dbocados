import { firebaseApp } from '@/firebase';
import { getUserData } from '@/services/users';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react'
import { isGeneratorFunction } from 'util/types';

export default function useUserInfo () {
  const [userInfo, setUserInfo] = useState<{}>({})
  const [ctzUser, setCtzUser] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [uid, setUid] = useState<string>('')
  const auth = getAuth(firebaseApp);
  const user = auth.currentUser;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if(user){
          setUid(user.uid)
          getUserData(user.uid).then((res:any) => {
            setCtzUser(res.ctzUser)
            setUserInfo(res)
            setLoading(false)
        })
      }
    })
}, [])


  return { uid, userInfo, ctzUser, loading }
}