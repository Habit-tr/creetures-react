import { useAuth } from "../../../context/AuthContext";
import { Button, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import supabase from "../../../utils/supabaseClient";
import { useState, useEffect } from "react";
import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

const Profile = () => {
  const { currentUser } = useAuth();
  const [currentUserUrl, setCurrentUserUrl] = useState("");
  const [error, setError] = useState("");
  const [file, setFile] = useState([]);

  useEffect(() => {
    const { data } = supabase.storage
      .from("profilePictures")
      .getPublicUrl(`${currentUser.id}`);
    setCurrentUserUrl(data.publicUrl);
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const filename = `${currentUser.id}`;
    try {
      const { data, error } = await supabase.storage
        .from("profilePictures")
        .upload(filename, file, {
          cacheControl: "3600",
          upsert: false,
        });

      // const filepath = data.path; // save filepath in database
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileSelected = (e: any) => {
    try {
      setFile(e.target.files[0]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Wrap>
        <WrapItem>
          <Avatar name={`${currentUser.id}`} src={currentUserUrl} />
        </WrapItem>
      </Wrap>
      <Heading>Profile</Heading>
      Email: {`${currentUser.email}`}
      <Link to="/commitments">
        <Button m="20px">VIEW MY COMMITMENTS</Button>
      </Link>
      <input
        type="file"
        id="files"
        className=""
        multiple={false}
        accept="image/*"
        title="Testing this out"
        onChange={handleFileSelected}
      />
      <button
        type="submit"
        className=""
        onClick={handleSubmit}
      >
        Submit New Profile Picture
      </button>
    </div>
  );
};

export default Profile;
