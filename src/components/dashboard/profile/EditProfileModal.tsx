import { Avatar, Button, Flex, Heading, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import supabase from "../../../utils/supabaseClient";

const EditProfileModal = () => {
  const [file, setFile] = useState<any>([]);
  const [currentUserUrl, setCurrentUserUrl] = useState("");
  const { currentUser } = useAuth();

  useEffect(() => {
    const { data } = supabase.storage
      .from("profilePictures")
      .getPublicUrl(`${currentUser.id}`);
    console.log("setting currentUser");
    setCurrentUserUrl(data.publicUrl);
  }, [currentUser.id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const filename = `${currentUser.id}`;
    try {
      await supabase.storage.from("profilePictures").upload(filename, file, {
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
    <Flex direction="column">
      <Heading padding="20px">Edit Profile Modal</Heading>
      <Avatar name={`${currentUser.id}`} src={currentUserUrl} />
      <Input
        type="file"
        id="files"
        className=""
        multiple={false}
        accept="image/*"
        title="Testing this out"
        onChange={handleFileSelected}
      />
      <Button type="submit" className="" onClick={(e) => handleSubmit(e)}>
        Submit New Profile Picture
      </Button>
    </Flex>
  );
};
export default EditProfileModal;
