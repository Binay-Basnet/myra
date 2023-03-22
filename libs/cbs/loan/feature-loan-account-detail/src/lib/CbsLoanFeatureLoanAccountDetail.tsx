import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { Alert, asyncToast, Box, Button, Modal, Scrollable, Text } from '@myra-ui';

import {
  TypeOfLoan,
  useChangeLocMutation,
  useGetLoanProductDetailQuery,
  useUpdateLinkedAccountMutation,
} from '@coop/cbs/data-access';
import { FormAccountSelect, FormInput } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

import { SideBar } from '../component/SideBar';
import { useLoanAccountDetailHooks } from '../hooks/useLoanAccountDetailHooks';
import { CollateralPage, DocumentPage, GuaranteePage, LedgerPage } from '../tabs';
import { OverviewPage } from '../tabs/OverviewPage';

/* eslint-disable-next-line */
export interface CbsLoanFeatureLoanAccountDetailProps {
  isLocModalOpen?: boolean;
  handleLocModalClose?: () => void;
  isLinkedAccountModalOpen?: boolean;
  handleLinkedAccountModalClose?: () => void;
}

export const CbsLoanFeatureLoanAccountDetail = (props: CbsLoanFeatureLoanAccountDetailProps) => {
  const {
    isLocModalOpen,
    handleLocModalClose,
    isLinkedAccountModalOpen,
    handleLinkedAccountModalClose,
  } = props;
  const queryClient = useQueryClient();

  const router = useRouter();
  const methods = useForm();

  const { getValues } = methods;
  const { mutateAsync } = useChangeLocMutation();

  const { mutateAsync: updateLinkedAccount } = useUpdateLinkedAccountMutation();

  const { productId, generalInfo, memberDetails } = useLoanAccountDetailHooks();
  const { data } = useGetLoanProductDetailQuery({ id: productId as string });
  const loanData = data?.settings?.general?.loanProducts?.getProductDetail?.data;

  const tabQuery = router.query['tab'] as string;

  const handleSubmit = () => {
    asyncToast({
      id: 'new-loan-amount',
      msgs: {
        success: 'Amount changed succesfully',
        loading: 'changing amount',
      },
      onSuccess: () => handleLocModalClose(),
      promise: mutateAsync({
        accountId: router?.query['id'] as string,
        newAmount: getValues()?.newLoanAmount,
      }),
    });
  };

  const handleUpdateLinkedAccount = () => {
    asyncToast({
      id: 'update-loan-account-linked-account',
      msgs: {
        success: 'Linked account updated successfully',
        loading: 'Updating linked account',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getLoanAccountDetails']);

        handleLinkedAccountModalClose();
      },
      promise: updateLinkedAccount({
        loanAccountId: router?.query['id'] as string,
        newLinkedAccountId: getValues()?.newLinkedAccountId,
      }),
    });
  };

  return (
    <Box bg="gray.100">
      <Box display="flex">
        <Box
          bg="gray.0"
          w="320px"
          position="fixed"
          h="calc(100vh - 110px)"
          borderRight="1px"
          borderRightColor="border.layout"
        >
          <SideBar />
        </Box>
        <Scrollable detailPage>
          <Box ml="320px" p="s16" display="flex" flexDir="column" minH="100vh" gap="s16">
            {(tabQuery === 'overview' || tabQuery === 'undefined' || !tabQuery) && <OverviewPage />}
            {tabQuery === 'collateral' && <CollateralPage />}
            {tabQuery === 'guarantee' && <GuaranteePage />}
            {tabQuery === 'documents' && <DocumentPage />}
            {tabQuery === 'ledger' && <LedgerPage />}
          </Box>
        </Scrollable>
      </Box>
      <FormProvider {...methods}>
        <form>
          {loanData?.loanType === TypeOfLoan?.Normal ? (
            <Modal
              open={isLocModalOpen}
              onClose={handleLocModalClose}
              title={
                <Text fontSize="r2" color="neutralColorLight.Gray-80" fontWeight="SemiBold">
                  Update Loan Amount
                </Text>
              }
            >
              <Text>This is not a LOC loan account</Text>
            </Modal>
          ) : (
            <Modal
              open={isLocModalOpen}
              onClose={handleLocModalClose}
              isCentered
              title={
                <Text fontSize="r2" color="neutralColorLight.Gray-80" fontWeight="SemiBold">
                  Update Loan Amount
                </Text>
              }
              footer={
                <Box display="flex" px={5} pb={5} justifyContent="flex-end">
                  <Button onClick={handleSubmit}>Save</Button>
                </Box>
              }
              width="xl"
            >
              <Box display="flex" flexDir="column" gap={5}>
                <Alert status="info" title="Loan Amount Limit" hideCloseIcon>
                  <ul>
                    <li>
                      <Text>Minimum: {amountConverter(loanData?.minimumLoanAmount)}</Text>
                    </li>
                    <li>
                      <Text>Maximum: {amountConverter(loanData?.maxLoanAmount)}</Text>
                    </li>
                  </ul>
                </Alert>
                <FormInput type="number" label="Loan Amount" name="newLoanAmount" />
              </Box>
            </Modal>
          )}

          <Modal
            open={isLinkedAccountModalOpen}
            onClose={handleLinkedAccountModalClose}
            isCentered
            title={
              <Text fontSize="r2" color="neutralColorLight.Gray-80" fontWeight="SemiBold">
                Update Linked Account
              </Text>
            }
            footer={
              <Box display="flex" px={5} pb={5} justifyContent="flex-end">
                <Button onClick={handleUpdateLinkedAccount}>Save</Button>
              </Box>
            }
            width="xl"
          >
            <Box display="flex" flexDir="column" gap={5}>
              <Alert
                status="info"
                title="Exisiting Linked Account"
                subtitle={generalInfo?.linkedAccountName}
                hideCloseIcon
              />

              <FormAccountSelect
                memberId={memberDetails?.memberId}
                label="New Linked Account"
                name="newLinkedAccountId"
                menuPosition="fixed"
                isLinkedAccounts
                excludeIds={[generalInfo?.linkedAccountId]}
              />
            </Box>
          </Modal>
        </form>
      </FormProvider>
    </Box>
  );
};
