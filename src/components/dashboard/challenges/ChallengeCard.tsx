import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Button, Card, CardBody, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Challenge, Database } from "../../../utils/supabaseTypes";

interface ChallengeCardProps {
  challenge: Challenge;
  user: any;
  category?: Database["public"]["Tables"]["categories"]["Row"];
}

const ChallengeCard = ({ user, challenge, category }: ChallengeCardProps) => {
  return (
    <Link to={`/challenges/${challenge.id}`}>
      <Card
        margin="10px"
        w="430px"
        border="2px black solid"
        color="black"
        bgGradient="linear(to-b, gray.100, gray.300)"
      >
        <CardBody>
          <Heading mb="0px" size="md">
            {challenge.name?.toUpperCase()}
          </Heading>
          <Text fontSize="sm">Description: {challenge.description}</Text>
          <Text fontSize="sm">Category: {category?.name?.toUpperCase()}</Text>
          <Text fontSize="sm">Committed Users: ( ) ( ) ( )</Text>
          {/* <Text fontSize="sm">Success Rate: tbd</Text> */}
          {/* don't show commitment button if already committed? make it say view Commitment? */}
          <Button
            isDisabled={true}
            bgColor="white"
            border="1px black solid"
            m="10px"
            >
            Commit
          </Button>
          {user.id === challenge.created_by && (
            <>
              <EditIcon margin="10px" />
              <DeleteIcon margin="10px" />
            </>
          )}
        </CardBody>
      </Card>
    </Link>
  );
};
export default ChallengeCard;



// import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
// import { Box, Button, Card, CardBody, Heading, Text, useDisclosure, useToast } from "@chakra-ui/react";
// // import { Link } from "react-router-dom";
// import { Challenge, Database } from "../../../utils/supabaseTypes";
// import { fetchSharedUsersAsync, selectSharedUsers } from '../profile/sharedUsersSlice';
// import { deleteChallengeAsync } from './allChallengesSlice';
// import { useAppDispatch, useAppSelector } from '../../../utils/reduxHooks';
// import { useEffect } from 'react';
// import AddCommitment from './commitments/AddCommitment';
// import EditChallenge from './EditChallenge';

// interface ChallengeCardProps {
//   challenge: Challenge;
//   user: any;
//   category?: Database["public"]["Tables"]["categories"]["Row"];
// }

// const ChallengeCard = ({ user, challenge, category }: ChallengeCardProps) => {
//   const dispatch = useAppDispatch();
//   const { isOpen: isCommitOpen , onOpen: onCommitOpen, onClose: onCommitClose } = useDisclosure()
//   const { isOpen: isEditOpen , onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
//   const toast = useToast();
//   const sharedUsers = useAppSelector(selectSharedUsers);

//   useEffect(() => {
//     const fetchSharedUsers = async () => {
//       try {
//         await dispatch(fetchSharedUsersAsync(challenge.id));
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchSharedUsers();
//   }, [dispatch, challenge.id]);

//   const handleDelete = async (id: number | string) => {
//     await dispatch(deleteChallengeAsync({ id }));
//     isEditOpen && onEditClose();
//     toast({
//       title: "Challenge deleted.",
//     });
//   };

//   return (
//     // <Link to={`/challenges/${challenge.id}`}>
//       <Card
//         margin="10px"
//         // w="430px"
//         // h="175px"
//         border="2px black solid"
//         color="black"
//         bgGradient="linear(to-b, gray.100, gray.300)"
//       >
//         <CardBody>
//           <Heading mb="0px" size="md">
//             {challenge.name?.toUpperCase()}
//           </Heading>
//           <Text fontSize="sm">Description: {challenge.description}</Text>
//           <Text fontSize="sm">Category: {category?.name?.toUpperCase()}</Text>
//           <Text fontSize="sm">Committed Users: ( ) ( ) ( )</Text>
//           {/* <Text fontSize="sm">Success Rate: tbd</Text> */}
//           {/* don't show commitment button if already committed? make it say view Commitment? */}
//           <Box mt="10px">
//             <Button
//               bgColor="white"
//               border="1px black solid"
//               onClick={onCommitOpen}
//             >
//               Commit
//             </Button>
//             {user.id === challenge.created_by && (
//               <>
//                 <EditIcon margin="10px" />
//                 <DeleteIcon margin="10px" />
//               </>
//             )}
//           </Box>
//           <AddCommitment
//             isOpen={isCommitOpen}
//             onClose={onCommitClose}
//             challenge={challenge}
//           />
//           <EditChallenge
//             isOpen={isEditOpen}
//             onClose={onEditClose}
//             challenge={challenge}
//             handleDelete={handleDelete}
//             // setChallenge={setChallenge}
//           />
//         </CardBody>
//       </Card>
//     // </Link>
//   );
// };
// export default ChallengeCard;
