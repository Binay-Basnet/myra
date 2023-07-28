import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import {
  asyncToast,
  Box,
  Button,
  DetailPageHeader,
  Grid,
  Modal,
  Scrollable,
  Text,
  WIPState,
} from '@myra-ui';

import {
  useAddTagToLedgerMutation,
  useChangeLedgerParentMutation,
  useUpdateLedgerNameMutation,
} from '@coop/cbs/data-access';
import { COADetailSidebar } from '@coop/cbs/settings/ui-layout';
import { ROUTES } from '@coop/cbs/utils';
import { FormInput, FormLeafCoaHeadSelect, FormLedgerTagSelect } from '@coop/shared/form';

import { Overview, Transactions } from '../components/detail-tabs';
import { useCOAAccountDetails } from '../hooks';

export const COAAccountDetail = () => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const { id } = router.query;

  const tabQuery = router.query['tab'] as string;

  const { accountDetails } = useCOAAccountDetails();

  const { isOpen, onClose, onToggle } = useDisclosure();

  const methods = useForm();

  const { mutateAsync: updateLedgerName } = useUpdateLedgerNameMutation();

  const handleEdit = () => {
    asyncToast({
      id: 'update-ledger-name',
      msgs: {
        loading: 'Updating ledger name',
        success: 'Ledger name updated',
      },
      promise: updateLedgerName({
        ledgerId: id as string,
        newName: methods?.getValues()?.['newName'],
      }),
      onSuccess: () => {
        queryClient.invalidateQueries(['getCOAAccountDetails']);
        handleUpdateModalClose();
      },
    });
  };

  const handleUpdateModalOpen = () => {
    methods.setValue('newName', accountDetails?.meta?.accountName);
    onToggle();
  };

  const handleUpdateModalClose = () => {
    methods.reset({ newName: '' });
    onClose();
  };

  const {
    isOpen: isAssignTagModalOpen,
    onClose: onAssignTagModalClose,
    onToggle: onAssignTagModalToggle,
  } = useDisclosure();

  const {
    isOpen: isChangeParentOpen,
    onClose: onChangeParentClose,
    onToggle: onChangeParentToggle,
  } = useDisclosure();

  const assignTagMethods = useForm();

  const { mutateAsync: assignTag } = useAddTagToLedgerMutation();

  const handleAssignTag = () => {
    asyncToast({
      id: 'coa-assign-tag-to-ledger',
      msgs: {
        loading: 'Assigning tag',
        success: 'Tag assigned',
      },
      promise: assignTag({
        ledgerId: id as string,
        tagId: assignTagMethods.getValues()?.['tagId']?.map((tag: { value: string }) => tag?.value),
      }),
      onSuccess: () => {
        assignTagMethods.reset({});
        onAssignTagModalClose();
      },
    });
  };

  const changeParentMethods = useForm();

  const { mutateAsync: changeLedgerParent } = useChangeLedgerParentMutation();

  const handleChangeLedgerParent = () => {
    asyncToast({
      id: 'coa-change-ledger-parent',
      msgs: {
        loading: 'Changing ledger parent',
        success: 'Ledger parent changed',
      },
      promise: changeLedgerParent({
        ledgerId: id as string,
        newCOALeaf: changeParentMethods?.getValues()?.['newCOALeaf'],
      }),
      onSuccess: () => {
        queryClient.invalidateQueries(['getCOAAccountDetails']);
        handleChangeLedgerParentClose();
      },
    });
  };

  const handleChangeLedgerParentClose = () => {
    methods.reset({ newCOALeaf: '' });
    onChangeParentClose();
  };

  const options = useMemo(() => {
    const tempOptions = [
      { label: 'Edit Ledger Name', handler: handleUpdateModalOpen },
      { label: 'Assign Tag', handler: onAssignTagModalToggle },
    ];

    if (!['30', '110']?.includes(accountDetails?.meta?.parentId?.split('.')[0] as string)) {
      tempOptions.push({ label: 'Change Ledger Parent', handler: onChangeParentToggle });
    }

    return tempOptions;
  }, [accountDetails]);

  return (
    <>
      <DetailPageHeader
        title="Charts of Accounts"
        name={
          <Link
            href={
              accountDetails?.meta?.isSavingAccount
                ? `${ROUTES.CBS_ACCOUNT_SAVING_DETAILS}?id=${
                    accountDetails?.meta?.accountId?.split('-')[1]
                  }`
                : accountDetails?.meta?.isLoanAccount
                ? `${ROUTES.CBS_LOAN_ACCOUNTS_DETAILS}?id=${
                    accountDetails?.meta?.accountId?.split('-')[1]
                  }`
                : `${ROUTES.CBS_TRANS_ALL_LEDGERS_DETAIL}?id=${
                    accountDetails?.meta?.accountId?.split('-')[0]
                  }`
            }
            target="_blank"
            rel="noreferer"
          >
            <Text
              fontSize="r2"
              fontWeight="Medium"
              color="gray.800"
              lineHeight="150%"
              cursor="pointer"
            >
              {accountDetails?.meta?.accountName}
            </Text>
          </Link>
        }
        options={options}
      />
      <Box display="flex">
        <Box
          w="320px"
          position="fixed"
          h="calc(100vh - 110px)"
          borderRight="1px"
          borderRightColor="border.layout"
          overflowY="auto"
        >
          <COADetailSidebar />
        </Box>
        <Scrollable detailPage>
          <Box
            display="flex"
            p="s16"
            flexDir="column"
            gap="s16"
            ml="320px"
            bg="background.500"
            minH="calc(100vh - 170px)"
          >
            {(tabQuery === 'overview' || tabQuery === 'undefined' || !tabQuery) && <Overview />}
            {tabQuery === 'transactions' && <Transactions />}

            {tabQuery &&
              !['undefined', 'overview', 'transactions', 'withdraw slip'].includes(tabQuery) && (
                <Box h="calc(100vh - 110px)">
                  <WIPState />
                </Box>
              )}

            {/* {tabQuery === 'accounts' && <Account />}
        {tabQuery === 'activity' && <Activity />}
        {tabQuery === 'bio' && <Bio />}
        {tabQuery === 'cheque' && <Cheque />}
        {tabQuery === 'documents' && <Documents />}
        {tabQuery === 'reports' && <Reports />}
        {tabQuery === 'share' && <Share />}
        {tabQuery === 'tasks' && <Tasks />}
        {tabQuery === 'transactions' && <Transactions />} */}
          </Box>
        </Scrollable>
      </Box>

      <Modal
        open={isOpen}
        onClose={handleUpdateModalClose}
        isCentered
        title="Edit Ledger Name"
        primaryButtonLabel="Update"
        primaryButtonHandler={handleEdit}
      >
        <FormProvider {...methods}>
          {/* <Grid templateColumns="repeat(2,1fr)"> */}
          <FormInput label="New Ledger Name" name="newName" />
          {/* </Grid> */}
        </FormProvider>
      </Modal>

      <Modal
        open={isAssignTagModalOpen}
        onClose={onAssignTagModalClose}
        isCentered
        title="Assign Tags"
        footer={
          <Box display="flex" px={5} pb={5} justifyContent="flex-end">
            <Button onClick={handleAssignTag}>Save</Button>
          </Box>
        }
        width="xl"
      >
        <FormProvider {...assignTagMethods}>
          <Grid templateColumns="repeat(2,1fr)" gap="s16">
            <FormLedgerTagSelect name="tagId" label="Tags" menuPosition="fixed" isMulti />
          </Grid>
        </FormProvider>
      </Modal>

      <Modal
        open={isChangeParentOpen}
        onClose={handleChangeLedgerParentClose}
        isCentered
        title="Change Ledger Parent"
        primaryButtonLabel="Change"
        primaryButtonHandler={handleChangeLedgerParent}
      >
        <FormProvider {...changeParentMethods}>
          {/* <Grid templateColumns="repeat(2,1fr)"> */}
          <FormLeafCoaHeadSelect label="New COA Head" name="newCOALeaf" menuPosition="fixed" />
          {/* </Grid> */}
        </FormProvider>
      </Modal>

      <Modal
        open={isAssignTagModalOpen}
        onClose={onAssignTagModalClose}
        isCentered
        title="Assign Tags"
        footer={
          <Box display="flex" px={5} pb={5} justifyContent="flex-end">
            <Button onClick={handleAssignTag}>Save</Button>
          </Box>
        }
        width="xl"
      >
        <FormProvider {...assignTagMethods}>
          <Grid templateColumns="repeat(2,1fr)" gap="s16">
            <FormLedgerTagSelect name="tagId" label="Tags" menuPosition="fixed" isMulti />
          </Grid>
        </FormProvider>
      </Modal>
    </>
  );
};
