import { useRouter } from 'next/router';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useGetTransformedDirStructureQuery } from '@migration/data-access';

import { Box, Text } from '@myra-ui';

export const TransformedDetailsComponents = () => {
  const router = useRouter();

  const transformedDetailsData = useGetTransformedDirStructureQuery({
    folderPath: [
      router?.query?.['name'],
      router?.query?.['csvType'],
      router?.query?.['folderName'],
      router?.query?.['subfolder'],
    ] as string[],
  });

  return (
    <Box display="flex" flexDir="column" gap={5}>
      <Text fontSize="r3" fontWeight="medium">
        Transformed Data Details Page
      </Text>
      <Text fontSize="r3">Project: {router?.query?.['name']}</Text>
      <Text fontSize="r3">Folder: {router?.query?.['folderName']}</Text>
      <Text fontSize="r3">Sub folder: {router?.query?.['subfolder']}</Text>
      <Text fontSize="r3">CSV:</Text>
      <Box w="-webkit-fit-content" bg="whiteAlpha.900" maxH="35vh" overflowY="scroll">
        <TableContainer border="1px" borderColor="gray.100">
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>S.N</Th>
                <Th>Filename</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transformedDetailsData?.data?.protectedQuery?.getTransformedDirStruct?.map(
                (i, index) => (
                  <Tr
                    cursor="pointer"
                    onClick={() =>
                      router.push(
                        `/${router?.query['name']}/${i}?folderName=${router?.query?.['folderName']}&&subfolder=${router?.query?.['subfolder']}&&csvType=transformedCSV`
                      )
                    }
                  >
                    <Td>{index + 1}</Td>
                    <Td>{i}</Td>
                  </Tr>
                )
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default TransformedDetailsComponents;
