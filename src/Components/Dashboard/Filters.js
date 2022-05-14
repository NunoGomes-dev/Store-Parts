import {
  Box,
  FormControl,
  HStack,
  Input,
  Select,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsSortDown, BsSortUp } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";

const Filters = ({ filters, setFilters, selectOptions, isLoading }) => {
  const [orderAsc, setOrderAsc] = useState(true);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [type, setType] = useState(null);

  useEffect(() => {
    let values = {
      text: search ? search : null,
      type: type ? type : null,
      orderAsc: orderAsc,
    };
    setFilters({ ...values });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderAsc, search, type]);
  return (
    <HStack
      w="full"
      align={"center"}
      justify="start"
      spacing={6}
      opacity={isLoading ? "0.3" : "1"}
      transition="0.2s ease-in-out"
      pointerEvents={isLoading ? "none" : "auto"}
    >
      <Box>
        <FormControl>
          <InputGroup>
            <Input
              id="search"
              type="search"
              rounded={"md"}
              placeholder="Search..."
              value={text || ""}
              onChange={(e) => {
                let value = e.target.value;
                setText(value);
              }}
              onBlur={(e) => {
                let value = e.target.value
                  ? e.target.value.toLowerCase()
                  : null;
                setSearch(value);
              }}
            />
            <InputRightElement>
              <BiSearch />
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </Box>
      {selectOptions?.length > 0 && (
        <Box>
          <FormControl>
            <Select
              placeholder="Type"
              rounded={"md"}
              value={type || ""}
              onChange={(e) => {
                let value = e.target.value;
                setType(value);
              }}
            >
              {selectOptions.map((el, index) => (
                <option key={index} value={el}>
                  {el}
                </option>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
      <Button
        variant={"outline"}
        _focus={{ outline: "none" }}
        rightIcon={
          orderAsc ? (
            <BsSortUp fontSize={"18px"} />
          ) : (
            <BsSortDown fontSize={"18px"} />
          )
        }
        onClick={() => {
          setOrderAsc(!orderAsc);
        }}
      >
        Price
      </Button>
      {(search || type) && (
        <Box
          textDecoration={"underline"}
          cursor="pointer"
          onClick={() => {
            setSearch(null);
            setType(null);
            setFilters({
              text: null,
              type: null,
              orderAsc: orderAsc,
            });
          }}
        >
          clear filters
        </Box>
      )}

      {/* <Button rightIcon={<BsSortUp fontSize={"18px"} />}>Price</Button> */}
    </HStack>
  );
};

export default Filters;
