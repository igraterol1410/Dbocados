import { useCtzActionsContext, useCtzStateContext } from '@/context/CotizacionContext'
import { Box, Button, FormControl, Input, Select } from '@chakra-ui/react'
import React, { useState } from 'react'

const People = () => {
    const { progress, ctzPeople } = useCtzStateContext()
    const { setProgress, setCtzPeople } = useCtzActionsContext()
    const recetaTypes = ['8', '12', '16', '20', '25', '30', 'Otro']
    const [showOthers, setShowOthers] = useState<boolean>(false)

    const handlePeopleNumber = (value: string) => {
      if(value === 'Otro'){
        setShowOthers(true)
      } else {
        setCtzPeople(value)      
        setShowOthers(false)
      }
    }
    
    const handlePeopleOtherNumber = (value: string) => {
        setCtzPeople(value)      
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
              <Select placeholder='Elige uno' onChange={(e) => handlePeopleNumber(e.target.value)}>
                {
                  recetaTypes.map((type, index) => (
                    <option value={type} key={index}>{type}</option>
                  ))
                }
              </Select>
            </FormControl>
          </Box>
            {
              showOthers &&
              <FormControl>
                <Input 
                placeholder='Número de personas' 
                type='number'
                onChange={(e) => handlePeopleOtherNumber(e.target.value)} 
                />
              </FormControl>
            }
        <Button 
        w='full' 
        marginInline='auto' 
        mt={6}
        onClick={()=> handleChooseType()}
        bg='pinkPrimary' 
        color='white' 
        isDisabled={!ctzPeople}
        >
          Siguente
        </Button>
      </Box>
    )
}

export default People
