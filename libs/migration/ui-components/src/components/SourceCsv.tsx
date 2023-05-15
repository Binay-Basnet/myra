import { useState } from 'react';
import { useRouter } from 'next/router';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

import { Box, Button, Collapse, Text } from '@myra-ui';

export const SourceCsv = (props) => {
  const { directoryStructureData, directoryRefetch } = props;
  const router = useRouter();
  const [sourceCollapse, setSourceCollapse] = useState(true);

  const sourceCSVData =
    directoryStructureData?.protectedQuery?.getDirectoryStructure?.data[0]?.sourceCSV;
  8;

  return (
    <Box
      display="flex"
      flexDir="column"
      p={5}
      gap={5}
      bg="whiteAlpha.900"
      borderRadius={6}
      boxShadow="lg"
    >
      <Box display="flex" justifyContent="space-between">
        <Text
          fontSize="r3"
          fontWeight="medium"
          onClick={() => setSourceCollapse(!sourceCollapse)}
          cursor="pointer"
        >
          Source CSV:
        </Text>
        <Button onClick={() => directoryRefetch()}>Reload</Button>
      </Box>
      <Collapse in={sourceCollapse}>
        <Box maxH="35vh" overflowY="scroll">
          <TableContainer>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>S.N</Th>
                  <Th>Filename</Th>
                </Tr>
              </Thead>
              <Tbody>
                {sourceCSVData?.map((item, index) => (
                  <Tr
                    cursor="pointer"
                    onClick={() =>
                      router.push(`/${router?.query['name']}/${item}?csvType=sourceCSV`)
                    }
                  >
                    <Td>{index + 1}</Td>
                    <Td>{item}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Collapse>
    </Box>
  );
};

export default SourceCsv;
