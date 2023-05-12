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
        bgColor="purple.200"
      />
      <MenuList>
        <MenuItem onClick={() => navigate("/")}>Home</MenuItem>
        <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
        <MenuItem onClick={() => navigate("/commitments")}>
          Commitments
        </MenuItem>
        <MenuItem onClick={() => navigate("/rewards")}>Rewards</MenuItem>
        <MenuItem onClick={() => navigate("/friends")}>Friends</MenuItem>
        <MenuItem onClick={() => navigate("/challenges")}>Challenges</MenuItem>
        <MenuItem onClick={() => navigate("/challenges/categories")}>
          Categories
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default HamburgerMenu;
