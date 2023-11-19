/* eslint-disable react-hooks/exhaustive-deps */
import { FILTER_OPTIONS } from '@/constant/stock'
import { Ingredients } from '@/types/ingredients'
import { useEffect, useState } from 'react'

export default function useFilterTable (
    filterParam: {label:string, value:string},
    itemSearch:string,
    ingredients: Ingredients[]
) {
    const { value } = filterParam
    const [productsData, setProductsData] = useState<Ingredients[]>([])
    const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
      setProductsData(ingredients)
      setLoading(false)
    if(value && itemSearch && ingredients){
        let filteredUser = []
        switch(value) {
            case FILTER_OPTIONS[0].value:
                filteredUser = ingredients.filter((eachProduct:Ingredients) => eachProduct?.name?.toLowerCase().includes(itemSearch.toLocaleLowerCase()))
                setProductsData(filteredUser)
                break;
            case FILTER_OPTIONS[1].value:
                filteredUser = ingredients.filter((eachProduct:Ingredients) => eachProduct.amount?.toString().includes(itemSearch.toLocaleLowerCase()))
                setProductsData(filteredUser)
              break;
            case FILTER_OPTIONS[2].value:
                filteredUser = ingredients.filter((eachProduct:Ingredients) => eachProduct.unity?.toLowerCase().includes(itemSearch.toLocaleLowerCase()))
                setProductsData(filteredUser)
              break;
            // case FILTER_OPTIONS[3].value:
            //     filteredUser = ingredients.filter((eachProduct:Ingredients) => eachProduct.amount.includes(itemSearch))
            //     setProductsData(filteredUser)
            //   break;
            // case FILTER_OPTIONS[4].value:
            //     filteredUser = ingredients.filter((eachProduct:Ingredients) => eachProduct.position.toLowerCase().includes(itemSearch.toLocaleLowerCase()))
            //     setProductsData(filteredUser)
            //   break;
            default:
          }
    }
  }, [filterParam, itemSearch, ingredients])

  return { productsData, loading }
}