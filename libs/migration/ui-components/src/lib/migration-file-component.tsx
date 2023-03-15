import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useGetCsvDataQuery, useSetCsvDataMutation } from '@migration/data-access';
import { differenceWith, isEqual, omit } from 'lodash';

import { Box, Button, Loader, Text } from '@myra-ui';

import { FormEditableTable } from '@coop/shared/form';

export const MigrationFileComponent = () => {
  const router = useRouter();
  const [changedRows, setChangedRows] = useState([]);

  const methods = useForm();
  const { reset, handleSubmit, getValues, watch } = methods;

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

  const onChange = () => {
    const watchedData = watch('data');
    const dataToBeSent = differenceWith(watchedData, alteredTableData, isEqual);
    setChangedRows(dataToBeSent);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} onChange={onChange}>
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
            <Box display="flex" flexDir="column">
              <Text fontSize="r3" fontWeight="medium">
                Project: {router?.query['name']}
              </Text>
              <Text fontSize="r3" fontWeight="medium">
                CSV type: {router?.query['csvType']}
              </Text>
              <Text fontSize="r3" fontWeight="medium">
                Migration File: {router?.query['filename']}
              </Text>
            </Box>
            <Button type="submit" w={100}>
              Submit
            </Button>
          </Box>
          <Box
            display="flex"
            p={2}
            bg="gray.500"
            borderRadius={5}
            w="-webkit-fit-content"
            position="fixed"
            top={90}
            left={500}
          >
            Changed Rows: {changedRows?.map((item) => `${item?.row}, `)}
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
