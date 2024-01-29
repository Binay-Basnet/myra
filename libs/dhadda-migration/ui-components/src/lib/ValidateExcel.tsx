import { useRouter } from 'next/router';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { validateExcel } from '@dhadda-migration/data-access';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import isEmpty from 'lodash/isEmpty';

import { Box, Button, Text, toast } from '@myra-ui';

export const ValidateExcel = (props: {
  inputStatus: boolean;
  errorData: { data: { error_message: string; sheet_name: string }; row: number }[];
  setErrorData: (value: []) => void;
}) => {
  const { inputStatus, errorData, setErrorData } = props;
  const router = useRouter();
  const queryClient = useQueryClient();

  const alteredErrorData = errorData?.map(
    (item: { data: { error_message: string; sheet_name: string }; row: number }) => ({
      ...item.data,
      row: item.row,
    })
  );
  const { mutate: validateExcelMutation, isLoading: isValidationLoading } = useMutation(
    validateExcel,
    {
      onSuccess: (res) => {
        toast({
          id: 'validate-excel',
          type: 'success',
          message: res?.data?.message,
        });
        queryClient.invalidateQueries(['project-status']);
      },
      onError: (res: { response: { data: { error: []; message: string } } }) => {
        toast({
          id: 'validate-excel',
          type: 'error',
          message: res?.response?.data?.message,
        });
        setErrorData(res?.response?.data?.error);
      },
    }
  );
  const onValidateExcel = () => {
    const formData = new FormData();
    formData.append('project_name', router?.query?.['projectName'] as string);
    validateExcelMutation(formData as unknown as { project_name: string });
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
      <Button
        w="-webkit-fit-content"
        onClick={onValidateExcel}
        isLoading={isValidationLoading}
        isDisabled={!inputStatus}
      >
        Validate Excel
      </Button>
      {!isEmpty(alteredErrorData) && (
        <>
          <Text fontSize="r3" fontWeight="medium">
            Validate CSV Errors
          </Text>
          <Box maxH="50vh" overflowY="scroll">
            <TableContainer>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>Row</Th>
                    <Th>Sheet Name</Th>
                    <Th>Error Message</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {alteredErrorData.map((item) => (
                    <Tr>
                      <Td>{item.row}</Td>
                      <Td>{item.sheet_name}</Td>
                      <Td>{item.error_message}</Td>
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
