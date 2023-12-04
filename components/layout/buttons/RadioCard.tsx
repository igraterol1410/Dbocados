import { Box, useRadio } from '@chakra-ui/react'
import React from 'react'

const RadioCard = (props:any) => {
    const { getInputProps, getRadioProps } = useRadio(props)

    const input = getInputProps()
    const checkbox = getRadioProps()
  
    return (
      <Box as='label'>
        <input {...input} />
        <Box
          {...checkbox}
          cursor='pointer'
          borderWidth='1px'
          borderRadius='md'
          boxShadow='md'
          borderColor='pinkPrimary'
          _checked={{
            bg: 'pinkPrimary',
            color: 'white',
            borderColor: 'pinkPrimary',
          }}
          _focus={{
            boxShadow: 'outline',
          }}
          px={5}
          py={3}
        >
          {props.children}
        </Box>
      </Box>
    )
}

export default RadioCard
