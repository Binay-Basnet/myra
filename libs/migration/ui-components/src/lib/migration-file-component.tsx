import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useGetCsvDataQuery, useSetCsvDataMutation } from '@migration/data-access';
import { differenceWith, isEqual, omit } from 'lodash';

import { Box, Button, Loader, Text } from '@myra-ui';

import { FormEditableTable } from '@coop/shared/form';

export const MigrationFileComponent = () => {
  const router = useRouter();

  const methods = useForm();
  const { reset, handleSubmit, getValues } = methods;

  const { data, refetch, isLoading } = useGetCsvDataQuery({
    input: {
      fileName: router?.query['filename'] as string,
      dbName: router?.query['name'] as string,
      folderName:
        router?.query['csvType'] !== 'transformedCSV'
          ? ([router?.query['csvType']] as string[])
          : ([router?.query['csvType'], router?.query['folderName']] as unknown as string[]),
      pageNo: 1 as unknown as string,
      data: null,
    },
  });

  const { mutateAsync } = useSetCsvDataMutation();

  const tableData = data?.protectedQuery?.getFileData;
  const alteredTableData = tableData?.reduce(
    (acc, curr) => [...acc, { ...curr?.data, row: curr?.row }],
    []
  );
  useEffect(() => {
    if (alteredTableData) {
      reset({
        data: [...alteredTableData],
      });
    }
  }, [tableData]);

  const columns =
    tableData &&
    Object?.keys(tableData?.[0]?.data)?.map((item) => ({ accessor: item, header: item }));

  const onSubmit = () => {
    const dataToBeSent = differenceWith(getValues()?.data, alteredTableData, isEqual);
    mutateAsync({
      input: {
        fileName: router?.query['filename'] as string,
        dbName: router?.query['name'] as string,
        folderName:
          router?.query['csvType'] !== 'transformedCSV'
            ? ([router?.query['csvType']] as string[])
            : ([router?.query['csvType'], router?.query['folderName']] as unknown as string[]),
        pageNo: 1 as unknown as string,
        data: dataToBeSent?.reduce(
          (acc, curr) => [...acc, { row: curr?.row, data: omit({ ...curr }, ['row']) }],
          []
        ),
      },
    }).then(() => refetch());
  };
  if (isLoading) {
    return (
      <Box>
        <Loader />
      </Box>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            <Text fontSize="r3" fontWeight="medium">
              CSV Data
            </Text>
            <Button type="submit" w={100}>
              Edit
            </Button>
          </Box>
          {columns && tableData && (
            <Box overflowX="scroll">
              <FormEditableTable
                name="data"
                hideSN
                columns={[{ accessor: 'row', header: 'Row' }].concat(columns)}
              />
            </Box>
          )}
        </Box>
      </form>
    </FormProvider>
  );
};

export default MigrationFileComponent;
