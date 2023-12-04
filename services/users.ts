import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore"
import { firebaseApp } from "@/firebase"

const db = getFirestore(firebaseApp)
export const saveUser = async (user:any) => {
    const {email, uid} = user
    const payload = {
        email: email,
        rol: 'basic',
        status: 'signedUp',
        ctzUser: false,
        id: uid,
        hasIngredients: false,
        hasExpenses: false,
        hasGoal:false
    }
    const userRef =  doc(db, `usuarios/${uid}`)
    setDoc(userRef, payload)
}

export const updateUser = async (payload:any, uid:string) => {
    const userRef =  doc(db, `usuarios/${uid}`)
    setDoc(userRef, payload)
}

export const getUserData = async (uid:any) => {
    const userRef = doc(db, `usuarios/${uid}`)
    const userData = await getDoc(userRef)
    const data = userData.data()
    return data
}
