import { FormProvider, useForm } from 'react-hook-form';

import { Box, Container, FormFooter, FormHeader } from '@myra-ui';

import { featureCode } from '@coop/shared/utils';

import { CashTransferTotalCard, LedgerTable, ServiceCenterTable } from '../components';

/* eslint-disable-next-line */
export interface AddCashTransferProps {}

export const AddCashTransfer = () => {
  const methods = useForm();
  return (
    // const { getValues } = methods;

    // const handleSubmit = () => {
    //   const values = getValues();

    //   asyncToast({
    //     id: 'add-vault-transfer',
    //     msgs: {
    //       loading: 'Adding Vault Transfer',
    //       success: 'Vault Tansfer Added',
    //     },
    //     promise: setVaultTransfer({ data: filteredValues as TellerTransferInput }),
    //     onSuccess: () => {
    //       queryClient.invalidateQueries(['getTellerTransactionListData']);
    //       queryClient.invalidateQueries(['getMe']);

    //       router.push('/transfer/vault-transfer/list');
    //     },
    //   });
    // };

    // const router = useRouter();

    // const { mutateAsync: setVaultTransfer } = useSetTellerTransferDataMutation();

    // const { watch, getValues } = methods;

    // const amount = watch('amount');

    // const denominations = watch('denominations');

    // const denominationTotal =
    //   denominations?.reduce(
    //     (accumulator: number, curr: { amount: string }) => accumulator + Number(curr.amount),
    //     0 as number
    //   ) ?? 0;
    <>
      <Container minW="container.xl" height="fit-content">
        <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
          <FormHeader
            title={`Service Center Cash Transfer - ${featureCode.newVaultTransfer}`}
            closeLink="/transfer/cash-transfer/list"
          />
        </Box>

        <Box bg="white">
          <FormProvider {...methods}>
            <form>
              <Box minH="calc(100vh - 170px)" pb="s60">
                <LedgerTable />
                <ServiceCenterTable />
                <CashTransferTotalCard />
              </Box>
            </form>
          </FormProvider>
        </Box>
      </Container>

      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.xl" height="fit-content">
            <FormFooter
              mainButtonLabel="Done"
              // mainButtonHandler={handleSubmit}
              // isMainButtonDisabled={Number(denominationTotal) !== Number(amount)}
            />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default AddCashTransfer;
