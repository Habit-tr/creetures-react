import {
  AddIcon,
  EditIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import supabase from "../../../utils/supabaseClient";
const HamburgerMenu = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { session } = useAuth();
  async function handleLogout(e: any) {
    e?.preventDefault();
    try {
      await logout();
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
        m="5px"
        bgColor="purple.200"
      />
      <MenuList>
        <Link to="/challenges">
          <Button m="5px" bgColor="purple.200">
            Challenges
          </Button>
        </Link>
        <Link to="/profile">
          <Button m="5px" bgColor="purple.200">
            Profile
          </Button>
        </Link>
        <Link to="/">
          <Button m="5px" bgColor="purple.200" onClick={handleLogout}>
            Logout
          </Button>
        </Link>
        <MenuItem icon={<AddIcon />} command="⌘T">
          New Tab
        </MenuItem>
        <MenuItem icon={<ExternalLinkIcon />} command="⌘N">
          New Window
        </MenuItem>
        <MenuItem icon={<RepeatIcon />} command="⌘⇧N">
          Open Closed Tab
        </MenuItem>
        <MenuItem icon={<EditIcon />} command="⌘O">
          Open File...
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default HamburgerMenu;
