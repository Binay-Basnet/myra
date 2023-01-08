import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import {
  asyncToast,
  Box,
  Button,
  Column,
  Grid,
  GridItem,
  Modal,
  Table,
  TablePopover,
  Text,
} from '@myra-ui';

import {
  NewClientEnvironmentInput,
  useDeleteEnvironementMutation,
  useGetClientDetailsQuery,
  useSetEnvironementMutation,
} from '@coop/neosys-admin/data-access';
import { FormCheckbox, FormInput, FormTextArea } from '@coop/shared/form';

export const NeosysFeatureClientView = () => {
  const router = useRouter();
  const clientId = router?.query['id'] as string;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, refetch } = useGetClientDetailsQuery({ clientId });

  const { mutateAsync: setEnvironmentMutation } = useSetEnvironementMutation();
  const { mutateAsync: deleteEnvironmentMutation } = useDeleteEnvironementMutation();

  const methods = useForm();
  const { getValues, reset, clearErrors, setError } = methods;

  const rowData = React.useMemo(() => data?.neosys?.client?.details?.environments ?? [], [data]);

  const columns = React.useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        id: 'Environment_name',
        header: 'Environment Name',
        accessorFn: (row) => row?.environmentName,
      },
      {
        id: 'Otp_Token',
        header: 'OTP Token',
        accessorFn: (row) => row?.otpToken,
      },
      {
        id: 'Is_for_production',
        header: 'Is for Production',
        accessorFn: (row) => row?.isForProduction,
      },
      {
        id: '_actions',
        header: 'Action',
        accessorKey: 'actions',
        cell: (cell) =>
          cell.row.original ? (
            <TablePopover
              node={cell.row.original}
              items={[
                {
                  title: 'Delete Environment',
                  onClick: async (node) => {
                    deleteEnvironmentMutation({ environmentId: node?.id }).then(() => {
                      refetch();
                    });
                  },
                },
              ]}
            />
          ) : null,
      },
    ],
    [rowData]
  );

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const onFormSubmit = async () => {
    await asyncToast({
      id: 'new-environement',
      msgs: {
        loading: 'Adding New Environment',
        success: 'New Environment Added',
      },
      onSuccess: () => {
        reset({ environmentName: '', otpToken: '', description: '', isForProduction: false });
        setIsModalOpen(false);
      },
      promise: setEnvironmentMutation({
        clientId,
        data: getValues(),
      }),
      onError: (error) => {
        if (error.__typename === 'ValidationError') {
          clearErrors();
          Object.keys(error.validationErrorMsg).map((key) =>
            setError(key as keyof NewClientEnvironmentInput, {
              message: error.validationErrorMsg[key][0] as string,
            })
          );
        }
      },
    });
  };

  return (
    <Box p="s8" display="flex" flexDirection="column" gap={2}>
      <Box display="flex" justifyContent="space-between">
        <Text fontSize="r2">MYRA Validation</Text>
        <Button onClick={handleModalOpen}>Create Environment</Button>
      </Box>
      <Box borderTop="1px" borderColor="gray.200">
        <Table
          data={rowData}
          columns={columns}
          getRowId={(row) => String(row?.id)}
          isLoading={isLoading}
          // noDataTitle={t['member']}
          // pagination={{
          //   total: data?.members?.list?.totalCount ?? 'Many',
          //   pageInfo: data?.members?.list?.pageInfo,
          // }}
        />
      </Box>

      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        isCentered
        title="Setup Environment"
        width="3xl"
      >
        <FormProvider {...methods}>
          <Grid templateColumns="repeat(2, 1fr)" rowGap="s12" columnGap="20px" py="s8">
            <GridItem>
              <FormInput name="environmentName" label="Environment" />
            </GridItem>
            <GridItem>
              <FormInput name="otpToken" label="OTP Token" />
            </GridItem>
            <GridItem colSpan={2}>
              <FormTextArea name="description" label="Description" />
            </GridItem>
            <GridItem colSpan={2}>
              <FormCheckbox name="isForProduction" label="Is For Production?" />
            </GridItem>
          </Grid>
          <Box display="flex" justifyContent="flex-end">
            <Button type="submit" onClick={onFormSubmit}>
              Submit
            </Button>
          </Box>
        </FormProvider>
      </Modal>
    </Box>
  );
};

export default NeosysFeatureClientView;
