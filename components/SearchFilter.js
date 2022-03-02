import React, { useState, useEffect } from 'react'
import { filterData, getFilterValues } from '../utils/filterData';
import { Flex, Box, Input, Select, Text, Icon, Button, Spinner } from '@chakra-ui/react';
import { MdCancel } from 'react-icons/md'
import { useRouter } from 'next/router';
import Image from 'next/image'
import { faceApi, baseUrl } from '../utils/faceApi';
import { useDebounce } from 'use-debounce';
import NoResult from '../assets/images/noresult.svg'

const SearchFilter = () => {

    const [filter, setFilter] = useState(filterData);
    const [searchTerm, setSearchTerm] = useState('');
    const [locationData,setLocationData] = useState();
    const [showLocation, setShowLocation] = useState(false);
    const [loading, setLoading] = useState(false);
    const [debounceValue] = useDebounce(searchTerm, 2000); 
    const router = useRouter();
    
    const searchProperties = (filterValues) => {
        // console.log(filterValues);
        const path = router.pathname;
        const { query } = router;
        const values = getFilterValues(filterValues);

        values.forEach((item) => { 
            if (item.value && filterValues?.[item.name]) {
                query[item.name] = item.value
            }
        })

        router.push({ pathname: path,query })
    }

    useEffect(() => {
        if (debounceValue !== '') {
            const fetchData = async () => {
                setLoading(true);
                const data = await faceApi(`${baseUrl}/auto-complete?query=${searchTerm}`);
                setLoading(false);
                setLocationData(data?.hits);
            }

            fetchData();
        }
    }, [debounceValue]);

    console.log(locationData);

  return (
      <Flex bg="gray.400" p="4" justifyContent='center' flexWrap='wrap'>
          {filter.map((filter) => (
              <Box key={filter.queryName}>
                  <Select
                      placeholder={filter.placeholder}
                      p="2"
                      width="fit-content"
                      onChange={(e) => searchProperties({[filter.queryName]:e.target.value})}
                  >
                      {filter?.items.map((item) => (
                          <option value={item.value} key={item.value}>
                              { item.name }
                          </option>
                    ))}
                  </Select>
              </Box>
          ))}
          
          <Flex flexDir='column'>
              <Button onClick={() => setShowLocation(!showLocation)} marginTop='2' border="1px" borderColor='gray.200'>Search Location</Button>
              
              {showLocation && (
                  <Flex flexDir='column' pos='relative' paddingTop={2}>
                      <Input
                          placeholder='Type here..'
                          value={searchTerm}
                          w='300px'
                          focusBorderColor='gray.300'
                          onChange={(e)=>setSearchTerm(e.target.value)}
                      />
                      {searchTerm !== '' && (
                          <Icon
                              as={MdCancel}
                              pos="absolute"
                              cursor='pointer'
                              top='5'
                              right='5'
                              zIndex='100'
                              onClick={()=>setSearchTerm('')}
                          />
                      )}
                      {loading && <Spinner margin='auto' marginTop='3'/>}
                      {showLocation && (
                          <Box height={300} overflow='auto'>
                              {locationData?.map((location) => (
                                  <Box
                                      key={location.id}
                                      onClick={() => { 
                                          searchProperties({ locationExternalIDs: location.externalID });
                                          setShowLocation(false);
                                          setSearchTerm(location.name);
                                      }}
                                  >
                                      <Text cursor='pointer' bg="gray.200" p="3" borderBottom='1px' borderBottomColor='gray.100'>
                                          {location.name}
                                      </Text>
                                 </Box>
                              ))}
                              {!loading && !locationData?.length && (
                                  <Flex justifyContent='center' alignItems='center' flexDir='column' marginTop='5px' marginBottom='5px'>
                                      <Image src={NoResult} alt='image' />
                                      <Text fontSize="xl" marginTop='3'>Waiting for search</Text>
                                  </Flex>

                              )}
                          </Box>
                      )}
                  </Flex>
              )}
          </Flex>

      </Flex>
  )
}

export default SearchFilter