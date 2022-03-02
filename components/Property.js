import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Flex, Text, Box, Avatar } from '@chakra-ui/react'
import { GoVerified } from 'react-icons/go'
import { FaBed, FaBath } from 'react-icons/fa'
import { BsGridFill } from 'react-icons/bs'
import millify from 'millify'
import DefaultImage from '../assets/images/house.webp'

const Property = ({ property:{coverPhoto,price,baths,rooms,rentFrequency,area,title,agency,isVerified,externalID} }) => {
    // console.log(coverPhoto);
  return (
      <Link href={`/property/${externalID}`} passHref>
          <Flex flexWrap='wrap' justifyContent='flex-start' width='420px' paddingTop='10px' cursor='pointer' marginLeft="20px">
              <Box>
                  <Image src={coverPhoto ? coverPhoto?.url : DefaultImage} alt='house' height={260} width={400}/>
              </Box>

              <Box width="full">
                  <Flex paddingTop='4' alignItems='center' justifyContent='space-between'>
                      <Flex alignItems='center'>
                          <Box paddingRight={3} color="green.400">{isVerified && <GoVerified />}</Box>
                          <Text fontWeight='bold' fontSize='lg'>AED{price}{ rentFrequency && `/${rentFrequency}`}</Text>
                      </Flex>
                      <Box>
                          <Avatar marginRight={5} size="sm" src={ agency?.logo?.url}/>
                      </Box>
                  </Flex>
                  <Flex justifyContent='space-between' alignItems='center' p={1} width={240} color="blue.400">
                      {rooms}
                      <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft <BsGridFill />
                  </Flex>
                  <Text fontSize='lg'>{title.length > 30 ? title.substr(0,30)+'...' : title}</Text>
              </Box>

          </Flex>
      </Link>
  )
}

export default Property