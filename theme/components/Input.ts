import { ComponentStyleConfig } from '@chakra-ui/react'

const Input: ComponentStyleConfig = {
  // style object for base or default style
  baseStyle: {

  },
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
    filled: {
      field: {
        bg: '#fff',
        height: 10,
        borderRadius: 30,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgba(0, 0, 0, 0.20)',
        _hover: {
          bg: '#fff'
        },
        _focusVisible: {
          bg: '#fff'
        },
      }
    }
  },
  // default values for 'size', 'variant' and 'colorScheme'
  defaultProps: {
    variant: 'filled'
  }
}

export default Input