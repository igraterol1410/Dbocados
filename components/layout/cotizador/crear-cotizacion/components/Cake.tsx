import { useCtzActionsContext, useCtzStateContext } from '@/context/CotizacionContext'
import useGetRecipes from '@/hooks/useGetRecipes'
import { Box, Button, FormControl, Input, Select } from '@chakra-ui/react'
import React from 'react'

const Cake = () => {
    const { progress, ctzCake } = useCtzStateContext()
    const { setProgress, setCtzCake } = useCtzActionsContext()
    const { cakes } = useGetRecipes()

    const handleCakeType = (value: string) => {
        setCtzCake(value)  
    }
  
    const handleChooseType = () => {
      setProgress(progress + 1)
    }
    return (
      <Box 
      w={['100%','100%','90%' ,'90%']} 
      h='100%'
      bg='white' 
      px={[3, 5]} 
      py={[2, 4]} 
      borderRadius={8}
      marginInline='auto'
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
      >
          <Box>
            <FormControl>
              <Select placeholder='Elige uno' onChange={(e) => handleCakeType(e.target.value)}>
                {
                  cakes && cakes.map((cake, index) => (
                    <option value={cake?.id} key={index}>{cake.recipeName}</option>
                  ))
                }
              </Select>
            </FormControl>
          </Box>
        <Button 
        w='full' 
        marginInline='auto' 
        mt={6}
        onClick={()=> handleChooseType()}
        bg='pinkPrimary' 
        color='white' 
        isDisabled={!ctzCake}
        >
          Siguente
        </Button>
      </Box>
    )
}

export default Cake