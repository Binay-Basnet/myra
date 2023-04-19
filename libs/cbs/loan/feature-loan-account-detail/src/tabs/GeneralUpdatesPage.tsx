import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { HiOutlineRefresh } from 'react-icons/hi';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { Alert, asyncToast, Box, Button, DetailPageQuickLinks, Modal, Text } from '@myra-ui';

import {
  useChangeLocMutation,
  useGetLoanProductDetailQuery,
  useUpdateLinkedAccountMutation,
} from '@coop/cbs/data-access';
import { FormAccountSelect, FormInput } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

import { TabHeader } from '../component';
import { useLoanAccountDetailHooks } from '../hooks/useLoanAccountDetailHooks';

export const GeneralUpdatesPage = () => {
  const router = useRouter();

  const methods = useForm();

  const { getValues } = methods;
  const { mutateAsync } = useChangeLocMutation();

  const queryClient = useQueryClient();

  const { productId, generalInfo, memberDetails } = useLoanAccountDetailHooks();
  const { data } = useGetLoanProductDetailQuery({ id: productId as string });
  const loanData = data?.settings?.general?.loanProducts?.getProductDetail?.data;

  const [isLocModalOpen, setIsLocModalOpen] = useState(false);

  const handleLocModalClose = () => {
    setIsLocModalOpen(false);
  };

  const [isLinkedAccountModalOpen, setIsLinkedAccountModalOpen] = useState(false);

  const handleLinkedAccountModalClose = () => {
    setIsLinkedAccountModalOpen(false);
  };

  const { mutateAsync: updateLinkedAccount } = useUpdateLinkedAccountMutation();

  const updateOptions = useMemo(
    () => [
      {
        title: 'Update LOC amount',
        onClick: () => setIsLocModalOpen(true),
        icon: HiOutlineRefresh,
      },
      {
        title: 'Update Linked Account',
        onClick: () => setIsLinkedAccountModalOpen(true),
        icon: HiOutlineRefresh,
      },
    ],
    []
  );

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
    <>
      <TabHeader heading="General Updates" />

      <DetailPageQuickLinks links={updateOptions} />

      <FormProvider {...methods}>
        <form>
          {loanData?.loanType === 'NORMAL' ? (
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
    </>
  );
};
