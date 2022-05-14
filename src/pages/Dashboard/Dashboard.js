import {
  Box,
  Heading,
  Skeleton,
  Stack,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Filters, TableContent } from "../../Components";
import api from "../../api";

const columns = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Type",
    accessor: "type",
  },
  {
    Header: "Price",
    accessor: "price",
  },
];

const Dashboard = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [data, setData] = useState(null);
  const [types, setTypes] = useState(null);
  const [filters, setFilters] = useState({
    text: null,
    type: null,
    orderAsc: true,
  });

  const getData = async () => {
    try {
      setIsLoading(true);
      let tempfilters = `?${filters.text ? `query=${filters.text}` : ""}${
        filters.type ? `${filters.text ? "&" : ""}type=${filters.type}` : ""
      }`;

      let url = `/store/parts${
        filters.text || filters.type ? tempfilters : ""
      }`;
      console.log(url);
      const res = await api.get(url);
      sort(res.data, filters.orderAsc);
      !isMounted && setIsMounted(true);
      setData([...res.data]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error getting types",
        status: "error",
        description: `getting types: ${error}`,
        position: "bottom",
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getTypes = async () => {
      try {
        const res = await api.get(`/store/part-types`);
        setTypes([...res.data]);
      } catch (error) {
        console.log(error);
        toast({
          title: "Error getting types",
          status: "error",
          description: `getting types: ${error}`,
          position: "bottom",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    getTypes();
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sort = (data, order) => {
    let tempData = [...data];
    tempData.sort(function (a, b) {
      if (order) {
        return (
          parseFloat(a.price.replace("$", "")) -
          parseFloat(b.price.replace("$", ""))
        );
      }
      return (
        parseFloat(b.price.replace("$", "")) -
        parseFloat(a.price.replace("$", ""))
      );
    });

    return tempData;
  };

  useEffect(() => {
    isMounted && getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return (
    <VStack w="full" h="full" align={"start"} px={8} py={12} spacing={4}>
      <Heading>Store Parts</Heading>
      <Filters
        isLoading={isLoading}
        filters={filters}
        setFilters={setFilters}
        selectOptions={types}
      />

      {isLoading && (
        <Stack w="50%">
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      )}
      {!isLoading && data?.length > 0 && (
        <Box w="50%">
          <TableContent data={data} columns={columns} />
          <Box>{data.length} items found</Box>
        </Box>
      )}
      {!isLoading && data?.length === 0 && <Box>No items to show!</Box>}
    </VStack>
  );
};
export default Dashboard;
