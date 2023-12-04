import { getFirestore, collection, getDocs } from "firebase/firestore"
import { firebaseApp } from "@/firebase"

const db = getFirestore(firebaseApp)
export const getCourses = async () => {
    const courses = await getDocs(collection(db, "cursos"))
    const allCourses: any = []
    courses.forEach((doc) => {
        allCourses.push(doc.data())
    })
    const myPromise = new Promise <[]> ((resolve, reject) => {
      setTimeout(() => {
          resolve(allCourses);
      }, 300);
    })
    return myPromise
}
