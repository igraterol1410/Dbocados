/* eslint-disable react/no-children-prop */
// import CreateUser from '@/components/modals/CreateUser';
import StockProductForm from '@/components/modals/StockProductForm';
import { FILTER_OPTIONS } from '@/constant/stock';
import { useStockActionsContext, useStockStateContext } from '@/context/StockContext';
import { Box, Button, Flex, Input, InputGroup, InputLeftAddon, InputRightAddon, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { useState } from 'react';
import { FaPlus, FaRegTimesCircle, FaSearch, FaSlidersH } from 'react-icons/fa';

const FilterProducts = () => {
    const { filterParam, itemSearch} = useStockStateContext()
    const { setItemSearch, setFilterParam} = useStockActionsContext()
    const [createUser, setCreateUser] = useState<boolean>(false)

  return (
    <Flex justifyContent='space-between' gap={2} direction={['column', 'row']}>
        <StockProductForm />
        <Flex gap={2} direction={['column', 'row']}>
            <InputGroup 
            borderRadius={20} 
            bg='rgba(255, 255, 255, 0.20)'
            >
                <InputLeftAddon 
                borderRadius={20} 
                bg='transparent' 
                children={<FaSearch />} 
                />
                <Input             
                type='text'
                variant='unstyled'
                placeholder={`Buscar por ${filterParam.label}`}
                value={itemSearch}
                bg='transparent'
                onChange={(e) => setItemSearch(e.target.value)}
                />
                <InputRightAddon
                borderRadius={20} 
                bg='transparent' 
                onClick={() => setItemSearch('')}
                children={itemSearch ? <FaRegTimesCircle /> : <></>} 
                />
            </InputGroup>
            <Menu>
                <MenuButton 
                as={Button}
                variant='outline' 
                leftIcon={<FaSlidersH />}
                _hover={{
                    bg:'rgba(255, 255, 255, 0.20)'
                }}
                pr={8}
                >
                    Filtros
                </MenuButton>
                <MenuList bg='#36185A'>
                    {
                        FILTER_OPTIONS.map((option) => (
                            <MenuItem 
                            key={option.value}
                            bg={filterParam.label == option.label ? 'rgba(255, 255, 255, 0.20)' : 'transparent' }
                            _hover={{bg:'rgba(255, 255, 255, 0.20)'}}
                            onClick={() => setFilterParam(option)}
                            >
                                {option.label}
                            </MenuItem>
                        ))
                    }
                </MenuList>
            </Menu>
        </Flex>
        <Box>
            <Button 
            rightIcon={<FaPlus />}
            onClick={() => setCreateUser(true)}
            >
                Nuevo producto
            </Button>
        </Box>
        {/* <CreateUser /> */}
    </Flex>
  )
}

export default FilterProducts