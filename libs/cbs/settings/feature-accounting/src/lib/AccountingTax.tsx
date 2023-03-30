import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import {
  asyncToast,
  Box,
  Column,
  FormHeader,
  Grid,
  GridItem,
  Modal,
  Table,
  TablePopover,
} from '@myra-ui';

import {
  AccountingTaxRate,
  useGetAllAccountingTaxesQuery,
  useGetNewIdMutation,
  useSetAccountingNewTaxMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormInput, FormSwitch } from '@coop/shared/form';

export const AccountingTaxSettings = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const methods = useForm();
  const { reset } = methods;
  const { data: taxData } = useGetAllAccountingTaxesQuery();

  const rowData = taxData?.settings?.general?.accounting?.taxRates ?? [];

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Name',
        accessorFn: (row) => row?.name,
        meta: {
          width: '80%',
        },
      },
      {
        header: 'Rate',
        accessorFn: (row) => row?.rate,
      },

      {
        id: '_actions',
        header: '',

        cell: (props) =>
          props?.row?.original && (
            <TablePopover
              node={props?.row?.original}
              items={[
                {
                  title: 'Edit Tax',
                  aclKey: 'CBS_MEMBERS_MEMBER',
                  action: 'VIEW',
                  onClick: () => {
                    router.push(
                      `${ROUTES?.SETTINGS_GENERAL_ACCOUNTING_TAX}?id=${props?.row?.original?.id}`
                    );
                    onOpen();
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
    []
  );

  const { mutateAsync: newIDMutate } = useGetNewIdMutation();

  const { mutateAsync: setTax } = useSetAccountingNewTaxMutation();

  const id = router?.query['id'];

  const handleSave = () => {
    const values = methods.getValues();

    asyncToast({
      id: 'accounting-add-tax',
      promise: setTax({
        id: id as string,
        data: {
          ...values,
        },
      }),
      msgs: {
        loading: 'Adding Tax',
        success: 'Tax Added',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getAllAccountingTaxes']);
        onClose();
        // router.push('/accounting/investment/investment-transaction/list');
      },
    });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (taxData) {
      const editValueData = taxData?.settings?.general?.accounting?.taxRates?.find(
        (d) => d?.id === id
      );

      if (editValueData) {
        const newData = {
          taxName: editValueData?.name,
          rate: editValueData?.rate,
          default: editValueData?.default,
        };
        reset({
          ...(newData as unknown as AccountingTaxRate),
        });
      }
    }
  }, [taxData, id, reset]);

  return (
    <>
      <Box border="1px" borderRadius="br2" borderColor="gray.100" minH="fit-content" pb="60px">
        <FormHeader
          title="Tax Rates"
          buttonLabel="New Tax"
          buttonHandler={() => {
            newIDMutate({}).then((res) =>
              router.push(`${ROUTES?.SETTINGS_GENERAL_ACCOUNTING_TAX}?id=${res?.newId}`)
            );
            onOpen();
          }}
        />
        <Box px="s16">
          <Table columns={columns} data={rowData} variant="simple" isStatic />
        </Box>
      </Box>
      <Modal
        title="Add Tax"
        open={isOpen}
        onClose={onClose}
        primaryButtonLabel="Save"
        primaryButtonHandler={handleSave}
      >
        <FormProvider {...methods}>
          <Grid templateColumns="repeat(2, 1fr)" rowGap="s16" columnGap="s20">
            <GridItem colSpan={2}>
              <FormInput type="text" name="taxName" label="Name" />
            </GridItem>

            <GridItem colSpan={2}>
              <FormInput type="number" name="rate" label="Rate" />
            </GridItem>
            <FormSwitch name="default" label="Make default" />
          </Grid>
        </FormProvider>
      </Modal>
    </>
  );
};
