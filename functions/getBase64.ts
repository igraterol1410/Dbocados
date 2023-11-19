const getBase64 = (file:any) => {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.readAsDataURL(file)
      } catch (error) {
        reject(error)
      }
    })
  }
  
  export default getBase64