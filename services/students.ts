import { getFirestore, collection, addDoc } from "firebase/firestore"
import { firebaseApp } from "@/firebase"

const db = getFirestore(firebaseApp)
export const createNewStudent = async (student: {}) => {
    const newStudent = await addDoc(collection(db, "virtual-course-1"), student)
    const myPromise = new Promise <{}> ((resolve, reject) => {
      setTimeout(() => {
          resolve(newStudent);
      }, 300);
    })
    return myPromise
}
