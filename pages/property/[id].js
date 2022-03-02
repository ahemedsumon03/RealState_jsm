import React from 'react'
import { Box,Text,Spacer,Flex,Avatar } from '@chakra-ui/react'
import { FaBed, FaBath } from 'react-icons/fa'
import { GoVerified } from 'react-icons/go'
import { BsGridFill } from 'react-icons/bs'
import millify from 'millify';
import { baseUrl, faceApi } from '../../utils/faceApi';
import ImageScrollBar from '../../components/ImageScrollBar'

const PropertyDetails = ({ propertyDetails:{price,rentFrequency,rooms,title,baths, area, agency, isVerified, description, type, purpose, furnishingStatus, amenities, photos} }) => {
   
    return (
        <Box maxWidth={1000} margin='auto' p='4'>
            {photos && <ImageScrollBar data={photos} />}
            <Box w='full' p='6'>
                <Flex paddingTop='2' alignItems='center'>
                    <Box paddingRight={3} color='green.300'>{isVerified && <GoVerified />}</Box>
                    <Text fontWeight='bold' fontSize='lg'>AED{price}{rentFrequency && `/${rentFrequency}`}</Text>
                    <Spacer />
                    <Avatar marginRight={5} size="sm" src={ agency?.logo?.url}/>
                </Flex>
                <Flex justifyContent='space-between' alignItems='center' p={1} width={240} color="blue.400">
                      {rooms}
                    <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft <BsGridFill />
                </Flex>
                <Box marginTop={2}>
                    <Text fontSize='lg'>{title}</Text>
                    <Text lineHeight={2} color="gray.600">{ description }</Text>
                </Box>
                <Flex flexWrap='wrap' justifyContent='space-between' textTransform='uppercase'>
                    <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3px' marginTop={3}>
                        <Text>Type</Text>
                        <Text fontWeight='bold'>{ type }</Text>
                    </Flex>
                    <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3px' marginTop={3}>
                        <Text>Purpose</Text>
                        <Text fontWeight='bold'>{ purpose }</Text>
                    </Flex>
                    {furnishingStatus && (
                        <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3px' marginTop={3} >
                               <Text>Furnishing Status</Text>
                               <Text fontWeight='bold'>{furnishingStatus}</Text>
                        </Flex>
                    )}
                </Flex>
                <Box>
                    {amenities.length && <Text fontSize='2xl' fontWeight='black' marginTop='5'>Facilites:</Text>}
                    <Flex flexWrap='wrap'>
                        {
                            amenities?.map((item) => (
                                item?.amenities?.map((amenitie) => (
                                    <Text
                                        key={amenitie.text}
                                        fontWeight='bold'
                                        p={2}
                                        bg="gray.200"
                                        color="blue.400"
                                        margin={2}
                                        borderRadius={ 5 }
                                    >
                                        {amenitie.text}
                                    </Text>
                                ))
                            ))
                        }
                    </Flex>
                </Box>
            </Box>

        </Box>
    )
}

export default PropertyDetails;

export async function getServerSideProps({ params:{ id }}) {
    const data = await faceApi(`${baseUrl}/properties/detail?externalID=${id}`);

    return {
        props: {
            propertyDetails:data
        }
    }
}