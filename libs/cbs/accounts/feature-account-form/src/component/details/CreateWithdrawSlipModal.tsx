import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';

import { Alert, asyncToast, Grid, GridItem, Modal } from '@myra-ui';

import {
  PickupMethod,
  useAccountDetails,
  useGetAvailableRangeQuery,
  useGetAvailableSlipsListQuery,
  useSetIssueNewSlipMutation,
  WithdrawSlipIssueInput,
} from '@coop/cbs/data-access';
import { FormAgentSelect, FormBranchSelect, FormSelect, FormSwitchTab } from '@coop/shared/form';

interface ICreateWithdrawSlipModalProps {
  isOpen: boolean;
  onClose: () => void;
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

export const CreateWithdrawSlipModal = ({ isOpen, onClose }: ICreateWithdrawSlipModalProps) => {
  const { accountDetails } = useAccountDetails();

  const queryClient = useQueryClient();

  const methods = useForm<WithdrawSlipIssueInput>({
    defaultValues: { pickupMethod: PickupMethod.Self },
  });

  const { watch, resetField, getValues } = methods;

  const count = watch('count');

  const pickupMethod = watch('pickupMethod');

  const { data: availableSlipsListQueryData } = useGetAvailableSlipsListQuery(
    { accountId: accountDetails?.accountId as string },
    { enabled: !!accountDetails?.accountId }
  );

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
      id: 'account-issue-new-withdraw-slip',
      msgs: {
        loading: 'Issuing withdraw slip',
        success: 'Withdraw slip issued',
      },
      promise: issueWithdrawSlip({
        data: { ...data, accountId: accountDetails?.accountId as string },
      }),
      onSuccess: () => {
        queryClient.invalidateQueries(['getAvailableSlipsList']);
        resetField('count');
        onClose();
      },
    });
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      width="xl"
      title="Create Withdraw Slip Book"
      primaryButtonLabel="Create"
      primaryButtonHandler={handleSave}
    >
      <FormProvider {...methods}>
        <form>
          <Grid templateColumns="repeat(2, 1fr)" gap="s16">
            <FormSelect
              name="count"
              menuPosition="fixed"
              label="Total no of withdraw slip"
              options={totalNumberOptions}
            />

            {availableSlipsListQueryData?.withdrawSlip?.listAvailableSlips?.data?.length && (
              <GridItem colSpan={2}>
                <Alert
                  status="warning"
                  title="If new withdraw slip is created, existing active withdraw slips will be blocked and new withdraw slip will be created."
                  hideCloseIcon
                />
              </GridItem>
            )}

            {count && from && to && (
              <>
                <GridItem colSpan={2}>
                  <Alert
                    status="info"
                    title={`Withdraw Slip Start Number ${from} and Withdraw Slip End Number ${to}`}
                    hideCloseIcon
                  />
                </GridItem>

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
              </>
            )}
          </Grid>
        </form>
      </FormProvider>
    </Modal>
  );
};
