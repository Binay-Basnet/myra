import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, DetailsCard, Grid, Icon, Modal, Text } from '@myra-ui';

import {
  AmountLimit,
  LoanProduct,
  useGetAccountDetailsDataQuery,
  useGetLoanProductDetailsDataQuery,
  useSetLoanGuaranteeMutation,
} from '@coop/cbs/data-access';
import { FormAccountSelect, FormAmountInput, FormMemberSelect } from '@coop/shared/form';

import { GuaranteeList, Statistics, TabHeader } from '../component';
import { useLoanAccountDetailHooks } from '../hooks/useLoanAccountDetailHooks';

export const GuaranteePage = () => {
  const { guaranteeSummary, gauranteeListInfo } = useLoanAccountDetailHooks();
  const [isAddGuaranteeModalOpen, setIsAddGuaranteeModalOpen] = useState(false);
  const methods = useForm();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync } = useSetLoanGuaranteeMutation();

  const switchLoanAccId = methods.watch('accountId');
  const switchMemberId = methods.watch('memberId');
  const { data: accountDetailQueryData } = useGetAccountDetailsDataQuery(
    { id: switchLoanAccId as string },
    { enabled: !!switchLoanAccId }
  );
  const { overviewData } = useLoanAccountDetailHooks();
  const { data: loanProductDetails } = useGetLoanProductDetailsDataQuery(
    { id: overviewData?.generalInformation?.productId },
    {
      enabled: !!overviewData?.generalInformation?.productId,
    }
  );
  const loanProduct = useMemo(
    () => loanProductDetails?.settings?.general?.loanProducts?.formState?.data as LoanProduct,
    [loanProductDetails?.settings?.general?.loanProducts?.formState?.data]
  );
  const selectedAccount = useMemo(
    () => accountDetailQueryData?.account?.accountDetails?.data,
    [accountDetailQueryData]
  );

  const currentBalance = selectedAccount?.availableBalance ?? '0';

  const maxGuarantee = loanProduct?.maxPercentOfGurantee
    ? (Number(currentBalance) * Number(loanProduct?.maxPercentOfGurantee)) / 100
    : currentBalance;

  const handleAddGuaranteeModalClose = () => {
    setIsAddGuaranteeModalOpen(false);
  };

  const handleAddGuarantee = () => {
    const values = methods.getValues();

    asyncToast({
      id: 'loan-account-detail-add-guarantee',
      promise: mutateAsync({
        loanAccountID: router?.query?.['id'] as string,
        data: {
          ...values,
          guranteeAmount: values?.guranteeAmount as AmountLimit,
        },
      }),
      msgs: {
        loading: 'Switching guarantee',
        success: 'Guarantee switched',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getLoanAccountGuaranteeDetails']);
        handleAddGuaranteeModalClose();
      },
    });
  };

  return (
    <>
      <TabHeader heading="Guarantee" />
      <Statistics statsData={guaranteeSummary} />
      <DetailsCard
        title={`Guarantee List (${gauranteeListInfo?.length || 0}) `}
        bg="white"
        hasTable
      >
        <Box
          display="flex"
          gap="s4"
          justifyContent="flex-end"
          alignItems="center"
          cursor="pointer"
          onClick={() => setIsAddGuaranteeModalOpen(true)}
        >
          <Icon as={AiOutlinePlus} size="sm" color="primary" />
          <Text fontSize="s3" fontWeight="medium" color="primary">
            Add New Guarantee
          </Text>
        </Box>
        {gauranteeListInfo &&
          gauranteeListInfo?.map((item) => <GuaranteeList gauranteeList={item} />)}
      </DetailsCard>

      <Modal
        open={isAddGuaranteeModalOpen}
        onClose={handleAddGuaranteeModalClose}
        primaryButtonLabel="Save"
        primaryButtonHandler={handleAddGuarantee}
        title="Add New Guarantee"
      >
        <FormProvider {...methods}>
          <Box display="flex" flexDirection="column" gap="s16">
            <FormMemberSelect name="memberId" label="Select Member" menuPosition="fixed" />
            <FormAccountSelect
              name="accountId"
              label="Select Account"
              memberId={switchMemberId}
              menuPosition="fixed"
            />
            <Grid templateColumns="repeat(2,1fr)" gap="s16">
              <FormAmountInput
                name="maxGuranteeAmountLimit"
                label="Maximum Guarantee Amount Available"
                value={maxGuarantee}
                isDisabled
              />
              <FormAmountInput
                name="guranteeAmount"
                label="Guarantee Amount"
                rules={{
                  max: {
                    value: maxGuarantee,
                    message: 'Guaranntee Limit Exceeeded',
                  },
                }}
              />
            </Grid>
          </Box>
        </FormProvider>
      </Modal>
    </>
  );
};
