import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BsThreeDots } from 'react-icons/bs';
import { IconButton } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, Column, Modal, PageHeader, Table } from '@myra-ui';

import { useGetUnitsListQuery, useSetUnitsMutation } from '@coop/cbs/data-access';
import { FormInput, FormSwitch } from '@coop/shared/form';
import { getPaginationQuery, useTranslation } from '@coop/shared/utils';

export const InventoryItemUnitsTable = () => {
  const [openModalUnits, setOpenModalUnits] = useState(false);

  const queryClient = useQueryClient();

  const methods = useForm();

  const { mutateAsync: unitMutate } = useSetUnitsMutation();

  const onOpenModalUnits = () => {
    setOpenModalUnits(true);
  };

  const onCloseModalUnits = () => {
    setOpenModalUnits(false);
  };
  const handleUpdateModalClose = () => {
    methods.reset({
      name: null,
      shortName: null,
      description: null,
      acceptFraction: null,
    });
  };

  const handleSave = () => {
    const values = methods.getValues();

    asyncToast({
      id: 'add-modal-units',
      promise: unitMutate({
        data: {
          ...values,
        },
      }),
      msgs: {
        loading: 'Adding Unit',
        success: 'New Unit Added',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getUnitsList']);
        handleUpdateModalClose();
        onCloseModalUnits();
        // router.push('/accounting/investment/investment-transaction/list');
      },
    });
  };

  const { t } = useTranslation();

  const { data: unitTable, isFetching } = useGetUnitsListQuery({
    pagination: getPaginationQuery(),
  });

  const rowItems = unitTable?.inventory?.unitOfMeasure?.list?.edges ?? [];

  const columns = useMemo<Column<typeof rowItems[0] | any>[]>(
    () => [
      {
        header: t['itemUnitName'],
        accessorKey: 'node.name',
      },
      {
        header: t['itemUnitShortname'],
        accessorKey: 'node.shortName',
      },
      {
        accessorKey: 'actions',
        cell: () => (
          <IconButton variant="ghost" aria-label="Search database" icon={<BsThreeDots />} />
        ),
      },
    ],
    [t]
  );

  return (
    <>
      <PageHeader heading="Units" buttonTitle="New Unit Add" onClick={onOpenModalUnits} button />

      <Table isLoading={isFetching} data={rowItems} columns={columns} />
      <Modal
        open={openModalUnits}
        onClose={onCloseModalUnits}
        title="Add Unit"
        primaryButtonLabel="Add"
        primaryButtonHandler={handleSave}
        onCloseComplete={handleUpdateModalClose}
      >
        <FormProvider {...methods}>
          <Box display="flex" flexDirection="column" gap="s24">
            <FormInput type="text" name="name" label={t['itemUnitFormName']} />
            <FormInput type="text" name="shortName" label={t['itemUnitFormShortName']} />
            <FormInput type="text" name="description" label={t['itemUnitFormDescription']} />
            <FormSwitch name="acceptFraction" label={t['itemUnitFormAcceptsFraction']} />
          </Box>
        </FormProvider>
      </Modal>
    </>
  );
};
