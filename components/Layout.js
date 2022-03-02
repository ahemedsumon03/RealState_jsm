import Head from 'next/head'
import { Box } from '@chakra-ui/react'
import NavBar from './NavBar';
import Footer from './Footer';

export const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <title>Real State </title>
            </Head>
            <Box minWidth='1280px' m='auto'>
                <header>
                    <NavBar/>
                </header>
                <main>
                    { children }
                </main>

                <footer>
                    <Footer/>
                </footer>
            </Box>
        </>
    )
}