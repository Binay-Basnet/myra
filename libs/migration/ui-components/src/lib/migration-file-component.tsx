import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useGetCsvDataQuery } from '@migration/data-access';
import isArray from 'lodash/isArray';

import { Box } from '@myra-ui';

import { FormEditableTable } from '@coop/shared/form';

export const MigrationFileComponent = () => {
  const router = useRouter();
  const methods = useForm();
  const { reset } = methods;
  const { data } = useGetCsvDataQuery({
    input: {
      fileName: router?.query['filename'] as string,
      dbName: router?.query['name'] as string,
      folderName: [router?.query['csvType'] as string],
      pageNo: 1 as unknown as string,
      data: null,
    },
  });
  const tableData = data?.protectedQuery?.getFileData?.data;
  useEffect(() => {
    if (isArray(tableData)) {
      reset({
        data: [...tableData],
      });
    }
  }, [tableData]);
  const columns =
    tableData && Object?.keys(tableData?.[0])?.map((item) => ({ accessor: item, header: item }));

  return (
    <FormProvider {...methods}>
      <form>
        <Box
          display="flex"
          flexDir="column"
          p={5}
          gap={5}
          bg="whiteAlpha.900"
          borderRadius={6}
          boxShadow="lg"
        >
          {columns && tableData && (
            <FormEditableTable name="data" canDeleteRow={false} columns={columns} />
          )}
        </Box>
      </form>
    </FormProvider>
  );
};

export default MigrationFileComponent;
