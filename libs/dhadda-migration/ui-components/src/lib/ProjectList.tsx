import { useRouter } from 'next/router';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { getProjectList } from '@dhadda-migration/data-access';
import { useQuery } from '@tanstack/react-query';

import { Box, Loader, Text } from '@myra-ui';

export const ProjectList = () => {
  const router = useRouter();
  const { data, isLoading } = useQuery(['list'], getProjectList);
  if (isLoading) {
    return (
      <Box>
        <Loader />
      </Box>
    );
  }
  return (
    <Box
      display="flex"
      flexDir="column"
      p={5}
      gap={5}
      bg="white"
      width="-webkit-fit-content"
      borderRadius={5}
      boxShadow="lg"
      mb={10}
    >
      <Text fontSize="r3" fontWeight="medium">
        Project List
      </Text>

      <Box maxH="75vh" overflowY="scroll">
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>S.N</Th>
                <Th>Project List</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.projects?.map((item: string, index: number) => (
                <Tr cursor="pointer" onClick={() => router.push(`/details?projectName=${item}`)}>
                  <Td>{index + 1}</Td>
                  <Td>{item}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ProjectList;
