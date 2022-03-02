import { Box, Flex, Text, Button } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { baseUrl, faceApi } from '../utils/faceApi'
import Property from '../components/Property'

const Banner = ({ purpose,title1,title2,des1,des2,buttonText,linkName,imageUrl }) => (
  <Flex
    flexWrap='wrap'
    justifyContent='center'
    alignItems="center"
    m='10'
  >
    <Image src={imageUrl} alt="bannerImg" width={500} height={500} />
    <Box p='5'>
      <Text color='gray.500' fontSize='sm' fontWeight='medium'>{purpose}</Text>
      <Text fontSize='2xl' fontWeight='bold'>{title1}<br />{title2}</Text>
      <Text fontSize='lg' paddingTop="3" paddingBottom="3" color='gray.300'>{des1}<br />{des2}</Text>
      <Button fontSize='xl' bg="blue.300" color="black">
        <Link href={linkName}><a>{ buttonText }</a></Link>
      </Button>
    </Box>
  </Flex>
)

export default function Home({ propertyForSale, propertyForRent }) {
  
  return (
    <Box>

      <Banner
        purpose="RENT A HOME"
        title1="Rental Home for"
        title2="EveryOne"
        des1="Explore for Apartments,builder floors,villas"
        des2="and more"
        buttonText="Explore Renting"
        linkName="/search?purpose=for-rent"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />

      <Flex flexWrap='wrap'>
        {propertyForRent.map((property) => <Property property={property} key={ property.id }/>)}
      </Flex>

      <Banner
        purpose="BUY A HOME"
        title1=" Find,Buy and Own Your"
        title2="Dream Home"
        des1=" Explore from Apartments, land, builder floors"
        des2=" villas and more"
        buttonText="Explore Buying"
        linkName="/search?purpose=for-sale"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
      />

      <Flex flexWrap='wrap'>
        {propertyForSale.map((property)=><Property property={property} key={property.id }/>)}
      </Flex>

    </Box>
  )
}

export async function getStaticProps(){
  const propertyForSale = await faceApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);
  
  const propertyForRent = await faceApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`);

  return {
    props: {
      propertyForSale: propertyForSale?.hits,
      propertyForRent:propertyForRent?.hits
     }
  }
}
