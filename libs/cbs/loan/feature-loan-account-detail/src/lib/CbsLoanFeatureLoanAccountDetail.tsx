import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { Alert, asyncToast, Box, Button, Modal, Text } from '@myra-ui';

import { useChangeLocMutation, useGetLoanProductDetailQuery } from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';

import { SideBar } from '../component/SideBar';
import { useLoanAccountDetailHooks } from '../hooks/useLoanAccountDetailHooks';
import { CollateralPage, DocumentPage, GuaranteePage, LedgerPage } from '../tabs';
import { OverviewPage } from '../tabs/OverviewPage';

/* eslint-disable-next-line */
export interface CbsLoanFeatureLoanAccountDetailProps {
  isLocModalOpen: boolean;
  handleLocModalClose: () => void;
}

export const CbsLoanFeatureLoanAccountDetail = (props: CbsLoanFeatureLoanAccountDetailProps) => {
  const { isLocModalOpen, handleLocModalClose } = props;
  const router = useRouter();
  const methods = useForm();
  const { getValues } = methods;
  const { mutateAsync } = useChangeLocMutation();
  const { productId } = useLoanAccountDetailHooks();
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

  return (
    <Box bg="gray.100">
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
      <Box ml="320px" p="s16" display="flex" flexDir="column" minH="100vh" gap="s16">
        {(tabQuery === 'overview' || tabQuery === 'undefined' || !tabQuery) && <OverviewPage />}
        {tabQuery === 'collateral' && <CollateralPage />}
        {tabQuery === 'guarantee' && <GuaranteePage />}
        {tabQuery === 'documents' && <DocumentPage />}
        {tabQuery === 'ledger' && <LedgerPage />}
      </Box>
      <FormProvider {...methods}>
        <form>
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
                <Text>Minimun: {loanData?.minimumLoanAmount}</Text>
                <Text>Maximun: {loanData?.maxLoanAmount}</Text>
              </Alert>
              <FormInput type="number" label="Loan Amount" name="newLoanAmount" />
            </Box>
          </Modal>
        </form>
      </FormProvider>
    </Box>
  );
};
