import { useState, useEffect } from 'react';
import supabase from '../../../utils/supabaseClient';
import { Button, Heading, Text, useDisclosure } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import AddChallenge from "./AddChallenge";

const AllChallenges = () => {
  const [challenges, setChallenges] = useState<any[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    async function fetchChallenges() {
      const { data } = await supabase.from('challenges').select();
      setChallenges(data || []);
    }
    fetchChallenges();
  }, []);

  return (
    <>
      <Heading>All Challenges</Heading>
      {challenges && challenges.length
      ? challenges.map(challenge => (
        <Link to={`/challenges/${challenge.id}`} key={challenge.id}>
          <Text>{challenge.name}</Text>
        </Link>
      ))
      : null}
      <Button bgColor="purple.200" onClick={onOpen}>
        Create Challenge
      </Button>
      <AddChallenge isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AllChallenges;
