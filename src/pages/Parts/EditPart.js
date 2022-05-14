import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const EditPart = () => {
  let { name, type, price } = useParams();
  return (
    <VStack w="full" h="full" justify={"center"} align="center" spacing={8}>
      <Heading>{name}</Heading>
      <Text>{type}</Text>
      <Text>{price}</Text>
    </VStack>
  );
};

export default EditPart;
