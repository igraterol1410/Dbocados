import { useCtzActionsContext, useCtzStateContext } from '@/context/CotizacionContext'
import useGetRecipes from '@/hooks/useGetRecipes'
import { Box, Button, FormControl, HStack, Input, Select, useRadioGroup } from '@chakra-ui/react'
import React, { useState } from 'react'
import EmptyState from './EmptyState'
import RadioCard from '@/components/layout/buttons/RadioCard'

const Coverage = () => {
    const { progress, ctzCoverage, editId } = useCtzStateContext()
    const { setProgress, setCtzCoverage } = useCtzActionsContext()
    const { coverages } = useGetRecipes()
    const [coverageOptions, setCoverageOptions] = useState(ctzCoverage ? 'Con cobertura' : 'Sin cobertura')
    const options = ['Sin cobertura', 'Con cobertura']

    const handleChangeCoverageOption = (e:string) => {
      setCoverageOptions(e)
      if(e === options[1] && ctzCoverage === ''){
      } else {
        setCtzCoverage('')
      }
    }

    const { getRootProps, getRadioProps } = useRadioGroup({
      name: 'cobertura',
      defaultValue: ctzCoverage ? 'Con cobertura' : 'Sin cobertura',
      onChange: (e)=>handleChangeCoverageOption(e),
    })
  
    const group = getRootProps()

    const handleCakeFilling = (value: string) => {
      if(value !== ''){ 
          setCtzCoverage(value)  
        }
    }
  
    const handleChooseType = () => {
      setProgress(progress + 1)
    }
    return (
        <Box 
        w={['100%','100%','90%' ,'90%']}
        bg='white' 
        px={[3, 5]} 
        py={[2, 4]} 
        borderRadius={8}
        marginInline='auto'
        display='grid'
        gridTemplateRows='1fr auto'
        alignItems='center'
        >
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
              coverages.length === 0 && coverageOptions === options[1]
              ? (
                <EmptyState option='una cobertura' />
              )
              : (
                  <Box>
                    {
                      coverageOptions === options[1] &&
                        <FormControl>
                        <Select value={ctzCoverage} placeholder='Elige uno' onChange={(e) => handleCakeFilling(e.target.value)}>
                            {
                            coverages && coverages.map((coverage, index) => (
                                <option value={coverage.id} key={index}>{coverage.recipeName}</option>
                            ))
                            }
                        </Select>
                        </FormControl>
                    }
                  </Box>
              )
          }
          <Button 
          w='full' 
          marginInline='auto' 
          mt={6}
          onClick={()=> handleChooseType()}
          bg='pinkPrimary' 
          color='white' 
          isDisabled={coverageOptions===options[1] && !ctzCoverage}
          >
            Siguente
          </Button>
        </Box>
    )
}

export default Coverage
