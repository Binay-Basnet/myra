import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BsThreeDots } from 'react-icons/bs';
import { IconButton } from '@chakra-ui/react';

import { InventoryPageHeader } from '@coop/myra/inventory/ui-layout';
import { useGetInventoryItemsQuery } from '@coop/shared/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { Box, Column, Modal, Table, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const InventoryItemCategoryTable = () => {
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
        Header: t['catgName'],
        accessor: 'node.name',
        width: '70%',
      },
      {
        Header: t['catgParentCategory'],
        accessor: 'node.type',
      },

      {
        Header: t['catgDescriptional'],
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

  const NewItemCategoryModal = () => {
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
            {t['catgAddNewCatgModal']}
          </Text>
        }
      >
        <FormProvider {...methods}>
          <form>
            <Box p="s16" display="flex" flexDirection="column" gap="s24">
              <FormInput
                type="text"
                name="name"
                label={t['catgItemGroupName']}
                placeholder={t['catgItemGroupName']}
              />
              <FormSelect
                name="group"
                label={t['catgUnderItemGroup']}
                placeholder={t['catgSelectItemGroup']}
                options={[
                  {
                    label: '1',
                    value: '1',
                  },
                  {
                    label: '2',
                    value: '2',
                  },
                  {
                    label: '3',
                    value: '3',
                  },
                ]}
              />
              <FormInput
                type="text"
                name="name"
                label={t['catgDescription']}
                placeholder={t['catgDescription']}
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
        heading="catgItemsCategory"
        buttonLabel="catgNewItemCategory"
        buttonHandler={() => onOpenModal()}
      />
      <NewItemCategoryModal />
      <Table
        isLoading={isFetching}
        data={rowItems}
        columns={columns}
        sort={true}
      />
    </>
  );
};
