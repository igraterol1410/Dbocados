import RadioCard from '@/components/layout/buttons/RadioCard'
import { useCtzActionsContext, useCtzStateContext } from '@/context/CotizacionContext'
import useGetRecipes from '@/hooks/useGetRecipes'
import { Box, Button, FormControl, HStack, Select, useRadioGroup } from '@chakra-ui/react'
import React, {useState} from 'react'

const Filling = () => {
    const { progress, ctzFilling } = useCtzStateContext()
    const { setProgress, setCtzFilling } = useCtzActionsContext()
    const { fillings } = useGetRecipes()
    const [fillingsOptions, setFillingsOptions] = useState<string>('Con relleno')
    const [disabledButton, setDisabledButton] = useState<boolean>(true)
    const options = ['Sin relleno', 'Con relleno']
    
    const handleChangeFillingOption = (e:string) => {
      setFillingsOptions(e)
      if(e === options[1] && ctzFilling === ''){
        setDisabledButton(true)
      } else {
        setCtzFilling('')
        setDisabledButton(false)
      }
    }

    const { getRootProps, getRadioProps } = useRadioGroup({
      name: 'relleno',
      defaultValue: 'Con relleno',
      onChange: (e)=>handleChangeFillingOption(e),
    })

  
    const group = getRootProps()

    const handleCakeFilling = (value: string) => {
      if(value !== ''){
        setCtzFilling(value)  
        setDisabledButton(false)
      }
    }
  
    const handleChooseType = () => {
      setProgress(progress + 1)
    }
    return (
      <Box 
      w={['100%','100%','80%' ,'80%']} 
      h='100%'
      bg='white' 
      px={[3, 5]} 
      py={[2, 4]} 
      borderRadius={8}
      marginInline='auto'
      display='grid'
      gridTemplateRows='1fr auto'
      alignItems='center'
      >
          <Box>
          <HStack justifyContent='center' {...group} mb={8}>
             {options.map((value) => {
               const radio = getRadioProps({ value })
               return (
                 <RadioCard key={value} {...radio}>
                   {value}
                 </RadioCard>
               )
             })}
           </HStack>
           {
             fillingsOptions === options[1] &&
               <FormControl>
                 <Select placeholder='Elige uno' onChange={(e) => handleCakeFilling(e.target.value)}>
                   {
                     fillings && fillings.map((filling, index) => (
                       <option value={filling.id} key={index}>{filling.recipeName}</option>
                     ))
                   }
                 </Select>
               </FormControl>
           }
          </Box>
        <Button 
        w='full' 
        marginInline='auto' 
        mt={6}
        onClick={()=> handleChooseType()}
        bg='#e80297' 
        color='white' 
        isDisabled={disabledButton}
        >
          Siguente
        </Button>
      </Box>
    )
}

export default Filling
