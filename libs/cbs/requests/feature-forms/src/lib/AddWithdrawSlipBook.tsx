import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import omit from 'lodash/omit';

import {
  Alert,
  asyncToast,
  Box,
  Container,
  FormFooter,
  FormHeader,
  FormSection,
  GridItem,
} from '@myra-ui';

import {
  PickupMethod,
  useGetAvailableRangeQuery,
  useSetIssueNewSlipMutation,
  WithdrawSlipIssueInput,
} from '@coop/cbs/data-access';
import {
  FormAccountSelect,
  FormAgentSelect,
  FormBranchSelect,
  FormMemberSelect,
  FormSelect,
  FormSwitchTab,
} from '@coop/shared/form';

interface CustomWithdrawSlipIssueInput extends WithdrawSlipIssueInput {
  memberId: string;
}

const totalNumberOptions = [
  {
    label: '5',
    value: 5,
  },
  {
    label: '10',
    value: 10,
  },
  {
    label: '25',
    value: 25,
  },
  {
    label: '50',
    value: 50,
  },
];

const pickupMethodOptions = [
  { label: 'Self', value: PickupMethod.Self },
  { label: 'Through Market Representative', value: PickupMethod.MarketRepresentative },
];

export const AddWithdrawSlipBook = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const methods = useForm<CustomWithdrawSlipIssueInput>({
    defaultValues: { pickupMethod: PickupMethod.Self },
  });

  const { watch, getValues } = methods;

  const memberId = watch('memberId');

  const count = watch('count');

  const { data: availableRangeQueryData } = useGetAvailableRangeQuery(
    { count },
    { enabled: !!count }
  );

  const { from, to } = useMemo(
    () => ({
      from: availableRangeQueryData?.withdrawSlip?.getAvailableRange?.range?.from,
      to: availableRangeQueryData?.withdrawSlip?.getAvailableRange?.range?.to,
    }),
    [availableRangeQueryData]
  );

  const { mutateAsync: issueWithdrawSlip } = useSetIssueNewSlipMutation({});

  const handleSave = () => {
    const data = getValues();

    asyncToast({
      id: 'issue-new-withdraw-slip-book',
      msgs: {
        loading: 'Issuing withdraw slip book',
        success: 'Withdraw slip book issued',
      },
      promise: issueWithdrawSlip({
        data: { ...omit(data, ['memberId']) },
      }),
      onSuccess: () => {
        queryClient.invalidateQueries(['getAvailableSlipsList']);
        router.push('/withdraw/withdraw-slip-book/list');
      },
    });
  };

  return (
    <>
      <Container minW="container.xl" height="fit-content">
        <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
          <FormHeader title="Create Withdraw Slip Book" />
        </Box>

        <Box bg="white">
          <FormProvider {...methods}>
            <form>
              <Box minH="calc(100vh - 170px)">
                <FormSection templateColumns={2}>
                  <GridItem colSpan={2}>
                    <FormMemberSelect name="memberId" label="Member" />
                  </GridItem>

                  <FormAccountSelect name="accountId" label="Account" memberId={memberId} />

                  <FormSelect
                    name="count"
                    label="Total no of withdraw slip"
                    options={totalNumberOptions}
                  />

                  {count && to && from && (
                    <GridItem colSpan={2}>
                      <Alert
                        status="info"
                        title={`Withdraw Slip Start Number ${from} and Withdraw Slip End Number ${to}`}
                        hideCloseIcon
                      />
                    </GridItem>
                  )}
                </FormSection>

                <FormSection templateColumns={2} divider={false}>
                  <GridItem colSpan={2}>
                    <FormSwitchTab
                      name="pickupMethod"
                      label="Pickup Method"
                      options={pickupMethodOptions}
                    />
                  </GridItem>

                  <FormBranchSelect name="branchId" label="Service Center" />

                  <FormAgentSelect name="marketRepresentative" label="Market Representative" />
                </FormSection>
              </Box>
            </form>
          </FormProvider>
        </Box>
      </Container>

      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.xl" height="fit-content">
            <FormFooter mainButtonLabel="Save" mainButtonHandler={handleSave} />
          </Container>
        </Box>
      </Box>
    </>
  );
};