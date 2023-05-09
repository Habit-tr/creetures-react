import { Heading } from "@chakra-ui/react";
import { useParams } from "react-router";

const SingleChallenge = () => {
  const { id } = useParams();
  return <Heading>Single Challenge for #{id}</Heading>;
};

export default SingleChallenge;
