import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

import supabase from "../../../utils/supabaseClient";
import { Link } from 'react-router-dom';

import Reaction from './AllReactions';
import { Database } from '../../../utils/supabaseTypes';

interface FriendsCardProps {
  profiles:Database["public"]["Tables"]["profiles"]["Row"]
}

const FriendsCard = ({ profiles }: FriendsCardProps) => {
  const { username, user_id, full_name } = profiles;
  return (
    // <Link to={`/friends/${user_id}`}>

    <Center py={12}>
      {username}
      <Box
        maxW={'270px'}
        w={'400px'}
        h={'450px'}
        bg={useColorModeValue('white', '#003600')}
        boxShadow={'xl'}
        rounded={'md'}
        overflow={'hidden'}>

        <Flex justify={'center'} mt={3}>
          <Avatar
            size={'xl'}
            src={
              'https://gravatar.com/avatar/3ccfb7b02178816eaa9af1bd5d98c13c?s=400&d=robohash&r=x'
            }
            css={{
              border: '1px solid white',
            }}
          />
        </Flex>

        <Box p={15}>
          <Stack spacing={0} align={'center'} mb={3}>
            <Heading fontSize={'xl'} fontWeight={500} fontFamily={'body'}>
              {user_id}

              {full_name}
            </Heading>
            <Text color={'gray.500'}></Text>

          </Stack>

          <Stack>


          </Stack>

          {/* <Stack direction={'row'} justify={'center'} spacing={6}>
            <Stack spacing={0} align={'center'}>

              <Text fontWeight={600}>23k</Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                HighFives
              </Text>
            </Stack>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>23k</Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                Nudges
              </Text>
            </Stack>
            <Stack>

            </Stack>
          </Stack> */}


        </Box>
      </Box>
    </Center>
    // </Link>
  );
}

export default FriendsCard
