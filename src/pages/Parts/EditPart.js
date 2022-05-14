import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

const EditPart = () => {
  let { name, type, price } = useParams();
  const navigate = useNavigate();
  return (
    <VStack w="full" h="full" justify={"center"} align="center" spacing={8}>
      <VStack justify={"center"} align="center" spacing={8}>
        <Heading>{name}</Heading>
        <Text>{type}</Text>
        <Text>{price}</Text>
      </VStack>
      <Button
        onClick={() => {
          navigate("/");
        }}
      >
        Go Back
      </Button>
    </VStack>
  );
};

export default EditPart;
