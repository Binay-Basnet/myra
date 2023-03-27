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

import { useGetUnitsListQuery, useSetUnitsMutation } from '@coop/cbs/data-access';
import { FormInput, FormSwitch } from '@coop/shared/form';
import { getPaginationQuery, useTranslation } from '@coop/shared/utils';

export const InventoryItemUnitsTable = () => {
  const [openModalUnits, setOpenModalUnits] = useState(false);

  const queryClient = useQueryClient();

  const unitMethods = useForm();

  const { getValues: unitsValues, handleSubmit: unitHandleSubmit } = unitMethods;

  const { mutateAsync: unitMutate } = useSetUnitsMutation();

  const onOpenModalUnits = () => {
    setOpenModalUnits(true);
  };

  const onCloseModalUnits = () => {
    setOpenModalUnits(false);
  };

  const unitOnSubmit = () => {
    unitMutate({ data: { ...unitsValues() } }).then(() => {
      queryClient.invalidateQueries(['getUnitsList']);
      onCloseModalUnits();
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
      <Modal isOpen={openModalUnits} onClose={onCloseModalUnits} isCentered trapFocus={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize="r2" color="neutralColorLight.Gray-80" fontWeight="SemiBold">
              {t['itemUnitAddNewUnit']}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormProvider {...unitMethods}>
              <form onSubmit={unitHandleSubmit(unitOnSubmit)}>
                <Box display="flex" flexDirection="column" gap="s24">
                  <FormInput type="text" name="name" label={t['itemUnitFormName']} />
                  <FormInput type="text" name="shortName" label={t['itemUnitFormShortName']} />
                  <FormInput type="text" name="description" label={t['itemUnitFormDescription']} />
                  <FormSwitch name="acceptFraction" label={t['itemUnitFormAcceptsFraction']} />
                  <Button w="-webkit-fit-content" type="submit" alignSelf="flex-end">
                    Add Unit
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
