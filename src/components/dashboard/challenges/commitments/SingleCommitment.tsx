import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../utils/reduxHooks";
import supabase from "../../../../utils/supabaseClient";
import Reaction from "../../profile/AllReactions";
import RenderMedal from "../RenderMedal";
import DeleteCommitmentAlert from "./DeleteCommitmentAlert";
import EditCommitment from "./EditCommitment";
import PauseAlert from "./PauseAlert";
import { deleteCommitmentAsync } from "./allCommitmentsSlice";
import {
  fetchSingleCommitmentAsync,
  selectCommitment,
} from "./singleCommitmentSlice";

const SingleCommitment = () => {
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const [commitment, setCommitment] = useState<any>({});
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
    setCommitment(fetchedCommitment);
  }, [fetchedCommitment]);

  const {
    badge_level,
    challenge,
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
    return <Text>{`Frequency: ${allDays}`}</Text>;
  };

  const time = (timeframe: string) => {
    if (timeframe === "12") {
      return <Text>Time of day: Morning (4am-12pm)</Text>;
    } else if (timeframe === "20") {
      return <Text>Time of day: Afternoon (12pm-8pm)</Text>;
    } else if (timeframe === "4") {
      return <Text>Time of day: Night (8pm-4am)</Text>;
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
      navigate("/commitments");
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
    navigate("/commitments");
  };

  return challenge && challenge.name ? (
    <>
      <Box display="flex" alignItems="center">
        <Heading as="h1">{challenge.name}&nbsp;&nbsp;</Heading>
        <RenderMedal level={badge_level} />
      </Box>
      <Heading as="h2" size="md">
        Category:&nbsp;&nbsp;
        <Link to={`/challenges/categories/${challenge.category.name}`}>
          {challenge.category.name}
        </Link>
      </Heading>
      {frequency && frequency.length ? dayFrequency(frequency) : null}
      {timeframe && timeframe.length ? time(timeframe) : null}
      {goals && goals.length ? <Text>Goals: {goals}</Text> : null}
      {reward && reward.name ? <Text>Reward: {reward.name}</Text> : null}
      <br />
      {is_up_to_date ? (
        <Text fontWeight="bold">You are up to date on your challenge!</Text>
      ) : (
        <Text fontWeight="bold">You behind on your challenge</Text>
      )}
      <br />
      <Box>
        <Button colorScheme="orange" isDisabled={!is_active} onClick={onOpen}>
          <EditIcon />
        </Button>
        {is_active ? (
          <PauseAlert onPause={handleTogglePause} />
        ) : (
          <Button ml={3} colorScheme="green" onClick={handleTogglePause}>
            Recommit
          </Button>
        )}
        <DeleteCommitmentAlert onDelete={() => handleDelete(commitment.id)} />
      </Box>
      {/* Should add reactions for just this commitment */}
      <Reaction />
      <EditCommitment
        isOpen={isOpen}
        onClose={onClose}
        selectedCommitment={commitment}
      />
    </>
  ) : null;
};

export default SingleCommitment;
