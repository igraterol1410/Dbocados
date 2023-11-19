import {
    Text,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Box,
    Flex,
    TableContainer
  } from "@chakra-ui/react";
import { useStockStateContext } from "@/context/StockContext";
import Ilustracion from '@/assets/empty.svg'
import { FILTER_OPTIONS } from "@/constant/stock";
import useGetIngredients from "@/hooks/useGetIngredients";
import { currencyFormatter } from "@/functions/financeFunctions";
import { FaEllipsisH } from "react-icons/fa";
import { Ingredients } from "@/types/ingredients";
import Image from "next/image";
import useFilterTable from "@/hooks/useFilterTable";
  
  
  const StockTable = () => {
    const { ingredients } = useGetIngredients()
    const { filterParam, itemSearch } = useStockStateContext()
    const { productsData } = useFilterTable(filterParam, itemSearch, ingredients)
    // const router = useRouter()
  
    // doble click para detalles en UW
    const goToDetails = (detail: number, user_id: any) => {
        console.log(detail, user_id)
        // console.log(productsDataData)
    }
  
    return (
      <TableContainer 
      mt={4} 
      // maxH='550px' 
      overflowY='scroll'
      maxH='60vh'
      css={{
        '&::-webkit-scrollbar': {
          width: '4px'
        },
        '&::-webkit-scrollbar-track': {
          width: '6px'
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'gray',
          borderRadius: '24px'
        }
      }}
      >
        <Table 
        bg='white' 
        variant='unstyled' 
        pt={'100px'}
        borderRadius={20} 
        position='relative'
        >
          <Thead>
            <Tr>
              {/* <Th color='black'></Th> */}
              {
                FILTER_OPTIONS.map((eachOption) => (
                  <Th 
                  key={eachOption.value} 
                  color='black'
                  textAlign='center'
                  >
                    {eachOption.label}
                  </Th>
                ))
              }
              <Th color='black' w='20px'></Th>
            </Tr>
          </Thead>
    
            {
              productsData && productsData.length > 0
              ? (
                <Tbody>
                  {
                  productsData.map((ingredient:Ingredients) => (
                    <Tr 
                    key={ingredient.id}
                    cursor='pointer'
                    onClick={({ detail }) => goToDetails(detail, ingredient.id)}
                    borderBottom='0.5px solid rgba(0, 0, 0, 0.20)'
                    borderRadius={20} 
                    >
                      <Td borderRadius={20} >
                        <Text 
                        color={'#8E9196'} 
                        fontSize={14}
                        >
                          {ingredient.name}
                        </Text>
                      </Td>
                      <Td>
                        <Text 
                        color={'#8E9196'}
                        fontSize={14}
                        textAlign='center'
                        >
                          {ingredient.amount}
                        </Text>
                      </Td>
                      <Td>
                        <Text 
                        color={'#8E9196'}
                        fontSize={14}
                        textAlign='center'
                        >
                          {ingredient.unity}
                        </Text>
                      </Td>
                      <Td>
                        <Text 
                        color={'#8E9196'} 
                        fontWeight='bold'
                        fontSize={14}
                        textAlign='right'
                        >
                          {currencyFormatter(ingredient.price)}
                        </Text>
                      </Td>
                      <Td borderRadius={20} >
                        <Text 
                        color={'#8E9196'} 
                        fontWeight='bold'
                        fontSize={16}
                        textAlign='right'
                        >
                          <FaEllipsisH />
                        </Text>
                      </Td>
                    </Tr>
                  ))
                }
                </Tbody>
              ) 
              : (
                <Tbody border='none'>
                  <Tr
                  cursor='pointer'
                  >
                    <Td colSpan={6} textAlign='center'>
                      <Flex direction='column' alignItems='center' justifyContent='center' minH='55vh'>
                        <Box>
                        <Box marginInline='auto' position='relative' w={['100px', '150px']}>
                            <Image
                            src={Ilustracion}
                            alt='Logo dbocados'
                            />
                        </Box>
                          <Text color={'#8E9196'}>
                            Agrega más productos a tu inventario <br/>
                            pulsando el botón “Nuevo producto” <br/>
                            en la parte superior.
                          </Text>
                        </Box>
                      </Flex>
                    </Td>
                  </Tr>
                </Tbody>
              )
            }
        </Table>
      </TableContainer>
    )
  }
  
  export default StockTable