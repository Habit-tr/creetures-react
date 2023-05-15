import { HamburgerIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
const HamburgerMenu = () => {
  const navigate = useNavigate();

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
        m="5px"
        bgColor="green.200"
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
      </MenuList>
    </Menu>
  );
};

export default HamburgerMenu;
