import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';

import {
  useAccountDetails,
  useGetAvailableRangeQuery,
  useSetIssueNewSlipMutation,
} from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';
import { Alert, asyncToast, ChakraModal, Grid, GridItem } from '@myra-ui';

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

export const CreateWithdrawSlipModal = ({ isOpen, onClose }: ICreateWithdrawSlipModalProps) => {
  const { accountDetails } = useAccountDetails();

  const queryClient = useQueryClient();

  const methods = useForm();

  const { watch, setValue } = methods;

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
    asyncToast({
      id: 'account-issue-new-withdraw-slip',
      msgs: {
        loading: 'Issuing withdraw slip',
        success: 'Withdraw slip issued',
      },
      promise: issueWithdrawSlip({ accountId: accountDetails?.accountId as string, count }),
      onSuccess: () => {
        queryClient.invalidateQueries(['getAvailableSlipsList']);
        setValue('count', '');
        onClose();
      },
    });
  };

  return (
    <ChakraModal
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
              label="Total no of withdraw slip"
              options={totalNumberOptions}
            />

            {count && from && to && (
              <GridItem colSpan={2}>
                <Alert
                  status="info"
                  title={`Withdraw Slip Start Number ${from} and Withdraw Slip End Number ${to}`}
                />
              </GridItem>
            )}
          </Grid>
        </form>
      </FormProvider>
    </ChakraModal>
  );
};
