import { HamburgerIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
const HamburgerMenu = () => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        m="5px"
        colorScheme="green"
      />
      <MenuList>
        <MenuItem onClick={() => navigate("/")}>My Dashboard</MenuItem>
        <MenuItem onClick={() => navigate("/profile")}>My Profile</MenuItem>
        <MenuItem onClick={() => navigate("/commitments")}>
          My Commitments
        </MenuItem>
        <MenuItem onClick={() => navigate("/rewards")}>My Rewards</MenuItem>
        <MenuItem onClick={() => navigate("/friends")}>My Friends</MenuItem>
        <MenuItem onClick={() => navigate("/challenges")}>
          Browse Challenges
        </MenuItem>
        {/* this will eventually live in the user profile / settings:  */}
        <MenuItem onClick={() => toggleColorMode()}>
          Toggle {colorMode === "light" ? "Dark" : "Light"} Mode
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default HamburgerMenu;
