import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineSetting } from 'react-icons/ai';
import { MdOutlineCircle } from 'react-icons/md';
import { useRouter } from 'next/router';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { useDisclosure } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, Button, ButtonProps, Grid, GridItem, Icon, Modal, Text } from '@myra-ui';

import {
  CoaAccountClass,
  CoaAccountSetup,
  CoaCategory,
  CoaTypeOfTransaction,
  CoaTypesOfAccount,
  InputMaybe,
  NewCoaGroupInput,
  useAddAccountInCoaMutation,
  useAddGroupMutation,
  useDeleteCoaMutation,
  useGetCoaFullViewQuery,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormInput, FormRadioGroup, FormSelect, FormSwitchTab } from '@coop/shared/form';

import NodeWrapper from './NodeWrapper';
import { CoaTree } from '../../types';

type FullViewData = {
  id: string;
  name: Record<'en' | 'local' | 'np', string>;
  under?: string;
  accountType: CoaTypesOfAccount;
  accountClass: string;
  accountCode: string;
};
const getNewAccountCode = (coaFullViewData: FullViewData[], under: string) => {
  const foundAccount = coaFullViewData?.find((d) => d.under === under);

  if (!foundAccount) {
    return `${under}.1`;
  }

  const childAccount =
    coaFullViewData
      .filter((d) => d.under === foundAccount.under)
      .sort((a, b) =>
        Number(
          a?.accountCode?.localeCompare(b?.accountCode as string, undefined, {
            numeric: true,
            sensitivity: 'base',
          })
        )
      ) ?? [];

  const accountCode = childAccount[childAccount.length - 1]?.accountCode;
  const accountCodeArray = accountCode.split('.');
  const lastCode = accountCodeArray.pop();

  return `${accountCodeArray.join('.')}.${Number(lastCode) + 1}`;
};

interface ITestProps {
  data: CoaTree;
}

const LeafNode = ({ data }: ITestProps) => {
  const router = useRouter();

  const methods = useForm<NewCoaGroupInput>();

  const [clickedAccount, setClickedAccount] = useState<CoaTree | null>(null);

  const queryClient = useQueryClient();

  const { data: coaFullView, isFetching } = useGetCoaFullViewQuery();

  const { mutateAsync: deleteCOA } = useDeleteCoaMutation();
  const coaFullViewData = coaFullView?.settings?.chartsOfAccount?.fullView?.data;

  const newCode = getNewAccountCode(
    coaFullViewData as FullViewData[],
    clickedAccount?.id as string
  );

  useEffect(() => {
    methods.reset({
      underAccountCode: clickedAccount?.under,
      accountClass: clickedAccount?.accountClass as CoaAccountClass,
      accountCode: newCode,
      typeOfTransaction: CoaTypeOfTransaction.Debit,
      allowedBalance: CoaTypeOfTransaction.Debit,
    });
  }, [clickedAccount?.id, isFetching]);

  return (
    <NodeWrapper>
      <Box
        display="flex"
        gap="s4"
        ml="-3px"
        alignItems="center"
        cursor="pointer"
        transition="all 0.1s ease-in-out"
        _hover={{
          px: 's4',
          bg: 'highlight.500',
        }}
      >
        <Icon size="sm" as={MdOutlineCircle} color="gray.500" />
        <Box
          display="flex"
          alignItems="center"
          gap="s8"
          py="s4"
          w="100%"
          role="group"
          color={data?.category === CoaCategory.UserDefined ? 'info.500' : 'inherit'}
        >
          <Text fontWeight="bold" fontSize="14px">
            {data.accountCode}
          </Text>
          <Text
            fontWeight="400"
            fontSize="14px"
            onClick={() =>
              router.push(`${ROUTES.SETTINGS_GENERAL_COA_DETAILS}?id=${data.accountCode}`)
            }
          >
            {data.name?.local}
          </Text>

          <AddGroup
            data={data}
            clickedAccount={clickedAccount}
            setClickedAccount={setClickedAccount}
          />

          <AddAccount
            data={data}
            clickedAccount={clickedAccount}
            setClickedAccount={setClickedAccount}
          />

          <ConfigureGroup
            data={data}
            clickedAccount={clickedAccount}
            setClickedAccount={setClickedAccount}
          />

          {data?.category === 'USER_DEFINED' ? (
            <LeafNodeButton
              shade="danger"
              gap="s8"
              leftIcon={<Icon as={DeleteIcon} w="14px" h="14px" />}
              onClick={async () => {
                await asyncToast({
                  id: 'delete-coa',
                  msgs: {
                    loading: 'Deleting',
                    success: 'Deleted Successfully',
                  },
                  promise: deleteCOA({ id: data?.id as string }),
                  onSuccess: () => queryClient.invalidateQueries(['getCoaFullView']),
                });
              }}
            >
              Delete Account
            </LeafNodeButton>
          ) : null}
        </Box>
      </Box>
    </NodeWrapper>
  );
};

interface IAddGroupProps {
  data: CoaTree;
  clickedAccount: CoaTree | null;
  setClickedAccount: React.Dispatch<React.SetStateAction<CoaTree | null>>;
}

export const AddGroup = ({ clickedAccount, setClickedAccount, data }: IAddGroupProps) => {
  const queryClient = useQueryClient();
  const methods = useForm<NewCoaGroupInput>();
  const { isOpen, onClose, onToggle } = useDisclosure();

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

  useEffect(() => {
    methods.reset({
      underAccountCode: clickedAccount?.id,
      accountClass: clickedAccount?.accountClass as InputMaybe<CoaAccountClass> | undefined,
      accountCode: newCode,
      typeOfTransaction: CoaTypeOfTransaction.Debit,
      allowedBalance: CoaTypeOfTransaction.Debit,
    });
  }, [clickedAccount?.id]);

  return (
    <>
      <LeafNodeButton
        leftIcon={<Icon as={AddIcon} w="14px" h="14px" />}
        onClick={() => {
          onToggle();
          setClickedAccount(data);
        }}
      >
        Add Group
      </LeafNodeButton>
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
              data: { ...methods.getValues(), underAccountCode: clickedAccount?.id },
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
              <FormRadioGroup
                name="accountSetup"
                label="Account Setup"
                direction="row"
                options={[
                  { label: 'Open Account for this Branch', value: CoaAccountSetup.ThisBranch },
                  { label: 'Open Account for all Branch', value: CoaAccountSetup.AllBranch },
                ]}
              />
            </GridItem>
          </FormProvider>
        </Grid>
      </Modal>
    </>
  );
};

interface IConfigureGroupProps {
  data: CoaTree;
  clickedAccount: CoaTree | null;
  setClickedAccount: React.Dispatch<React.SetStateAction<CoaTree | null>>;
}

export const ConfigureGroup = ({
  clickedAccount,
  setClickedAccount,
  data,
}: IConfigureGroupProps) => {
  const queryClient = useQueryClient();
  const methods = useForm<NewCoaGroupInput>();
  const { mutateAsync: configureGroup } = useAddGroupMutation();

  const { isOpen, onClose, onToggle } = useDisclosure();

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
    });
  }, [clickedAccount?.id]);

  return (
    <>
      <LeafNodeButton
        leftIcon={<Icon as={AiOutlineSetting} size="lg" />}
        onClick={() => {
          onToggle();
          setClickedAccount(data);
        }}
      >
        Configure
      </LeafNodeButton>
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
          </FormProvider>
        </Grid>
      </Modal>
    </>
  );
};

interface IAddAccountProps {
  data?: CoaTree;
  clickedAccount: CoaTree | null;
  setClickedAccount?: React.Dispatch<React.SetStateAction<CoaTree | null>>;
  isGrouped?: boolean;
}

export const AddAccount = ({
  data,
  clickedAccount,
  setClickedAccount,
  isGrouped = true,
}: IAddAccountProps) => {
  const methods = useForm<{ accountSetup: CoaAccountSetup; parentAccountCode: string }>();
  const queryClient = useQueryClient();
  const { isOpen, onClose, onToggle } = useDisclosure();

  const { mutateAsync: addNewAccount } = useAddAccountInCoaMutation();

  return (
    <>
      <LeafNodeButton
        onClick={() => {
          setClickedAccount && data && setClickedAccount(data);
          onToggle();
        }}
        leftIcon={<Icon as={AddIcon} w="14px" h="14px" />}
        display={isGrouped ? 'none' : 'flex'}
      >
        Add Account
      </LeafNodeButton>

      <Modal
        open={isOpen}
        onClose={onClose}
        title="Add Account"
        primaryButtonLabel="Save"
        primaryButtonHandler={async () => {
          await asyncToast({
            id: 'add-group',
            msgs: {
              success: 'Account Added Successfully',
              loading: 'Adding New Account',
            },
            onSuccess: () => {
              queryClient.refetchQueries(['getCoaFullView']);
              queryClient.invalidateQueries(['getCOALeafNodeDetails']);
              onToggle();
            },
            promise: addNewAccount({
              accountSetup: methods.getValues().accountSetup,
              parentAccountCode: clickedAccount?.id as string,
            }),
          });
        }}
      >
        <FormProvider {...methods}>
          <FormRadioGroup
            name="accountSetup"
            direction="row"
            options={[
              { label: 'Open Account for this Branch', value: CoaAccountSetup.ThisBranch },
              { label: 'Open Account for all Branch', value: CoaAccountSetup.AllBranch },
            ]}
          />
        </FormProvider>
      </Modal>
    </>
  );
};

export const LeafNodeButton = (props: ButtonProps) => (
  <Button
    variant="link"
    py="0"
    lineHeight="0"
    gap="s8"
    display="none"
    _groupHover={{ display: 'flex' }}
    {...props}
  />
);

export default LeafNode;
