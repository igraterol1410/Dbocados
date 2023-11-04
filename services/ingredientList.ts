import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"
import { firebaseApp } from "@/firebase"
import { Ingredients } from "@/types/ingredients"
import { Expenses } from "@/types/extraExpenses"

const db = getFirestore(firebaseApp)

export const createIngredientsList = async (ingredients: Ingredients[], uid:string) => {
    const ingredientsData = {data: JSON.stringify(ingredients)}
    const ingredientsRef =  doc(db, `ingredients/${uid}`)
    setDoc(ingredientsRef, ingredientsData)    
}

export const getUserIngredients = async (uid:string) => {
    const docRef = doc(db, 'ingredients', uid);
    const docSnap = await getDoc(docRef);
    let ingredientsList: any = []
    const myPromise = new Promise <[]> ((resolve, reject) => {
        setTimeout(() => {
            if (docSnap.exists()) {
                resolve(JSON.parse(docSnap.data()?.data))
            } else {
                resolve(ingredientsList)
              }
        }, 300);
      })
      return myPromise
}

export const setExtraExpenses = async (expenses: Expenses[], uid:string) => {
    const expensesData = {data: JSON.stringify(expenses)}
    const expensesRef =  doc(db, `extraExpenses/${uid}`)
    setDoc(expensesRef, expensesData)    
}

export const getUserExtraExpenses = async (uid:string) => {
    const docRef = doc(db, 'extraExpenses', uid);
    const docSnap = await getDoc(docRef);
    let extraExpensesList: any = []
    const myPromise = new Promise <[]> ((resolve, reject) => {
        setTimeout(() => {
            if (docSnap.exists()) {
                resolve(JSON.parse(docSnap.data()?.data))
            } else {
                resolve(extraExpensesList)
              }
        }, 300);
      })
      return myPromise
}