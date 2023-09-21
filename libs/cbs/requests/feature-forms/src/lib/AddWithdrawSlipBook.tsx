import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import omit from 'lodash/omit';

import { Alert, asyncToast, Box, Button, FormSection, GridItem, Text } from '@myra-ui';

import {
  PickupMethod,
  useGetAvailableRangeQuery,
  useSetIssueNewSlipMutation,
  WithdrawSlipIssueInput,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import {
  FormAccountSelect,
  FormAgentSelect,
  FormBranchSelect,
  FormLayout,
  FormMemberSelect,
  FormNumberInput,
  FormSwitchTab,
} from '@coop/shared/form';
import { featureCode } from '@coop/shared/utils';

interface CustomWithdrawSlipIssueInput extends WithdrawSlipIssueInput {
  memberId: string;
}

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

  const pickupMethod = watch('pickupMethod');

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
        router.push(ROUTES.CBS_WITHDRAW_SLIP_BOOK_LIST);
      },
    });
  };

  const handelSaveAndPrint = () => {
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
      onSuccess: (res) => {
        queryClient.invalidateQueries(['getAvailableSlipsList']);
        router.push(
          `${ROUTES.CBS_WITHDRAW_SLIP_BOOK_PRINT}?id=${res?.withdrawSlip?.issueNew?.recordId}`
        );
      },
    });
  };

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title={`Create Withdraw Slip Book - ${featureCode.newWithdrawSlipBook}`} />

      <FormLayout.Content>
        <FormLayout.Form>
          <FormSection templateColumns={2}>
            <GridItem colSpan={2}>
              <FormMemberSelect isRequired name="memberId" label="Member" />
            </GridItem>

            <FormAccountSelect
              isRequired
              name="accountId"
              label="Account"
              memberId={memberId}
              filterBy="ACTIVE"
              includeLoc
            />

            <Box display="flex" flexDirection="column" gap="s8">
              <FormNumberInput isRequired name="count" label="Total no of withdraw slip" />

              <Box display="flex" gap="s8">
                {[10, 25, 50, 100].map((n) => (
                  <Box
                    py="s8"
                    px="s16"
                    bg="primary.100"
                    borderRadius="br2"
                    cursor="pointer"
                    _hover={{ bg: 'primary.200' }}
                    onClick={() => methods.setValue('count', n)}
                  >
                    <Text color="gray.800" fontWeight={500}>
                      {n}
                    </Text>
                  </Box>
                ))}
              </Box>
            </Box>

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

            {pickupMethod === PickupMethod.MarketRepresentative && (
              <>
                <FormBranchSelect name="branchId" label="Service Center" />
                <FormAgentSelect name="marketRepresentative" label="Market Representative" />
              </>
            )}
          </FormSection>
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer
        mainButtonLabel="Save"
        mainButtonHandler={handleSave}
        draftButton={
          <Button
            // width="160px"
            variant="outline"
            onClick={handelSaveAndPrint}
          >
            Save & Print
          </Button>
        }
      />
    </FormLayout>
  );
};
