import {
  Box,
  chakra,
  Container,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  Flex,
  Button,
  Slide,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { motion } from "framer-motion";
import { useDisclosure } from '@chakra-ui/react';
import { ArrowDownIcon } from '@chakra-ui/icons';

import React from 'react';
import Lottie from 'react-lottie';
import animationData from './bound-loading.json';

const lottieOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};



const Logo = () => {
  return (
    <>
                <Box
              as={motion.div}
              justifySelf="center"
              justifyContent="center"
              height="40px"
              width="300px"
              paddingLeft="10"
              paddingRight="3"
              drag="y"
              dragConstraints={{ left: -100, right: 200 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition="0.5s ease-in-out"
              textAlign='center'
              fontFamily={"Play Toon"}
              fontSize="40px"
              color={useColorModeValue("gray.800", "green.200")}
            >
              Creetures
              <div>
             <Lottie options={lottieOptions} />
             </div>
            </Box>
    </>
  )
}




const Footer = () => {

  function SlideEx() {
    const { isOpen, onToggle } = useDisclosure()
    return (
      <>
        <Button paddingLeft={'30px'} onClick={onToggle} rightIcon={<ArrowDownIcon />} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>Footer!</Button>
        <Slide direction='bottom' in={isOpen} style={{ zIndex: 10 }}>
          <Box
            p='50px'
            color='#000000'
            mt='4'
            bg='green.200'
            rounded='md'
            shadow='md'
          >
            <Stack direction={'column'} spacing={3}>
            <Text fontSize='xl' as='b' >Creators:
                <Text paddingLeft={'10px'} fontSize='lg' as='b'>Jack Conway</Text>
                <Text paddingLeft={'10px'} fontSize='lg' as='b'>Andrew Jupina</Text>
                <Text paddingLeft={'10px'} fontSize='lg' as='b'>Benjamin Lyddane</Text>
                <Text paddingLeft={'10px'} fontSize='lg' as='b'>Simin Paksirat</Text>
            </Text>
        <Text fontSize='lg' as='b'>FullStack Academy</Text>

      </Stack>
          </Box>
        </Slide>
      </>
    )
  }

  return (
    <Box
    bg={useColorModeValue('gray.50', 'gray.900')}
    color={useColorModeValue('gray.700', 'gray.200')}
    position= 'fixed'
    bottom= {0}
    width= '100%'
    padding='20px'
    >
    <Container
      as={Stack}
      maxW={'6xl'}
      py={4}
      spacing={4}
      justify={'center'}
      align={'center'}
      >
      <Logo />
      {SlideEx()}
    </Container>
    </Box>
  );
};





export default Footer;
