import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import {
  useGenerateReportMutation,
  useGetErrorsQuery,
  useGetReportStatusQuery,
  useGetReportTypesQuery,
  useGetTransformedDirStructureQuery,
} from '@migration/data-access';

import { Box, Button, Text } from '@myra-ui';

import { FormDatePicker, FormInput, FormSelect } from '@coop/shared/form';

export const TransformedDetailsComponents = () => {
  const router = useRouter();
  const methods = useForm();
  const { getValues, handleSubmit, reset } = methods;

  const transformedDetailsData = useGetTransformedDirStructureQuery({
    folderPath: [
      router?.query?.['name'],
      router?.query?.['csvType'],
      router?.query?.['folderName'],
      router?.query?.['subfolder'],
    ] as string[],
  });

  const checkErrorData = useGetErrorsQuery(
    {
      input: [
        router?.query?.['name'],
        router?.query?.['csvType'],
        router?.query?.['folderName'],
        router?.query?.['subfolder'],
      ] as string[],
    },
    {
      enabled: router?.query?.['subfolder'] === 'errors',
    }
  );
  const errorData = checkErrorData?.data?.protectedQuery?.checkErrors;

  const reportTypes = useGetReportTypesQuery(
    {},
    { enabled: router?.query?.['subfolder'] === 'customCSV' }
  );
  const reportTypesData = reportTypes?.data?.protectedQuery?.getReportType;

  const { mutateAsync } = useGenerateReportMutation();

  const reportStatusData = useGetReportStatusQuery({ dbName: router?.query?.['name'] as string });

  const onSubmit = () => {
    const titleArray = [];
    if (getValues()?.type1) {
      titleArray.push(getValues()?.type1);
    }
    if (getValues()?.type2) {
      titleArray.push(getValues()?.type2);
    }
    mutateAsync({
      input: {
        dbName: router?.query?.['name'] as string,
        title: titleArray,
        date: getValues()?.date?.en,
        head: getValues()?.head,
      },
    }).then(() => {
      reset();
      transformedDetailsData.refetch();
    });
  };

  return (
    <Box display="flex" justifyContent="space-between" gap={5}>
      <Box
        p={5}
        display="flex"
        flexDir="column"
        gap={5}
        bg="white"
        w="-webkit-fit-content"
        borderRadius={5}
        boxShadow="xs"
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" gap={5}>
          <Text fontSize="r3" fontWeight="medium">
            Transformed Data Details Page
          </Text>
          <Button onClick={() => transformedDetailsData.refetch()}>Reload</Button>
        </Box>
        <Text fontSize="r3">Project: {router?.query?.['name']}</Text>
        <Text fontSize="r3">Folder: {router?.query?.['folderName']}</Text>
        <Text fontSize="r3">Sub folder: {router?.query?.['subfolder']}</Text>
        {errorData && <Text fontSize="r3">Error count: {errorData?.count}</Text>}
        {router?.query?.['subfolder'] === 'customCSV' && (
          <Box p="5" fontSize="r3" bg="gray.200" w="-webkit-fit-content" borderRadius={5}>
            <Text>Generate Report</Text>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box display="flex" flexDirection="column" gap={5}>
                  <Box display="flex" gap={5}>
                    <FormSelect
                      label="Type 1"
                      name="type1"
                      options={reportTypesData?.map((item) => ({ label: item, value: item }))}
                    />
                    <FormSelect
                      label="Type 2"
                      name="type2"
                      options={reportTypesData?.map((item) => ({ label: item, value: item }))}
                    />
                  </Box>
                  <Box display="flex" gap={5}>
                    <FormDatePicker label="Date" name="date" />
                    <FormInput label="Head" name="head" type="number" />
                  </Box>
                  <Button type="submit" w="-webkit-fit-content">
                    Submit
                  </Button>
                </Box>
              </form>
            </FormProvider>
          </Box>
        )}
        <Text fontSize="r3">CSV:</Text>
        <Box w="-webkit-fit-content" bg="whiteAlpha.900" maxH="35vh" overflowY="scroll">
          <TableContainer border="1px" borderColor="gray.100">
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>S.N</Th>
                  <Th>Filename</Th>
                  {errorData && <Th>Error</Th>}
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
                      {errorData && <Td>{errorData?.files?.includes(i) ? 'true' : 'false'}</Td>}
                    </Tr>
                  )
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <Box
        p={5}
        display="flex"
        flexDir="column"
        gap={5}
        bg="white"
        w="-webkit-fit-content"
        borderRadius={5}
        boxShadow="xs"
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" gap={5}>
          <Text fontSize="r3" fontWeight="medium">
            Report Status
          </Text>
          <Button onClick={() => reportStatusData.refetch()}>Reload</Button>
        </Box>

        <Box maxH="35vh" overflowY="scroll" w="-webkit-fit-content">
          {reportStatusData?.data?.protectedQuery?.getreportStatus?.data?.map((i) => (
            <Text fontSize="r1" lineHeight={10}>
              -&nbsp;&nbsp;&nbsp;{i}
            </Text>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default TransformedDetailsComponents;
