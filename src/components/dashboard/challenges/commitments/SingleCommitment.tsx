import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../utils/reduxHooks";
import Reaction from "../../profile/AllReactions";
import RenderMedal from "../RenderMedal";
import EditCommitment from "./EditCommitment";
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

  useEffect(() => {
    dispatch(fetchSingleCommitmentAsync(id));
  }, [dispatch, id]);

  const selectedCommitment = useAppSelector(selectCommitment);
  console.log('Before',selectedCommitment)
  const {
    badge_level,
    challenge,
    frequency,
    goals,
    is_up_to_date,
    reward,
    timeframe,
  } = selectedCommitment;
  console.log('After',selectedCommitment)

  const dayFrequency = (frequency: string) => {
    const days: string[] = [];
    const frequencyArray = frequency?.split("");
    frequencyArray?.forEach((day) => {
      if (day === "M") {
        days.push("Monday");
      }
      if (day === "T") {
        days.push("Tuesday");
      }
      if (day === "W") {
        days.push("Wednesday");
      }
      if (day === "H") {
        days.push("Thursday");
      }
      if (day === "F") {
        days.push("Friday");
      }
      if (day === "S") {
        days.push("Saturday");
      }
      if (day === "U") {
        days.push("Sunday");
      }
    });
    const allDays = days.join(", ");
    return <Text>{`Frequency: ${allDays}`}</Text>;
  };

  const handleDelete = async (id: number) => {
    await dispatch(deleteCommitmentAsync(id));
    isOpen && onClose();
    toast({
      title: "Commitment deleted.",
    });
    navigate("/commitments");
  };

  return (
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
      <Text>Time of day: {timeframe}</Text>
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
        <Button margin="10px" bgColor="orange.200" onClick={onOpen}>
          <EditIcon />
        </Button>
        <Button
          margin="10px"
          bgColor="red.200"
          onClick={() => handleDelete(selectedCommitment.id)}
        >
          <DeleteIcon />
        </Button>
      </Box>
      <Reaction />
      <EditCommitment
        isOpen={isOpen}
        onClose={onClose}
        selectedCommitment={selectedCommitment}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default SingleCommitment;
