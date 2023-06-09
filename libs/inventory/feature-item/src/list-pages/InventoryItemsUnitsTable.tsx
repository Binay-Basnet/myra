import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, Column, Modal, PageHeader, Table, TablePopover } from '@myra-ui';

import {
  InvUnitOfMeasureInput,
  useGetUnitsFormStateDetailsQuery,
  useGetUnitsListQuery,
  useSetUnitsMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormInput, FormSwitch } from '@coop/shared/form';
import { getPaginationQuery, useTranslation } from '@coop/shared/utils';

import { UnitsDetailsModal } from '../component/details/UnitsDEtails';

export const InventoryItemUnitsTable = () => {
  const [openModalUnits, setOpenModalUnits] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const router = useRouter();
  const idUnits = router?.query['id'];
  const queryClient = useQueryClient();

  const methods = useForm();

  const { mutateAsync: unitMutate } = useSetUnitsMutation();

  const onOpenModalUnits = () => {
    setOpenModalUnits(true);
  };

  const onCloseModalUnits = () => {
    setOpenModalUnits(false);
  };

  const onOpenDetailsModal = () => {
    setOpenDetailModal(true);
  };

  const onCloseDetailsModal = () => {
    setOpenDetailModal(false);
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
        id: idUnits ? (idUnits as string) : undefined,

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
  const { reset } = methods;

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

        cell: (props) =>
          props?.row?.original && (
            <TablePopover
              node={props?.row?.original}
              items={[
                {
                  title: 'Edit Units',
                  aclKey: 'CBS_MEMBERS_MEMBER',
                  action: 'VIEW',
                  onClick: () => {
                    router.push(
                      `${ROUTES?.INVENTORY_ITEMS_UNIT_LIST}?id=${props?.row?.original?.node?.id}`
                    );
                    onOpenModalUnits();
                  },
                },
              ]}
            />
          ),
        meta: {
          width: '20px',
        },
      },
    ],
    [t]
  );
  const { data: unitsData } = useGetUnitsFormStateDetailsQuery({
    id: idUnits as string,
  });

  useEffect(() => {
    if (unitsData && idUnits) {
      const editValueData = unitsData?.inventory?.unitOfMeasure?.getUnitDetails?.data;

      if (editValueData) {
        const newData = {
          name: editValueData?.unitName,
          shortName: editValueData?.shortName,
          description: editValueData?.description,
          acceptFraction: null,
        };
        reset({
          ...(newData as unknown as InvUnitOfMeasureInput),
        });
      }
    }
  }, [unitsData, idUnits, reset]);

  const pageHeaderHandler = async () => {
    await router.push({ query: {} });
    onOpenModalUnits();
  };

  return (
    <>
      <PageHeader heading="Units" buttonTitle="New Unit Add" onClick={pageHeaderHandler} button />

      <Table
        isLoading={isFetching}
        data={rowItems}
        columns={columns}
        rowOnClick={(row) => {
          router.push(`${ROUTES.INVENTORY_ITEMS_UNIT_LIST}?id=${row?.node?.id}`);
          onOpenDetailsModal();
        }}
      />
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
      <UnitsDetailsModal
        isDetailModalOpen={openDetailModal}
        handleDetailClose={onCloseDetailsModal}
      />
    </>
  );
};
