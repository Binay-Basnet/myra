import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BsThreeDots } from 'react-icons/bs';
import { IconButton } from '@chakra-ui/react';

import { InventoryPageHeader } from '@coop/myra/inventory/ui-layout';
import { useGetInventoryItemsQuery } from '@coop/shared/data-access';
import { FormInput, FormSwitch } from '@coop/shared/form';
import { Box, Column, Modal, Table, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const InventoryItemUnitsTable = () => {
  const { t } = useTranslation();
  const methods = useForm({});
  const { data, isFetching } = useGetInventoryItemsQuery();

  const rowItems = data?.inventory.items?.list?.edges ?? [];

  const [openModal, setOpenModal] = useState(false);

  const onOpenModal = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const columns = useMemo<Column<typeof rowItems[0]>[]>(
    () => [
      {
        Header: t['itemUnitName'],
        accessor: 'node.name',
        width: '70%',
      },
      {
        Header: t['itemUnitShortname'],
        accessor: 'node.type',
      },

      {
        Header: t['itemUnitAcceptFraction'],
        accessor: 'node.unitPrice',
        width: '20%',
      },
      {
        accessor: 'actions',
        Cell: () => (
          <IconButton
            variant="ghost"
            aria-label="Search database"
            icon={<BsThreeDots />}
          />
        ),
      },
    ],
    [t]
  );

  const NewItemUnitModal = () => {
    return (
      <Modal
        open={openModal}
        onClose={onCloseModal}
        isCentered={true}
        title={
          <Text
            fontSize="r2"
            color="neutralColorLight.Gray-80"
            fontWeight="SemiBold"
          >
            {t['itemUnitAddNewUnit']}
          </Text>
        }
      >
        <FormProvider {...methods}>
          <form>
            <Box display="flex" flexDirection="column" gap="s24">
              <FormInput
                type="text"
                name="name"
                label={t['itemUnitFormName']}
                placeholder={t['itemUnitFormName']}
              />
              <FormInput
                type="text"
                name="shortName"
                label={t['itemUnitFormShortName']}
                placeholder={t['itemUnitFormShortName']}
              />
              <FormInput
                type="text"
                name="description"
                label={t['itemUnitFormDescription']}
                placeholder={t['itemUnitFormDescription']}
              />
              <FormSwitch
                name="acceptFraction"
                label={t['itemUnitFormAcceptsFraction']}
              />
            </Box>
          </form>
        </FormProvider>
      </Modal>
    );
  };

  return (
    <>
      <InventoryPageHeader
        heading="itemUnitUnits"
        buttonLabel="itemUnitNewUnit"
        buttonHandler={() => onOpenModal()}
      />
      <NewItemUnitModal />
      <Table
        isLoading={isFetching}
        data={rowItems}
        columns={columns}
        sort={true}
      />
    </>
  );
};
