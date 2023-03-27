import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BsThreeDots } from 'react-icons/bs';
import {
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import { Box, Button, Column, PageHeader, Table, Text } from '@myra-ui';

import { useGetItemCategoryListQuery, useSetItemCategoryMutation } from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { getPaginationQuery, useTranslation } from '@coop/shared/utils';

export const InventoryItemCategoryTable = () => {
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const itemCategoryMethods = useForm();

  const { getValues: itemCategoryValues, handleSubmit: itemCategoryHandleSubmit } =
    itemCategoryMethods;

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

  // const inventoryColumns = [
  //   {
  //     title: 'itemsList',
  //     link: '/inventory/items/list',
  //   },
  //   {
  //     title: 'itemsCategory',
  //     link: '/inventory/items/category/list',
  //     modalOpen: onOpenModal,
  //   },
  //   {
  //     title: 'itemUnits',
  //     link: '/inventory/items/units/list',
  //     modalOpen: onOpenModalUnits,
  //   },
  // ];

  const onItemCategorySubmit = () => {
    itemCategoryMutate({ data: { ...itemCategoryValues() } }).then(() => {
      queryClient.invalidateQueries(['getItemCategoryList']);
      onCloseModal();
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
      <Modal isOpen={openModal} onClose={onCloseModal} isCentered trapFocus={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize="r2" color="neutralColorLight.Gray-80" fontWeight="SemiBold">
              {t['catgAddNewCatgModal']}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormProvider {...itemCategoryMethods}>
              <form onSubmit={itemCategoryHandleSubmit(onItemCategorySubmit)}>
                <Box display="flex" flexDirection="column" gap="s24">
                  <FormInput type="text" name="name" label={t['catgItemGroupName']} />
                  <FormSelect
                    name="parentCategory"
                    label={t['catgUnderItemGroup']}
                    __placeholder={t['catgSelectItemGroup']}
                    options={underItemGroup}
                  />
                  <FormInput type="text" name="description" label={t['catgDescription']} />
                  <Button w="-webkit-fit-content" type="submit" alignSelf="flex-end">
                    {t['catgAddItemGroup']}
                  </Button>
                </Box>
              </form>
            </FormProvider>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
