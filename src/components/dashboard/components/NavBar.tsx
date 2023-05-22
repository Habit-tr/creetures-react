import {
  Avatar,
  Box,
  Button,
  Collapse,
  Flex,
  Icon,
  IconButton,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import { ArrowForwardIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import { BsMoonStarsFill, BsSun } from "react-icons/bs";

import {
  ChevronDownIcon,
  ChevronRightIcon,
  CloseIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";

// import "../styles.css";

// import { IconType } from 'react-icons';
// import {
//   FiHome,
//   FiTrendingUp,
//   FiCompass,
//   FiStar,
//   FiSettings,
// } from 'react-icons/fi';
// interface LinkItemProps {
//   name: string;
//   icon: IconType;
// }
// const LinkItems: Array<LinkItemProps> = [
//   { name: 'Home', icon: FiHome },
//   { name: 'Friends', icon: FiTrendingUp },
//   { name: 'Saved Challenges', icon: FiStar },
//   { name: 'Commitments', icon: FiCompass },
//   { name: 'Settings', icon: FiSettings },
// ];

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function NavBar() {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  // const logoutKeyframes = keyframes`
  //     0% { transform: scale(0) rotate(90deg); border-radius: 2%; }
  //     2% { transform: scale(0) rotate(90deg); border-radius: 2%; }
  //     2% { transform: scale(0) rotate(90deg); border-radius: 2%; }
  //     2% { transform: scale(0) rotate(90deg); border-radius: 2%; }
  //    `;
  //    const animation = `${logoutKeyframes} 2s ease-in-out infinite`;

  const { logout } = useAuth();
  const navigate = useNavigate();
  const { session } = useAuth();
  const user = session.session.user;
  async function handleLogout(e: any) {
    e?.preventDefault();
    try {
      await logout();
      await navigate("/");
      await navigate(0);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={10}
        borderStyle={"solid "}
        borderColor={useColorModeValue("green.200", "green.200")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Link href="/">
            <Box
              as={motion.div}
              justifySelf="center"
              justifyContent="center"
              height="40px"
              width="300px"
              paddingLeft="10"
              paddingRight="3"
              drag="y"
              dragConstraints={{ left: -100, right: 200 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition="0.5s ease-in-out"
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontFamily={"Play Toon"}
              fontSize="40px"
              color={useColorModeValue("gray.800", "green.200")}
            >
              Creetures
            </Box>
          </Link>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          align={"center"}
          spacing={10}
        >
          <Button
            aria-label="Toggle Color Mode"
            onClick={toggleColorMode}
            _focus={{ boxShadow: "none" }}
            w="fit-content"
          >
            {colorMode === "light" ? <BsMoonStarsFill /> : <BsSun />}
          </Button>
          <Button
            rightIcon={<ArrowForwardIcon />}
            height="32px"
            width="100px"
            border="2px"
            fontSize={"md"}
            fontWeight={600}
            variant={"link"}
            color={useColorModeValue("gray.800", "green.200")}
            onClick={handleLogout}
          >
            Logout
          </Button>
          <Button rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
            <Avatar
              size={"lg"}
              src={
                "https://gravatar.com/avatar/f5fafa6c888f5875a5fc75609d69b6ef?s=400&d=robohash&r=x"
              }
            />
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("green.200", "green.200");
  const popoverContentBgColor = useColorModeValue("gray.200", "gray.800");

  return (
    <Stack direction={"row"} spacing={12} align={"center"}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "/"}
                fontSize={"md"}
                fontWeight={600}
                color={linkColor}
                _hover={{
                  cursor: "pointer",
                  fontSize: "1.5em",
                  transition: " .8s ease-in-out",
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{
        bg: useColorModeValue("green.200", "gray.900"),
        cursor: "pointer",
        fontSize: "1.2em",
      }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "green.200" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"} className="extend-on-hover">
            {subLabel}
          </Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"green.200"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      align={"center"}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex py={2} as={Link} href={href ?? "#"} justify={"space-between"}>
        <Text
          fontWeight={600}
          align={"center"}
          _hover={{
            bg: useColorModeValue("green.200", "gray.900"),
            cursor: "pointer",
            fontSize: "1.2em",
          }}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          align={"center"}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Profile",
    children: [
      {
        label: "Profile",
        subLabel: "View your profile",
        href: "/profile",
      },
      {
        label: "Dashboard",
        subLabel: "View your dashboard",
        href: "/",
      },
    ],
  },
  {
    label: "Rewards",
      subLabel: "View your rewards",
      href: "/rewards",

  },
  {
    label: "Commitments",
    href: "/commitments",
  },
  {
    label: "Explore",
    children: [
      {
        label: "Challenges",
        subLabel: "Find a new challenge",
        href: "/challenges",
      },
      {
        label: "Friends",
        subLabel: "See what others are doing",
        href: "/explorefriends",
      },
    ],
  },
];
