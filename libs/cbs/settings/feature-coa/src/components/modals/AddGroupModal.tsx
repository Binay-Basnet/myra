import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { UseDisclosureReturn } from '@chakra-ui/hooks';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, GridItem, Modal } from '@myra-ui/components';
import { Box, Grid } from '@myra-ui/foundations';

import {
  CoaAccountClass,
  CoaAccountSetup,
  CoaTypeOfTransaction,
  InputMaybe,
  NewCoaGroupInput,
  useAddGroupMutation,
  useGetCoaFullViewQuery,
} from '@coop/cbs/data-access';
import {
  FormBranchSelect,
  FormInput,
  FormRadioGroup,
  FormSelect,
  FormSwitchTab,
} from '@coop/shared/form';

import { CoaTree } from '../../types';
import { FullViewData, getNewAccountCode } from '../../utils/getNewAccountCode';

interface IAddGroupModalProps {
  clickedAccount: CoaTree | null;
  modalProps: UseDisclosureReturn;
}

export const AddGroupModal = ({ clickedAccount, modalProps }: IAddGroupModalProps) => {
  const queryClient = useQueryClient();
  const methods = useForm<
    Omit<NewCoaGroupInput, 'openForBranches'> & {
      openForBranches: { label: string; value: string }[];
    }
  >();
  const { watch, reset } = methods;
  const { isOpen, onClose, onToggle } = modalProps;

  const { mutateAsync: addGroup } = useAddGroupMutation();
  const { data: coaFullView } = useGetCoaFullViewQuery();

  const underAccounts = coaFullView?.settings?.chartsOfAccount?.fullView.data?.map((d) => ({
    label: d?.name.en as string,
    value: d?.accountCode as string,
  }));

  const coaFullViewData = coaFullView?.settings?.chartsOfAccount?.fullView?.data;

  const newCode = getNewAccountCode(
    coaFullViewData as FullViewData[],
    clickedAccount?.id as string
  );

  const isAccountOpenForSelectedBranch = watch('accountSetup') === CoaAccountSetup.SelectedBranch;

  useEffect(() => {
    methods.reset({
      underAccountCode: clickedAccount?.id,
      accountClass: clickedAccount?.accountClass as InputMaybe<CoaAccountClass> | undefined,
      accountCode: newCode,
      typeOfTransaction: CoaTypeOfTransaction.Debit,
      allowedBalance: CoaTypeOfTransaction.Debit,
      allowDirectPostingFromJV: clickedAccount?.allowDirectPostingFromJV,
      allowMultipleLedger: clickedAccount?.allowMultipleLedger,
    });
  }, [clickedAccount?.id]);

  useEffect(() => {
    if (!isAccountOpenForSelectedBranch) {
      reset({ openForBranches: undefined });
    }
  }, [isAccountOpenForSelectedBranch]);

  return (
    <Modal
      width="2xl"
      title="Add Group"
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
            queryClient.invalidateQueries(['getCoaFullView']);
            onToggle();
          },
          promise: addGroup({
            data: {
              ...methods.getValues(),
              underAccountCode: clickedAccount?.id,
              openForBranches: methods?.getValues()?.openForBranches?.map((item) => item?.value),
            },
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
          {clickedAccount?.children?.length === 0 && (
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
              <GridItem colSpan={2}>
                <FormRadioGroup
                  name="accountSetup"
                  label="Account Setup"
                  direction="column"
                  options={[
                    {
                      label: 'Open Account for this Service Center',
                      value: CoaAccountSetup.ThisBranch,
                    },
                    {
                      label: 'Open Account for all Service Center',
                      value: CoaAccountSetup.AllBranch,
                    },
                    {
                      label: 'Open Account for selected Service Center',
                      value: CoaAccountSetup.SelectedBranch,
                    },
                  ]}
                />
                {isAccountOpenForSelectedBranch && (
                  <Box mt="s32" width={280}>
                    <FormBranchSelect
                      name="openForBranches"
                      label="Select Service Center"
                      isMulti
                    />
                  </Box>
                )}
              </GridItem>
            </>
          )}
        </FormProvider>
      </Grid>
    </Modal>
  );
};
