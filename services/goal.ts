import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"
import { firebaseApp } from "@/firebase"

const db = getFirestore(firebaseApp)

export const setBussinesGoal = async (goal: number, uid:string) => {
    const goalData = {data: JSON.stringify(goal)}
    const goalRef =  doc(db, `monthlyGoal/${uid}`)
    setDoc(goalRef, goalData)    
}

export const getUserGoal = async (uid:string) => {
    const docRef = doc(db, 'monthlyGoal', uid);
    const docSnap = await getDoc(docRef);
    let userGoal: any = []
    const myPromise = new Promise <number> ((resolve, reject) => {
        setTimeout(() => {
            if (docSnap.exists()) {
                resolve(parseFloat(docSnap.data()?.data))
            } else {
                resolve(userGoal)
              }
        }, 300);
      })
      return myPromise
}