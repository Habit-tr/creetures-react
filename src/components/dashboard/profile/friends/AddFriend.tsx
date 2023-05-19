import { Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../utils/reduxHooks";

import {
  addFriendAsync,
  fetchFriendsAsync,
  selectFriends,
} from "./FriendsSlice";

interface AddFriendProps {
  user_id: string;
  username: string;
  avatar_url: string;
  addFriend: (name: string) => void;
}

const AddFriend = ({
  user_id,
  username,
  avatar_url,
  addFriend,
}: AddFriendProps) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectFriends);
  const [friendList, setFriendList] = useState([]);
  const toast = useToast();

  const handleAddButton = async () => {
    dispatch(addFriendAsync([user_id, username, avatar_url]));
    toast({
      title: "Friend added.",
    });
    await dispatch(fetchFriendsAsync(setFriendList));
  };
  return (
    <>
      <Button
        type="submit"
        onClick={() => handleAddButton()}
        bgColor="green.200"
      >
        Add Friend
      </Button>
    </>
  );
};

export default AddFriend;
