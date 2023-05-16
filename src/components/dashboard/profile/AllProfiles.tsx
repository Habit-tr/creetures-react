import { useAuth } from "../../../context/AuthContext";
import { Link, useParams } from "react-router-dom";
import { Flex, Heading, Text, Box, Spacer, HStack, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../utils/reduxHooks';
import { fetchAllProfilesAsync, fetchSingleProfileAsync, selectProfiles } from "./Single-All-ProfilesSlice";
import { fetchAllCommitmentsAsync, selectCommitments } from "../challenges/commitments/allCommitmentsSlice";
import ProfileCard from "./ProfileCard";
import { Database } from "../../../utils/supabaseTypes";

const AllProfiles = () => {
  const dispatch = useAppDispatch();
  const profiles = useAppSelector(selectProfiles);
  const commitments = useAppSelector(selectCommitments);
  // console.log('these are the commitments', commitments)
  // console.log('these are the profiles', profiles)


  useEffect(() => {
    dispatch(fetchAllProfilesAsync());
  }, [dispatch]);


  useEffect(() => {
    dispatch(fetchAllCommitmentsAsync());
  }, [dispatch]);

  return (
    <>
      {profiles.map((profile) => {
        const matched = commitments.find((commitment) => commitment.user_id === profile.id);
        if (matched) {
          return <div key={profile.id}>{profile.username}</div>;
        }
        return null;
      })}
    </>
  );
}



export default AllProfiles;


// <div key={profile.id}>{profile.username}</div>;
