import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import supabase from '../../../utils/supabaseClient';
import { Button, Heading, Text } from '@chakra-ui/react';

const SingleChallenge = () => {
  const { id } = useParams();
  const [challenge, setChallenge] = useState<any>({});
  const [category, setCategory] = useState<string>('');
  
  useEffect(() => {
    async function fetchSingleChallenge(id: string) {
      const { data: fetchedChallenge } = await supabase.from('challenges').select().match({ id }).single();
      setChallenge(fetchedChallenge);
      const res = await supabase.from('categories').select('name').eq('id', fetchedChallenge?.category_id).single();
      setCategory(res.data?.name ?? '');
    }
    fetchSingleChallenge(id!);
  }, [id]);

  return (
    challenge && category
    ? <>
        <Heading>{challenge.name}</Heading>
        <Text>
          Category:&nbsp;&nbsp;
          <Link to={`/challenges/categories/${category}`}>{category}</Link>  
        </Text>
        <Button>Commit to this Challenge</Button>
        {/* "Commit" button links to commit form modal */}
      </>
    : null
  );
};

export default SingleChallenge;
