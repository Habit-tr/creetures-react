import { Button, Heading, Table, Thead, Tbody, Tr, Th, Td, useToast, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../utils/reduxHooks";
import { fetchAllRewardsAsync, deleteRewardAsync, selectRewards } from "./allRewardsSlice";
import AddReward from "./AddReward";
import DeleteAlert from "./DeleteAlert";
import { Database } from "../../../utils/supabaseTypes";
import { EditIcon } from "@chakra-ui/icons";

const Rewards = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [selectedReward, setSelectedReward] = useState<Database['public']['Tables']['rewards']['Row'] | null>(null);

  const rewards = useAppSelector(selectRewards);

  useEffect(() => {
    dispatch(fetchAllRewardsAsync());
  }, [dispatch]);

  const handleDelete = async (id: number) => {
    await dispatch(deleteRewardAsync({ id }));
    dispatch(fetchAllRewardsAsync())
    isOpen && onClose();
    toast({
      title: "Reward deleted.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <>
      <Heading>My Rewards</Heading>
      <Button margin="10px" bgColor="purple.200" onClick={onOpen}>
        + Create Reward
      </Button>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Reward Name</Th>
            <Th>Details</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {rewards && rewards.length ? (
            rewards.map((reward) => (
              <Tr key={reward.id}>
                <Td>{reward.name}</Td>
                <Td>{reward.description}</Td>
                <Td>
                  <Button colorScheme="blue" onClick={() => { setSelectedReward(reward); onOpen(); }}><EditIcon /></Button>
                  <DeleteAlert onDelete={() => handleDelete(reward.id)}/>
                </Td>
              </Tr>
            ))
          ) : null}
        </Tbody>
      </Table>
      <AddReward key={selectedReward ? selectedReward.id : 'addedReward'} reward={selectedReward} isOpen={isOpen} onClose={() => { setSelectedReward(null); onClose(); }} />
    </>
  );
};

export default Rewards;

// import { Button, Heading, Table, Thead, Tbody, Tr, Th, Td, useToast, useDisclosure } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../../../utils/reduxHooks";
// import { fetchAllRewardsAsync, deleteRewardAsync, selectRewards } from "./allRewardsSlice";
// import AddReward from "./AddReward";
// import DeleteAlert from "./DeleteAlert";

// const Rewards = () => {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const dispatch = useAppDispatch();
//   const toast = useToast();

//   const rewards = useAppSelector(selectRewards);

//   useEffect(() => {
//     dispatch(fetchAllRewardsAsync());
//   }, [dispatch]);

//   const handleDelete = async (id: number) => {
//     await dispatch(deleteRewardAsync({ id }));
//     dispatch(fetchAllRewardsAsync())
//     isOpen && onClose();
//     toast({
//       title: "Reward deleted.",
//       status: "error",
//       duration: 5000,
//       isClosable: true,
//     });
//   };


//   return (
//     <>
//       <Heading>My Rewards</Heading>
//       <Button margin="10px" bgColor="purple.200" onClick={onOpen}>
//         + Create Reward
//       </Button>
//       <Table variant="striped">
//         <Thead>
//           <Tr>
//             <Th>Reward Name</Th>
//             <Th>Details</Th>
//             <Th>Actions</Th>
//           </Tr>
//         </Thead>
//         <Tbody>
//           {rewards && rewards.length ? (
//             rewards.map((reward) => (
//               <Tr key={reward.id}>
//                 <Td>{reward.name}</Td>
//                 <Td>{reward.description}</Td>
//                 <Td>
//                   <DeleteAlert onDelete={() => handleDelete(reward.id)}/>
//                 </Td>
//               </Tr>
//             ))
//           ) : null}
//         </Tbody>
//       </Table>
//       <AddReward key="addedReward" isOpen={isOpen} onClose={onClose} />
//     </>
//   );
// };

// export default Rewards;
