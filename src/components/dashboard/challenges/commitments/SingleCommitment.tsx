import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Link as ChakraLink,
  Text,
  useDisclosure,
  useToast,
  Tbody,
  Table,
  Tr,
  Td,
  Th,
  Spacer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../utils/reduxHooks";
import { useAuth } from "../../../../context/AuthContext";
import supabase from "../../../../utils/supabaseClient";
import RenderMedal from "../RenderMedal";
// import DeleteCommitmentAlert from "./DeleteCommitmentAlert";
import EditCommitment from "./EditCommitment";
import PauseAlert from "./PauseAlert";
import BuddyReactionCard from "./BuddyReactionCard";
import { deleteCommitmentAsync } from "./allCommitmentsSlice";
import {
  fetchSingleCommitmentAsync,
  selectCommitment,
} from "./singleCommitmentSlice";

import Days from "../../components/Days";
import Time from "../../components/Time";

const SingleCommitment = () => {
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentUser } = useAuth();
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const [commitment, setCommitment] = useState<any>({});
  const [earnedReactions, setEarnedReactions] = useState<any>([]);
  const fetchedCommitment = useAppSelector(selectCommitment);

  useEffect(() => {
    const fetchCommitment = async () => {
      try {
        await dispatch(fetchSingleCommitmentAsync(Number(id)));
      } catch (err) {
        console.error(err);
      }
    };
    fetchCommitment();
  }, [dispatch, id, isOpen]);

  useEffect(() => {
    const fetchReactions = async () => {
      try {
        if (commitment.id) {
          const { data: reactions } = await supabase
            .from("reactions")
            .select(`*, commitments!inner (user_id), profile: profiles(avatar_url, username)`)
            .eq("commitment_id", commitment.id);
          setEarnedReactions(reactions);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchReactions();
  }, [commitment.id, currentUser.id, isOpen]);

  useEffect(() => {
    setCommitment(fetchedCommitment);
  }, [fetchedCommitment]);

  const {
    badge_level,
    challenge,
    challenge_id,
    frequency,
    goals,
    is_active,
    is_up_to_date,
    reward,
    timeframe,
  } = commitment || {};

  const dayFrequency = (frequency: string) => {
    const days: string[] = [];
    const frequencyArray = frequency?.split("");
    frequencyArray?.forEach((day) => {
      if (day === "0") {
        days.push("Sunday");
      }
      if (day === "1") {
        days.push("Monday");
      }
      if (day === "2") {
        days.push("Tuesday");
      }
      if (day === "3") {
        days.push("Wednesday");
      }
      if (day === "4") {
        days.push("Thursday");
      }
      if (day === "5") {
        days.push("Friday");
      }
      if (day === "6") {
        days.push("Saturday");
      }
    });
    const allDays = days.join(", ");
    return <Text>{allDays}</Text>;
  };

  const time = (timeframe: string) => {
    if (timeframe === "12") {
      return <Text>Morning (4am-12pm)</Text>;
    } else if (timeframe === "20") {
      return <Text>Afternoon (12pm-8pm)</Text>;
    } else if (timeframe === "4") {
      return <Text>Night (8pm-4am)</Text>;
    }
  };

  const togglePause = async () => {
    try {
      const { data } = await supabase
        .from("commitments")
        .update({ is_active: !commitment.is_active })
        .eq("id", commitment.id)
        .select();
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const handleTogglePause = async () => {
    try {
      await togglePause();
      if (is_active) {
        toast({
          title: "Paused commitment.",
        });
      } else {
        toast({
          title: "Recommitted to challenge.",
        });
      }
      navigate("/profile");
    } catch (err) {
      console.error(err);
      toast({
        title: "An error occurred while pausing your commitment.",
        status: "error",
      });
    }
  };

  const handleDelete = async (id: number) => {
    await dispatch(deleteCommitmentAsync(id));
    isOpen && onClose();
    toast({
      title: "Commitment deleted.",
    });
    navigate("/profile");
  };

  return challenge && challenge.name ? (
    <>

      <Flex justifyContent="flex-end" flexWrap="wrap" mt="-10px" mb="10px">
        <Flex alignItems="center" w="50%" minW="380px">
          <Box textAlign="center" mr={4}>
            <ChakraLink
                as={RouterLink}
                to={`/challenges/${challenge_id}`}
                fontStyle="italic"
                _hover={{ color: "green.200" }}
              >
              <Heading as="h1">{challenge.name.toUpperCase()}</Heading>
            </ChakraLink>
            <Heading as="h2" size="md" textAlign="left">
              Category:&nbsp;&nbsp;
              <ChakraLink
                as={RouterLink}
                to={`/challenges?categoryId=${challenge.category_id}`}
                fontStyle="italic"
                _hover={{ color: "green.200" }}
              >
                {challenge.category.name}
              </ChakraLink>
            </Heading>
          </Box>
          <RenderMedal level={badge_level} />
        </Flex>

        <Spacer/>
        <Flex alignItems="center" justifyContent="flex-end" justifySelf='flex-end' >
          <Box minW="218px" p="10px" >
            <Button
              bgColor="orange.200"
              isDisabled={!is_active}
              onClick={onOpen}
            >
              <EditIcon />
            </Button>
            {is_active
              ? <PauseAlert onPause={handleTogglePause} />
              : <Button
                  ml={3}
                  bgColor="green.200"
                  onClick={handleTogglePause}
                >
                  Recommit
                </Button>
            }
            {/* <DeleteCommitmentAlert onDelete={() => handleDelete(commitment.id)} /> */}
          </Box>
        </Flex>
        <EditCommitment
          isOpen={isOpen}
          onClose={onClose}
          selectedCommitment={commitment}
        />
      </Flex>


      <Flex flexWrap="wrap" >

        <Box w="50%" minW="370px" p="20px" >
          <Table>
            <Tbody>
              <Tr >
                <Th >Details</Th>
                <Th></Th>
              </Tr>
              <Tr id="frequency">
                {frequency ? (
                  <>
                  {/* <Box pl='30px'><Days/></Box> */}
                    <Td fontWeight="bold">Days</Td>
                    <Td>{dayFrequency(frequency)}</Td>
                  </>
                ) : null}
              </Tr>
              <Tr id="timeframe">
                {timeframe ? (
                  <>
                  {/* <Box pl='30px'><Time/></Box> */}
                    <Td fontWeight="bold" minW="140px">Time of Day</Td>
                    <Td>{time(timeframe)}</Td>
                  </>
                ) : null}
              </Tr>
              <Tr id="goals">
                {goals ? (
                  <>
                    <Td fontWeight="bold">Goals</Td>
                    <Td>{goals}</Td>
                  </>
                ) : null}
              </Tr>
              <Tr id="reward">
                {goals ? (
                  <>
                    <Td fontWeight="bold">Reward</Td>
                    <Td>{reward?.name}</Td>
                  </>
                ) : null}
              </Tr>
            </Tbody>
          </Table>
        </Box>
        <Spacer/>


        <Box
          minW="370px"
          p="40px"
          pt='0px'
          // pr='40px'
          w="50%"
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
          flexDirection='column'

        >

          <Box
          pr='160px'
          >
          {is_up_to_date
            ? <Text color='green' fontWeight="bold" mb="10px" >You are up to date on your challenge!</Text>
            : <Text color='tomato' fontWeight="bold" mb="10px" >You behind on your chal
          }
          </Box>

          <Box
          w="60%"
          id="buddy-reactions"
          h="calc(100vh - 348px)"
          alignItems='center'
          justifyContent="center"
            // p="10px"
          border="1px solid lightgray"
          borderRadius="4px"
          overflow="auto"
          >
            <Box
             w='100%'
             h='auto'
             p='20px'
             >
            {earnedReactions && earnedReactions.length
              ? earnedReactions.map((reaction: any) => (
                <BuddyReactionCard key={reaction.id} reaction={reaction} />
              ))
              : null
            }
            </Box>
          </Box>
        </Box>
      </Flex>
    </>
  ) : null;
};

export default SingleCommitment;
