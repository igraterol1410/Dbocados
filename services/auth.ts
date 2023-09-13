import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { firebaseApp } from '@/firebase';
import { saveUser } from './users';

const auth = getAuth(firebaseApp);

export const loginUser = async (user:{email:string, password:string}) => {
  try {    
    const userCredential:{user:any} = await signInWithEmailAndPassword(auth, user.email, user.password)
    const response = {
      error: false,
      user: userCredential.user,
      message: 'Has iniciado sesión de forma exitosa'
    }
    return response
  }
  catch(error){
    console.log(error)
    let message = 'Credenciales invalidas'
    const response = {
      error: true,
      user:null,
      message: message
    }
    return response
  }
}

export const createUser = async (user:{email:string, password:string}) => {
  try {
    const userCredential:{user:any} = await createUserWithEmailAndPassword(auth, user.email, user.password)
    saveUser(userCredential.user)
    const response = {
      error: false,
      user: userCredential.user,
      message: 'Te has registrado de forma exitosa'
    }
    return response
  }
  catch(error){
    let message = 'Intenta registrarte nuevamente'
    const response = {
      error: true,
      user:null,
      message: message
    }
    return response
  }
}

export const logOut = async () => {
  await signOut(auth)
}
