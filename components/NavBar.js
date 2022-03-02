import React from 'react'
import Link from 'next/link'
import { FcMenu, FcHome, FcAbout } from 'react-icons/fc';
import { BsSearch } from 'react-icons/bs'
import { FiKey } from 'react-icons/fi'
import {Menu,MenuButton,MenuItem,MenuList,Box,Flex,Spacer,IconButton} from '@chakra-ui/react'

const NavBar = () => {
  return (
      <Flex p="2" borderBottom="1px" borderColor='gray.400'>
          <Box fontSize='3xl' color="blue.400" fontWeight='bold'>
              <Link href="/" paddingLeft="2" passHref>Realtor</Link>
          </Box>
          <Spacer />
          <Menu>
              <MenuButton as={IconButton} icon={<FcMenu />}></MenuButton>
              <MenuList>
                  <Link href="/" passHref>
                      <MenuItem icon={ <FcHome/>}>Home</MenuItem>
                  </Link>
                  <Link href="/search" passHref>
                      <MenuItem icon={ <BsSearch/>}>Search</MenuItem>
                  </Link>
                  <Link href="/search?purpose=for-sale" passHref>
                      <MenuItem icon={ <FcAbout/>}>Buy Property</MenuItem>
                  </Link>
                  <Link href="/search?purpose=for-rent" passHref>
                      <MenuItem icon={ <FiKey/>}>Rent Property</MenuItem>
                  </Link>
              </MenuList>
          </Menu>
      </Flex>
      
  )
}

export default NavBar