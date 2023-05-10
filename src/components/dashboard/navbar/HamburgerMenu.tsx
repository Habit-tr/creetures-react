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

const HamburgerMenu = () => {
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
        <Button m="5px" bgColor="purple.200">
          Logout
        </Button>
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
