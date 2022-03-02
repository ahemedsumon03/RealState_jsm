/* eslint-disable react-hooks/rules-of-hooks */
import React,{useState} from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image'
import { BsFilter } from 'react-icons/bs'
import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import SearchFilter from '../components/SearchFilter';
import Property from '../components/Property';
import NoResult from '../assets/images/noresult.svg';
import { baseUrl,faceApi } from '../utils/faceApi';

const search = ({ properties }) => {

    const [searchFilter, setSearchFilter] = useState(false);
    const router = useRouter();
 
  return (
      <Box>
          <Flex
              alignItems='center'
              justifyContent='center'
              p='4'
              cursor='pointer'
              fontWeight='black'
              padding='2'
              fontSize='lg'
              bg="gray.100"
              borderBottom='1px'
              borderColor='gray.200'
              onClick={()=>setSearchFilter((prevFilter)=>!prevFilter)}
          >
              <Text>Search Property By Filters</Text>
              <Icon as={ BsFilter }/>
          </Flex>
          {searchFilter && <SearchFilter />}
          <Text fontSize='lg' padding='4' fontWeight="bold">Property {router.query.purpose}</Text>
          <Flex flexWrap='wrap'>
              {properties.map((property) => <Property property={property} key={ property.id}/>)}
          </Flex>

          {properties.length === 0 && (
              <Flex justifyContent='center' alignItems='center' >
                  <Image src={ NoResult } alt="noResult"/>
                  <Text fontSize='lg' marginTop='3'>No Results</Text>
              </Flex>
          )}

      </Box>
  )
}

export default search;

export async function getServerSideProps({ query }) {
    const purpose = query.purpose || 'for-rent';
    const rentFrequency = query.rentFrequency || 'yearly';
    const minPrice = query.minPrice || '0';
    const maxPrice = query.maxPrice || '100000';
    const roomsMin = query.roomsMin || '0';
    const bathsMin = query.bathsMin || '0';
    const sort = query.sort || 'price-desc';
    const areaMax = query.areaMax || '35000';
    const locationExternalIDs = query.locationExternalIDS || '5002';
    const categoryExternalID = query.categoryExternalID || '4';

    const data = await faceApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);

    return {
        props: {
            properties:data?.hits
        }
    }
}