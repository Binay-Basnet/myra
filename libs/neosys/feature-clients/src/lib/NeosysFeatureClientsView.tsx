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
  toast,
} from '@myra-ui';

import {
  NewClientEnvironmentInput,
  useDeleteEnvironementMutation,
  useGetClientDetailsQuery,
  useGetVersionQuery,
  useSetEnvironementMutation,
  useSetUpEnvironmentDatabaseMutation,
  useUpdateVersionMutation,
} from '@coop/neosys-admin/data-access';
import { FormCheckbox, FormInput, FormSelect, FormTextArea } from '@coop/shared/form';

export const NeosysFeatureClientView = () => {
  const router = useRouter();
  const clientId = router?.query['id'] as string;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const [isUpdateEnvironmentOpen, setIsUpdateEnvironmentOpen] = useState(false);
  const { data, isLoading, refetch } = useGetClientDetailsQuery({ clientId });

  const { mutateAsync: setEnvironmentMutation } = useSetEnvironementMutation();
  const { mutateAsync: deleteEnvironmentMutation } = useDeleteEnvironementMutation();
  const { mutateAsync: setUpEnvironmentDatabaseMutation } = useSetUpEnvironmentDatabaseMutation();
  const { data: versionData } = useGetVersionQuery();
  const versionOption = versionData?.neosys?.versions?.map((item) => ({
    label: item?.id as string,
    value: item?.id as string,
  }));

  const methods = useForm();

  const { getValues, reset, clearErrors, setError } = methods;

  const updateEnvironmentMethods = useForm();

  const { getValues: updateEnvGetValues, handleSubmit: updateEnvHandleSubmit } =
    updateEnvironmentMethods;
  const { mutateAsync: updateEnvMutateAsync } = useUpdateVersionMutation();

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
        id: 'version',
        header: 'Version',
        accessorFn: (row) => row?.version,
      },
      {
        id: 'Is_for_production',
        header: 'Is for Production',
        accessorFn: (row) => row?.isForProduction,
      },
      {
        id: '_actions',
        header: 'Actions',
        accessorKey: 'actions',
        cell: (cell) =>
          cell.row.original ? (
            <TablePopover
              node={cell.row.original}
              items={[
                {
                  title: 'Delete Environment',
                  onClick: async (node) => {
                    setCurrentId(node?.id);
                    setIsDeleteModalOpen(true);
                    // deleteEnvironmentMutation({ environmentId: node?.id }).then(() => {
                    //   refetch();
                    //   toast({
                    //     id: 'delete-environement',
                    //     type: 'success',
                    //     message: 'Environement deleted successfully',
                    //   });
                    // });
                  },
                },
                {
                  title: 'Create Database',
                  onClick: async (node) => {
                    await asyncToast({
                      id: 'create-db',
                      msgs: {
                        success: 'Db Created Successfully',
                        loading: 'Creating New DB for this environment',
                      },
                      onSuccess: () => refetch(),
                      promise: setUpEnvironmentDatabaseMutation({
                        clientId,
                        environmentId: node?.id,
                      }),
                    });
                  },
                },
                {
                  title: 'Update Environment',
                  onClick: (node) => {
                    setCurrentId(node?.id);
                    setIsUpdateEnvironmentOpen(true);
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
  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleUpgradeEnvironmentClose = () => {
    setCurrentId('');
    setIsUpdateEnvironmentOpen(false);
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
        refetch();
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

  const onSubmitEnvUpdate = () => {
    updateEnvMutateAsync({
      environmentId: currentId,
      version: updateEnvGetValues()?.['version'],
    })
      .then(() => {
        toast({
          id: 'update-env',
          type: 'success',
          state: 'success',
          message: 'Environment version update successsful',
        });
        setCurrentId('');
        setIsUpdateEnvironmentOpen(false);
        refetch();
      })
      .catch(() => {
        toast({
          id: 'update-env',
          type: 'error',
          state: 'error',
          message: 'Environment version update unsuccessful',
        });
      });
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" p={2}>
        <Text fontSize="r2">{data?.neosys?.client?.details?.organizationName}</Text>
        <Button onClick={handleModalOpen}>Create Environment</Button>
      </Box>
      <Table
        data={rowData}
        columns={columns}
        getRowId={(row) => row?.id as string}
        isLoading={isLoading}
        // noDataTitle={t['member']}
        // pagination={{
        //   total: data?.members?.list?.totalCount ?? 'Many',
        //   pageInfo: data?.members?.list?.pageInfo,
        // }}
      />
      <Modal
        open={isUpdateEnvironmentOpen}
        onClose={handleUpgradeEnvironmentClose}
        isCentered
        title="Update Environment"
        width="3xl"
      >
        <FormProvider {...updateEnvironmentMethods}>
          <form onSubmit={updateEnvHandleSubmit(onSubmitEnvUpdate)}>
            <Box display="flex" flexDir="column" gap={5}>
              <FormSelect name="version" label="Select Versions" options={versionOption} />

              <Button type="submit" w="-webkit-fit-content">
                Submit
              </Button>
            </Box>
          </form>
        </FormProvider>
      </Modal>
      <Modal
        open={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        isCentered
        title="Delete Environment"
        width="3xl"
      >
        <Box display="flex" flexDir="column" gap={5}>
          <Text>Are you sure you want to delete this environment?</Text>
          <Box display="flex" gap={2} justifyContent="flex-end">
            <Button
              w="-webkit-fit-content"
              onClick={() => {
                deleteEnvironmentMutation({ environmentId: currentId }).then(() => {
                  refetch();
                  toast({
                    id: 'delete-environement',
                    type: 'success',
                    message: 'Environement deleted successfully',
                  });
                  handleDeleteModalClose();
                  setCurrentId('');
                });
              }}
            >
              Yes
            </Button>
            <Button w="-webkit-fit-content" onClick={() => handleDeleteModalClose()}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

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
            <GridItem>
              <FormSelect name="version" label="Select Versions" options={versionOption} />
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
    </>
  );
};

export default NeosysFeatureClientView;
