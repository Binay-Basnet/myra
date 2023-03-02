import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import {
  LedgerMapping,
  useGetMappingDataQuery,
  useSetMappingDataMutation,
} from '@migration/data-access';
import differenceWith from 'lodash/differenceWith';
import isEqual from 'lodash/isEqual';

import { Box, Button, Loader, Text } from '@myra-ui';

import { FormEditableTable } from '@coop/shared/form';

export const MigrationMappingComponent = () => {
  const router = useRouter();
  const { data, isLoading } = useGetMappingDataQuery({ dbName: router?.query?.['name'] as string });
  const methods = useForm();
  const { reset, handleSubmit, getValues } = methods;
  const tableData = data?.protectedQuery?.getMappingData?.data;
  const { mutateAsync } = useSetMappingDataMutation();

  useEffect(() => {
    if (tableData) {
      reset({
        data: tableData,
      });
    }
  }, [tableData]);

  if (isLoading) {
    return (
      <Box display="flex">
        <Loader />
      </Box>
    );
  }
  const onSubmit = () => {
    const dataToBeSent = differenceWith(getValues()?.data, tableData, isEqual);
    mutateAsync({ input: dataToBeSent, dbName: router?.query?.['name'] as string });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDir="column" gap={5}>
          <Box display="flex" justifyContent="space-between">
            <Text fontSize="2xl" fontWeight="semibold">
              Projects {'>'} {router?.query?.['name']}
            </Text>
            <Button type="submit">Edit</Button>
          </Box>

          <Box
            display="flex"
            flexDir="column"
            p={5}
            gap={5}
            bg="whiteAlpha.900"
            borderRadius={6}
            boxShadow="lg"
          >
            <FormEditableTable<LedgerMapping>
              name="data"
              canDeleteRow={false}
              columns={[
                {
                  accessor: 'newCode',
                  header: 'New Code',
                },
                {
                  accessor: 'oldCode',
                  header: 'Old code',
                },
                {
                  accessor: 'name',
                  header: 'Name',
                },
                {
                  accessor: 'row',
                  header: 'Row',
                },
              ]}
            />
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
};

export default MigrationMappingComponent;
