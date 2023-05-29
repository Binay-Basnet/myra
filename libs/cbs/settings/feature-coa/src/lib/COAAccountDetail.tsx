import { FormProvider, useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, DetailPageHeader, Modal, Scrollable, Text, WIPState } from '@myra-ui';

import { useUpdateLedgerNameMutation } from '@coop/cbs/data-access';
import { COADetailSidebar } from '@coop/cbs/settings/ui-layout';
import { ROUTES } from '@coop/cbs/utils';
import { FormInput } from '@coop/shared/form';

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

  const handleUpdateModalClose = () => {
    methods.reset({ newName: '' });
    onClose();
  };

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
        options={[{ label: 'Edit Ledger Name', handler: onToggle }]}
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
    </>
  );
};
