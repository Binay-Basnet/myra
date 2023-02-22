import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import {
  asyncToast,
  Box,
  Container,
  Divider,
  FormFooter,
  FormHeader,
  Grid,
  GridItem,
  Text,
} from '@myra-ui';

import {
  TellerBankTransferInput,
  TellerBankTransferType,
  useAppSelector,
  useGetBankAccountListQuery,
  useSetBankTransferMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormInput, FormSelect, FormSwitchTab, FormTextArea } from '@coop/shared/form';

/* eslint-disable-next-line */
export interface AddBankTransferProps {}

export const AddBankTransfer = () => {
  const methods = useForm();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth?.user);

  const { data } = useGetBankAccountListQuery({
    pagination: { first: 10, after: '' },
    currentBranchOnly: true,
  });

  // const { data } = useGetBankListQuery();

  const bankList =
    data &&
    data?.accounting?.bankAccounts?.list?.edges?.map((item) => ({
      label: item?.node?.displayName as string,
      value: item?.node?.id as string,
    }));

  const booleanList = [
    {
      label: 'Deposit',
      value: TellerBankTransferType?.Deposit,
    },
    {
      label: 'Withdraw',
      value: TellerBankTransferType?.Withdraw,
    },
  ];

  const { getValues } = methods;
  const { mutateAsync } = useSetBankTransferMutation();

  const handleSubmit = () => {
    const value = getValues();

    asyncToast({
      id: 'add-vault-transfer',
      msgs: {
        loading: 'Adding Bank Transfer',
        success: 'Bank Transfer Successful',
      },
      promise: mutateAsync({ data: { ...value, tellerId: user?.id } as TellerBankTransferInput }),
      onSuccess: () => {
        router.push(ROUTES.CBS_TRANSFER_BANK_LIST);
      },
    });
  };

  return (
    <>
      <Container minW="container.xl" height="fit-content">
        <Box position="sticky" top="0" bg="gray.100" width="100%" zIndex="10">
          <FormHeader title="Add Bank Transfer" closeLink={ROUTES.CBS_TRANSFER_BANK_LIST} />
        </Box>

        <Box bg="white">
          <FormProvider {...methods}>
            <form>
              <Box minH="calc(100vh - 170px)" pb="s60" p="s24">
                <Box display="flex" flexDir="column" gap={5}>
                  <Grid templateColumns="repeat(3,1fr)" gap={2}>
                    <GridItem colSpan={2}>
                      <FormInput
                        name="tellerId"
                        label="Teller Name"
                        value={[user?.firstName?.local, user?.lastName?.local].join(' ')}
                        isDisabled
                      />
                    </GridItem>
                  </Grid>
                  <Divider />
                  <Text>Transfer Details</Text>
                  <FormSwitchTab label="Transfer Type" options={booleanList} name="transferType" />
                  <Grid templateColumns="repeat(3,1fr)" gap={2}>
                    <GridItem colSpan={2}>
                      <FormSelect name="bankId" label="Select Bank" options={bankList} />
                    </GridItem>
                    <GridItem colSpan={1}>
                      <FormInput name="amount" label="Amount" />
                    </GridItem>
                  </Grid>
                  <GridItem colSpan={2}>
                    <FormTextArea name="note" label="Note" />
                  </GridItem>
                </Box>
              </Box>
            </form>
          </FormProvider>
        </Box>
      </Container>

      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.xl" height="fit-content">
            <FormFooter mainButtonLabel="Done" mainButtonHandler={handleSubmit} />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default AddBankTransfer;
