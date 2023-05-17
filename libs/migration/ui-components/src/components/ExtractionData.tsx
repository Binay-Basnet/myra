import { useState } from 'react';
import { useRouter } from 'next/router';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useGetExtractionDataQuery } from '@migration/data-access';

import { Box, Button, Collapse, Text } from '@myra-ui';

export const ExtractionData = () => {
  const router = useRouter();
  const [extractionCollapse, setExtractionCollapse] = useState(true);

  const { data: extractionData, refetch: extractionRefetch } = useGetExtractionDataQuery({
    dbName: router?.query?.['name'] as string,
  });

  const extractedData = extractionData?.protectedQuery?.getExtractionData?.data;
  return (
    <Box
      display="flex"
      flexDir="column"
      p={5}
      gap={5}
      bg="whiteAlpha.900"
      borderRadius={6}
      boxShadow="lg"
      // w="-webkit-fit-content"
    >
      <Box display="flex" justifyContent="space-between">
        <Text
          fontSize="r3"
          fontWeight="medium"
          onClick={() => setExtractionCollapse(!extractionCollapse)}
          cursor="pointer"
        >
          Extraction Data:{' '}
        </Text>
        <Button onClick={() => extractionRefetch()}>Reload</Button>
      </Box>
      <Collapse in={extractionCollapse}>
        <Box maxH="35vh" overflowY="scroll" w="-webkit-fit-content">
          <TableContainer>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>S.N</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {extractedData?.map((i, index) => (
                  <Tr>
                    <Td>{index + 1}</Td>
                    <Td>{i}</Td>
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

export default ExtractionData;
