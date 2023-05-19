import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../utils/reduxHooks";
import {
  fetchAllCommitmentsAsync,
  selectCommitments,
} from "../../challenges/commitments/allCommitmentsSlice";
import {
  fetchAllProfilesAsync,
  selectAllProfiles,
} from "../Single-All-ProfilesSlice";

const AllProfiles = () => {
  const dispatch = useAppDispatch();
  const profiles = useAppSelector(selectAllProfiles);
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
        const matched = commitments.find(
          (commitment) => commitment.user_id === profile.id,
        );
        if (matched) {
          return <div key={profile.id}>{profile.username}</div>;
        }
        return null;
      })}
    </>
  );
};

export default AllProfiles;

// <div key={profile.id}>{profile.username}</div>;
