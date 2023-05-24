import { Card, Flex, Text } from "@chakra-ui/react";

import Badge1 from "../components/Badge1";
import Badge2 from "../components/Badge2";
import Badge3 from "../components/Badge3";

interface RenderMedalProps {
  level: number;
}

const RenderMedal = ({ level }: RenderMedalProps) => {
  let BadgeComponent = null;

  if (level < 4) {
    BadgeComponent = Badge3;
  } else if (level > 4 && level <= 9) {
    BadgeComponent = Badge2;
  } else if (level > 9) {
    BadgeComponent = Badge1;
  }

  return (
    <>
      <Flex>
      {BadgeComponent && <BadgeComponent />}
        <Card
          border="2px #ffde5c solid"
          height="30px"
          width="30px"
          rounded="100%"
          // bgGradient={`linear(to-br, ${color}, ${gradientColor})`}
          align="center"
          justify="center"
        >
          <Text
            color="#ffde5c"
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
