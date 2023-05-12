import { Box, Card, Flex, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";

const RenderMedals = () => {
  const [level, setLevel] = useState(1);

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
    <div>
      <Heading>Render Medals</Heading>
      <Flex>
        <Box padding="10px" onClick={() => setLevel(level + 1)}>
          <Card
            border="2px black solid"
            height="100px"
            width="100px"
            rounded="100%"
            bgGradient={`linear(to-br, ${color}, ${gradientColor})`}
            align="center"
            justify="center"
          >
            <Text color="black" mb="0px" pb="0px" fontSize="50px">
              {level}
            </Text>
          </Card>
          <Text align="center" mt="0px" pt="0px">
            Jogging
          </Text>
        </Box>
      </Flex>
    </div>
  );
};
export default RenderMedals;
