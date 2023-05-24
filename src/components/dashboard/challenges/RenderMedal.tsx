import { Card, Flex, Text } from "@chakra-ui/react";

import Badge1 from "../components/Badge1";
import Badge2 from "../components/Badge2";
import Badge3 from "../components/Badge3";
import Badge4 from "../components/Badge4";
import Badge5 from "../components/Badge5";

interface RenderMedalProps {
  level: number;
}

const RenderMedal = ({ level }: RenderMedalProps) => {
  let BadgeComponent = null;
    let badgeColor = "#F59272";
    let badgeShadow = "#BF6040";
  if (level < 4) {
    BadgeComponent = Badge3;
  } else if (level > 4 && level <= 9) {
    badgeColor = "silver";
    badgeShadow = "gray";
    BadgeComponent = Badge2;
  } else if (level > 9 && level <= 14) {
    badgeColor = "#fbd24a";
    badgeShadow = "#dfa825";
    BadgeComponent = Badge1;
  } else if (level > 14 && level <= 19) {
    BadgeComponent = Badge4;
  } else if (level > 19) {
    BadgeComponent = Badge5;
  }

  return (
    <>
      <Flex>
      {BadgeComponent && <BadgeComponent />}
        <Card
          bgColor={badgeColor}
          border={`2px ${badgeShadow} solid`}
          height="30px"
          width="30px"
          rounded="100%"
          // bgGradient={`linear(to-br, ${color}, ${gradientColor})`}
          align="center"
          justify="center"
        >
          <Text
            color="white"
            textShadow={`1px 1px ${badgeShadow}`}
            mb="0px"
            pb="0px"
            fontSize="md"
            fontWeight="bold"
          >
            {level}
          </Text>
        </Card>
      </Flex>
    </>
  );
};

export default RenderMedal;
