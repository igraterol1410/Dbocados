import { getFirestore, collection, addDoc, doc, setDoc, getDoc } from "firebase/firestore"
import { firebaseApp } from "@/firebase"

const db = getFirestore(firebaseApp)

export const createNewCtz = async (ctz: {}, uid:string) => {
    const ctzData = {ctzData: JSON.stringify(ctz)}
    const ctzRef =  doc(db, `ctz/${uid}`)
    setDoc(ctzRef, ctzData)    
}

export const getUserCtzs = async (uid:string) => {
    const docRef = doc(db, 'ctz', uid);
    const docSnap = await getDoc(docRef);
    let allCtzs: any = []
    const myPromise = new Promise <[]> ((resolve, reject) => {
        setTimeout(() => {
            if (docSnap.exists()) {
                resolve(JSON.parse(docSnap.data()?.ctzData))
            } else {
                resolve(allCtzs)
              }
        }, 300);
      })
      return myPromise
}