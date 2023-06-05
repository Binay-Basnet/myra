import { useState } from 'react';
import { useRouter } from 'next/router';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { getAllCsv } from '@dhadda-migration/data-access';
import { useMutation } from '@tanstack/react-query';
import isEmpty from 'lodash/isEmpty';

import { Box, Button, Text, toast } from '@myra-ui';

export const ViewAllCsvs = () => {
  const router = useRouter();
  const [csvListData, setCsvListData] = useState([]);

  const { mutateAsync: getAllCsvMutation, isLoading } = useMutation(getAllCsv, {
    onSuccess: (res) => {
      setCsvListData(res.data.csvs);

      toast({
        id: 'download-csv',
        type: 'success',
        message: 'all csv are listed',
      });
    },
    onError: () => {
      toast({
        id: 'download-csv',
        type: 'error',
        message: 'Something went wrong',
      });
    },
  });
  const onDownloadCsv = () => {
    const formData = new FormData();
    formData.append('project_name', router?.query?.['projectName'] as string);
    getAllCsvMutation(formData as unknown as { project_name: string });
  };

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
    >
      <Button w="-webkit-fit-content" onClick={onDownloadCsv} isLoading={isLoading}>
        View all CSVs
      </Button>

      {!isEmpty(csvListData) && (
        <>
          <Text fontSize="r3" fontWeight="medium">
            CSVs:
          </Text>
          <Box maxH="30vh" overflowY="scroll">
            <TableContainer>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>S.N</Th>
                    <Th>Csvs</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {csvListData.map((item, index) => (
                    <Tr
                      cursor="pointer"
                      onClick={() =>
                        router.push(`${item}?projectName=${router?.query?.['projectName']}`)
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
        </>
      )}
    </Box>
  );
};
