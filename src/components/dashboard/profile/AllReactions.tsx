import React from "react";
import { useAppDispatch, useAppSelector } from "../../../utils/reduxHooks";
import { useEffect, useState } from "react";
import { selectReactions, fetchAllReactionsAsync } from "./AllReactionsSlice";
import {
    Button,
    Box,
    Heading,
    Text,
    Center,
    Stack
  } from "@chakra-ui/react";

  import highfive from '/Users/spak/Desktop/creetures-react/src/components/dashboard/components/high-five.gif'
  import point from '/Users/spak/Desktop/creetures-react/src/components/dashboard/components/point.gif'





const Reaction: React.FC = () => {

    const dispatch = useAppDispatch();


    const [totalHighfives, setTotalHighfives] = useState(0);
    const [totalNudges, setTotalNudges] = useState(0);

    // const fetchedReactions: any = useAppSelector(selectReactions);
    const allReactions = useAppSelector((state) => state.allReactions.value);

    useEffect(() => {
        dispatch(fetchAllReactionsAsync());
      }, [dispatch]);

      useEffect(() => {
        // Update the total highfives and total nudges when the allReactions state changes
        setTotalHighfives(allReactions.total_highfives || 0);
        setTotalNudges(allReactions.total_nudges || 0);
      }, [allReactions]);

    return (
        <>
        <Heading></Heading>

        <Center>
           <Box p={6}>
           <Stack spacing={0} align={'center'} mb={5}>
            <Text color={'black'}>High Five!</Text>
           </Stack>
               <Button bg="transparent" onClick={()=> setTotalHighfives(totalHighfives + 1)}>
               <img style={{ height: '60px' }} className="highfive" src={highfive} alt="highfive" />
               {totalHighfives}
                </Button>
           </Box>

           <Box p={6}>
           <Stack spacing={0} align={'center'} mb={5}>
            <Text color={'black'}>Poke!</Text>
           </Stack>
               <Button bg="transparent" onClick={()=> setTotalNudges(totalNudges + 1)}>
               <img style={{ height: '50px' }} className="point" src={point} alt="point"/>
               {totalNudges}
                </Button>
           </Box>
        </Center>
        </>
    )
}

export default Reaction;
