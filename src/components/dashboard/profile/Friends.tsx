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
import { useAppDispatch, useAppSelector} from "../../../utils/reduxHooks";
import { fetchAllProfilesAsync, selectAllProfiles } from "./AllProfilesSlice";
import { fetchSingleProfileAsync, selectSingleProfile } from "./SingleProfileSlice";


const FriendsPage = ()=> {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSingleProfileAsync(id));
  }, [dispatch, id]);

  const selectedProfile = useAppSelector(selectSingleProfile);



  return(
    <>
    {selectedProfile.id}


    </>
  )
}

export default FriendsPage;
