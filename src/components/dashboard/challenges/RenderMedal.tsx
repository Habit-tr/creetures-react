import { Card, Flex, Text } from "@chakra-ui/react";

interface RenderMedalProps {
  level: number;
}

const RenderMedal = ({ level }: RenderMedalProps) => {

  let color = "tan";
  let gradientColor = "brown";
  if (level > 4) {
    color = "silver";
    gradientColor = "gray";
  }
  if (level > 9) {
    color = "yellow";
    gradientColor = "orange";
  }

  return (
    <>
      <Flex>
        <Card
          border="1px white solid"
          outline="2px black solid"
          height="40px"
          width="40px"
          rounded="100%"
          bgGradient={`linear(to-br, ${color}, ${gradientColor})`}
          align="center"
          justify="center"
        >
          <Text color="black" mb="0px" pb="0px" fontSize="20px">
            {level}
          </Text>
        </Card>
      </Flex>
    </>
  );
};

export default RenderMedal;
