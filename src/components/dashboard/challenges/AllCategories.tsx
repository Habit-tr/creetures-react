import { useState, useEffect } from 'react';
import supabase from '../../../utils/supabaseClient';
import { Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const AllCategories = () => {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase.from('categories').select();
      setCategories(data || []);
    }
    fetchCategories();
  }, []);

  return (
    <>
      <Heading as='h1'>Categories</Heading>
      {categories && categories.length
      ? categories.map(category => (
        <Link to={`/challenges/categories/${category.name}`} key={category.id}>
          <Heading as='h2' size='md'>{category.name}</Heading>
        </Link>
      ))
      : null}
    </>
  );
};

export default AllCategories;
