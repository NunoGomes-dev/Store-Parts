import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const TableContent = ({ data, columns }) => {
  const navigate = useNavigate();
  const bgPairTableRows = mode("gray.100", "gray.800");
  const bgOddTableRows = mode("white", "gray.700");
  const hoverTableRows = mode("gray.200", "gray.600");
  const bgTableHead = mode("gray.50", "gray.900");

  return (
    <Table my="2" borderWidth="1px" fontSize="sm">
      <Thead bg={bgTableHead}>
        <Tr>
          {columns.map((column, index) => (
            <Th whiteSpace="nowrap" scope="col" key={index}>
              {column.Header}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data &&
          data.map((row, dataIndex) => (
            <Tr
              key={dataIndex}
              bg={dataIndex % 2 === 0 ? bgPairTableRows : bgOddTableRows}
              _hover={{ bg: hoverTableRows }}
              onClick={() => {
                navigate(`/parts/${row.name}/${row.type}/${row.price}`);
              }}
              cursor={"pointer"}
            >
              {columns.map((column, index) => {
                const cell = row[column.accessor];
                const element = column.Cell?.(cell) ?? cell;

                return (
                  <Td whiteSpace="nowrap" key={index}>
                    {element}
                  </Td>
                );
              })}
            </Tr>
          ))}
      </Tbody>
    </Table>
  );
};
export default TableContent;
