import { Box, Button, Checkbox, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router";

const AddCommitment = () => {
  const { id } = useParams();
  const [days, setDays] = useState<string>("");

  const handleDayClick = (dayChar: string) => {
    if (days.includes(dayChar)) {
      const newString = days.replace(dayChar, "");
      setDays(newString);
    }
    if (!days.includes(dayChar)) {
      const newString = days + dayChar;
      setDays(newString);
    }
  };

  return (
    <>
      <Heading>Add Commitment for Challenge #{id}</Heading>
      <Text>Please select the days you'd like to commit:</Text>
      <Box>
        <Checkbox onChange={() => handleDayClick("M")} /> Mon{" "}
        <Checkbox onChange={() => handleDayClick("T")} /> Tue{" "}
        <Checkbox onChange={() => handleDayClick("W")} /> Wed{" "}
        <Checkbox onChange={() => handleDayClick("H")} /> Thurs{" "}
        <Checkbox onChange={() => handleDayClick("F")} /> Fri{" "}
        <Checkbox onChange={() => handleDayClick("S")} /> Sat{" "}
        <Checkbox onChange={() => handleDayClick("U")} /> Sun
      </Box>
      <Box>
        <Button>Commit to this Challenge</Button>
      </Box>
      <Box>currently selected days as stored in state: {days}</Box>
    </>
  );
};

export default AddCommitment;
