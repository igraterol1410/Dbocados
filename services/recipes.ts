import { getFirestore, collection, addDoc, doc, setDoc, getDoc } from "firebase/firestore"
import { firebaseApp } from "@/firebase"

const db = getFirestore(firebaseApp)

export const createNewRecipe = async (recipe: {}, uid:string) => {
    const recipeData = {recipeData: JSON.stringify(recipe)}
    const recipeRef =  doc(db, `recipes/${uid}`)
    setDoc(recipeRef, recipeData)    
}

export const getUserRecipes = async (uid:string) => {
    const docRef = doc(db, 'recipes', uid);
    const docSnap = await getDoc(docRef);
    let allRecipes: any = []
    const myPromise = new Promise <[]> ((resolve, reject) => {
        setTimeout(() => {
            if (docSnap.exists()) {
                resolve(JSON.parse(docSnap.data()?.recipeData))
            } else {
                resolve(allRecipes)
              }
        }, 300);
      })
      return myPromise
}

export const updateRecipe = async (recipe: {}) => {
    const newRecipe = await addDoc(collection(db, 'recipes'), recipe)
    const myPromise = new Promise <{}> ((resolve, reject) => {
      setTimeout(() => {
          resolve(newRecipe);
      }, 300);
    })
    return myPromise
}

export const deleteRecipe = async (recipe: {}) => {
    const newRecipe = await addDoc(collection(db, 'recipes'), recipe)
    const myPromise = new Promise <{}> ((resolve, reject) => {
      setTimeout(() => {
          resolve(newRecipe);
      }, 300);
    })
    return myPromise
}