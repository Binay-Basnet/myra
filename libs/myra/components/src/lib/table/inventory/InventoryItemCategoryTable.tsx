import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BsThreeDots } from 'react-icons/bs';
import { IconButton } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, Column, Modal, PageHeader, Table } from '@myra-ui';

import { useGetItemCategoryListQuery, useSetItemCategoryMutation } from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { getPaginationQuery, useTranslation } from '@coop/shared/utils';

export const InventoryItemCategoryTable = () => {
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const methods = useForm();
  const handleUpdateModalClose = () => {
    methods.reset({
      name: null,
      parentCategory: null,
      description: null,
    });
  };

  const { data } = useGetItemCategoryListQuery({
    pagination: {
      ...getPaginationQuery(),
      first: 20,
      order: {
        arrange: 'ASC',
        column: 'ID',
      },
    },
  });

  const { mutateAsync: itemCategoryMutate } = useSetItemCategoryMutation();

  const underItemGroup = data?.inventory?.itemsGroup?.list?.edges?.map((item) => ({
    value: item?.node?.id,
    label: item?.node?.name,
  })) as { value: string; label: string }[];

  const onOpenModal = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };
  const handleSubmit = () => {
    const values = methods.getValues();

    asyncToast({
      id: 'inventory-add-category',
      promise: itemCategoryMutate({
        data: {
          ...values,
        },
      }),
      msgs: {
        loading: 'Adding Item Category',
        success: 'Item Category Added Successfully',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getItemCategoryList']);
        handleUpdateModalClose();
        onCloseModal();

        // router.push('/accounting/investment/investment-transaction/list');
      },
    });
  };

  const { data: tableData, isFetching } = useGetItemCategoryListQuery({
    pagination: getPaginationQuery(),
  });

  const rowItems = tableData?.inventory?.itemsGroup?.list?.edges ?? [];

  const columns = useMemo<Column<typeof rowItems[0] | any>[]>(
    () => [
      {
        header: t['catgName'],
        accessorKey: 'node.name',
      },
      {
        header: t['catgParentCategory'],
        accessorKey: 'node.description',
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
      <PageHeader
        heading="Item Category"
        buttonTitle="New Item Category"
        onClick={onOpenModal}
        button
      />

      <Table isLoading={isFetching} data={rowItems} columns={columns} />
      <Modal
        open={openModal}
        onClose={onCloseModal}
        title="Add Item Category"
        primaryButtonLabel="Add"
        primaryButtonHandler={handleSubmit}
        onCloseComplete={handleUpdateModalClose}
      >
        <FormProvider {...methods}>
          <Box display="flex" flexDirection="column" gap="s24">
            <FormInput type="text" name="name" label={t['catgItemGroupName']} />
            <FormSelect
              name="parentCategory"
              menuPosition="fixed"
              label={t['catgUnderItemGroup']}
              __placeholder={t['catgSelectItemGroup']}
              options={underItemGroup}
            />
            <FormInput type="text" name="description" label={t['catgDescription']} />
          </Box>
        </FormProvider>
      </Modal>
    </>
  );
};
