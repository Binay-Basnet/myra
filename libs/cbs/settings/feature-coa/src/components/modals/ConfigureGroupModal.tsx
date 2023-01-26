import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { UseDisclosureReturn } from '@chakra-ui/hooks';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, GridItem, Modal } from '@myra-ui/components';
import { Grid } from '@myra-ui/foundations';

import {
  CoaAccountClass,
  CoaTypeOfTransaction,
  InputMaybe,
  NewCoaGroupInput,
  useAddGroupMutation,
  useGetCoaFullViewQuery,
} from '@coop/cbs/data-access';
import { FormInput, FormSelect, FormSwitchTab } from '@coop/shared/form';

import { CoaTree } from '../../types';

interface IConfigureGroupProps {
  clickedAccount: CoaTree | null;
  modalProps: UseDisclosureReturn;
}

export const ConfigureGroupModal = ({ clickedAccount, modalProps }: IConfigureGroupProps) => {
  const queryClient = useQueryClient();
  const methods = useForm<NewCoaGroupInput>();
  const { mutateAsync: configureGroup } = useAddGroupMutation();

  const { isOpen, onClose, onToggle } = modalProps;

  const { data: coaFullView } = useGetCoaFullViewQuery();

  const underAccounts = coaFullView?.settings?.chartsOfAccount?.fullView.data?.map((d) => ({
    label: d?.name.en as string,
    value: d?.accountCode as string,
  }));

  useEffect(() => {
    methods.reset({
      groupName: clickedAccount?.name?.en,
      underAccountCode: clickedAccount?.under,
      accountClass: clickedAccount?.accountClass as InputMaybe<CoaAccountClass> | undefined,
      accountCode: clickedAccount?.id,
      typeOfTransaction: clickedAccount?.transactionAllowed,
      allowedBalance: clickedAccount?.allowedBalance,
      allowDirectPostingFromJV: clickedAccount?.allowDirectPostingFromJV,
      allowMultipleLedger: clickedAccount?.allowMultipleLedger,
    });
  }, [clickedAccount?.id]);

  return (
    <Modal
      width="2xl"
      title="Configure Group"
      primaryButtonLabel="Save"
      open={isOpen}
      onClose={onClose}
      primaryButtonHandler={async () => {
        await asyncToast({
          id: 'add-group',
          msgs: {
            success: 'Group Added Successfully',
            loading: 'Adding Group',
          },
          onSuccess: () => {
            queryClient.refetchQueries(['getCoaFullView']);
            onToggle();
          },
          promise: configureGroup({
            data: { ...methods.getValues(), category: clickedAccount?.category },
          }),
        });
      }}
    >
      <Grid templateColumns="repeat(2, 1fr)" rowGap="s16" columnGap="s20">
        <FormProvider {...methods}>
          <FormInput name="groupName" label="Group Name" />

          <FormSelect
            id="underAccountCode"
            name="underAccountCode"
            isDisabled
            label="Under"
            options={underAccounts}
          />

          <FormSelect
            id="type"
            name="accountClass"
            isDisabled
            label="Account Class"
            options={[
              {
                label: 'Equity and Liabilities',
                value: 'EQUITY_AND_LIABILITIES',
              },
              {
                label: 'Assets',
                value: 'ASSETS',
              },
              {
                label: 'Expenditure',
                value: 'EXPENDITURE',
              },
              {
                label: 'Income',
                value: 'INCOME',
              },
            ]}
          />

          <FormInput isDisabled name="accountCode" label="Account Code" />

          {clickedAccount?.children.length === 0 && (
            <>
              <GridItem colSpan={2}>
                <FormSwitchTab
                  options={[
                    { label: 'Debit', value: CoaTypeOfTransaction.Debit },
                    { label: 'Credit', value: CoaTypeOfTransaction.Credit },
                    { label: 'Both', value: CoaTypeOfTransaction.Both },
                  ]}
                  name="typeOfTransaction"
                  label="Type of Transaction"
                />
              </GridItem>
              <GridItem colSpan={2}>
                <FormSwitchTab
                  options={[
                    { label: 'Debit', value: CoaTypeOfTransaction.Debit },
                    { label: 'Credit', value: CoaTypeOfTransaction.Credit },
                    { label: 'Both', value: CoaTypeOfTransaction.Both },
                  ]}
                  name="allowedBalance"
                  label="Allowed Balance"
                />
              </GridItem>
              <GridItem colSpan={2}>
                <FormSwitchTab
                  options={[
                    { label: 'Yes', value: true },
                    { label: 'No', value: false },
                  ]}
                  name="allowMultipleLedger"
                  label="Allow Multiple Ledger"
                />
              </GridItem>
              <GridItem colSpan={2}>
                <FormSwitchTab
                  options={[
                    { label: 'Yes', value: true },
                    { label: 'No', value: false },
                  ]}
                  name="allowDirectPostingFromJV"
                  label="Allow Direct Posting From Journal Voucher"
                />
              </GridItem>
            </>
          )}
        </FormProvider>
      </Grid>
    </Modal>
  );
};
