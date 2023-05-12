import {
  AddIcon,
  EditIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
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
        <MenuItem icon={<AddIcon />} command="⌘T">
          Home
        </MenuItem>
        <MenuItem icon={<ExternalLinkIcon />} command="⌘N">
          Profile
        </MenuItem>
        <MenuItem icon={<RepeatIcon />} command="⌘⇧N">
          Challenges
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default HamburgerMenu;
