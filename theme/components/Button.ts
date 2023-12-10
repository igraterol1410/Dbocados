import { ComponentStyleConfig, StyleFunctionProps } from '@chakra-ui/react'

const Button: ComponentStyleConfig = {
  // style object for base or default style
  baseStyle: {
    borderRadius: 20,
    fontWeight: 700
  },
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
    solid: (props: StyleFunctionProps) => ({
      bg: props.colorScheme === 'pinkPrimary' ? 'pinkPrimary' : props.bg,
      color: props.colorScheme === 'pinkPrimary' ? 'white' : props.bg,
      _hover: {
        bg: 'pink.500',
        color: 'white'
      }
    }),
    outline: (props: StyleFunctionProps) => ({
      color: props.colorScheme === 'pinkPrimary' ? 'pinkPrimary' : props.bg,
      bg: props.colorScheme === 'pinkPrimary' ? 'transparent' : props.bg,
    }),
    outlineWhite: (props: StyleFunctionProps) => ({
      transition: 'all ease-in-out .2s',
      color: 'white',
      border: '2px solid white'
    }),
    purpleButton: () => ({
      transition: 'all ease-in-out .2s',
      color: 'white',
      bg: '#562D83',
      _hover: {
        bg: '#edfb2ad7',
        border: '3px solid #562D83',
        color: '#562D83'
      }
    }),
    pinkButton: () => ({
      transition: 'all ease-in-out .2s',
      color: 'white',
      bg: 'pinkPrimary',
      _hover: {
        bg: 'pink.500',
        border: '3px solid #BA346E',
        color: 'white'
      }
    }),
    purpleOutline: () => ({
      transition: 'all ease-in-out .2s',
      color: '#562D83',
      border: '2px solid #562D83'
    }),
    yellowButton: () => ({
      transition: 'all ease-in-out .2s',
      color: 'black',
      bg: '#edfb2ad7',
      _hover: {
        bg: '#562D83',
        border: '3px solid #edfb2ad7',
        color: 'white'
      }      
    }),
    greenButton: () => ({
      transition: 'all ease-in-out .2s',
      color: 'white',
      bg: 'green.500',
      _hover: {
        bg: 'green.400',
        color: 'white'
      }      
    }),
  },
  // default values for 'size', 'variant' and 'colorScheme'
  defaultProps: {
    size: 'md',
    variant: 'solid',
    colorScheme: 'pinkPrimary'
  },
}

export default Button