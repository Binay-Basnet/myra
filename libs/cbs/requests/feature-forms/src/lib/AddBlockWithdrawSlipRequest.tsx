import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, FormSection, GridItem } from '@myra-ui';

import {
  SlipRangeInput,
  useCancelWithdrawSlipRequestMutation,
  useGetAvailableSlipsListQuery,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import {
  FormAccountSelect,
  FormLayout,
  FormMemberSelect,
  FormSelect,
  FormSwitchTab,
  FormTextArea,
} from '@coop/shared/form';
import { featureCode } from '@coop/shared/utils';

const blockModes = [
  {
    label: 'Withdraw Slip Number',
    value: 'Number',
  },
  {
    label: 'Withdraw Slip Book',
    value: 'Book',
  },
];

interface CancelWithdrawSlipInput {
  memberId: string;
  accountId: string;
  blockMode: string;
  slipNumber?: string;
  slipRange?: SlipRangeInput;
  reason: string;
}

export const AddBlockWithdrawSlipRequest = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const methods = useForm<CancelWithdrawSlipInput>({ defaultValues: { blockMode: 'Number' } });

  const { watch, reset, getValues } = methods;

  const memberId = watch('memberId');

  const accountId = watch('accountId');

  const blockMode = watch('blockMode');

  const { mutateAsync: cancelWithdrawSlipRequest } = useCancelWithdrawSlipRequestMutation();

  const { data: availableSlipsListQueryData } = useGetAvailableSlipsListQuery(
    { accountId },
    { enabled: !!accountId }
  );

  const availableSlipListOptions = useMemo(
    () =>
      availableSlipsListQueryData?.withdrawSlip?.listAvailableSlips?.data?.map((withdrawSlip) => ({
        label: String(withdrawSlip?.slipNumber).padStart(10, '0'),
        value: withdrawSlip?.slipNumber as string,
      })) ?? [],
    [availableSlipsListQueryData]
  );

  useEffect(() => {
    reset({ memberId, accountId: '', blockMode: 'Number', slipNumber: '', reason: '' });
  }, [memberId]);

  const handleSave = () => {
    const data = getValues();

    asyncToast({
      id: 'set-cancel-withdraw-slip-request',
      msgs: {
        loading: 'Sending cancel withdraw slip request',
        success: 'Cancel withdraw slip request sent',
      },
      promise: cancelWithdrawSlipRequest({
        accountId: data.accountId,
        slipNumber: data.blockMode === 'Number' ? Number(data.slipNumber) : null,
        slipRange:
          data.blockMode === 'Book'
            ? {
                from: Number(availableSlipListOptions[0].value),
                to: Number(availableSlipListOptions[availableSlipListOptions.length - 1].value),
              }
            : null,
        reason: data.reason,
      }),
      onSuccess: () => {
        queryClient.invalidateQueries(['getAvailableSlipsList']);
        queryClient.invalidateQueries(['getPastSlipsList']);
        router.push(ROUTES.CBS_BLOCK_WITHDRAW_SLIP_REQUEST_LIST);
      },
    });
  };

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header
        title={`Block Withdraw Slip Book - ${featureCode.newBlockWithdrawSlipBook}`}
      />

      <FormLayout.Content>
        <FormLayout.Form>
          <FormSection>
            <GridItem colSpan={2}>
              <FormMemberSelect isRequired name="memberId" label="Member" />
            </GridItem>

            <FormAccountSelect isRequired name="accountId" label="Account" memberId={memberId} />
            <GridItem colSpan={3}>
              <FormSwitchTab label="Withdraw Slip" options={blockModes} name="blockMode" />
            </GridItem>
            {blockMode === 'Number' && (
              <FormSelect
                isRequired
                name="slipNumber"
                label="Withdraw Slip No"
                options={availableSlipListOptions}
              />
            )}
          </FormSection>

          <FormSection templateColumns={1} divider={false}>
            <FormTextArea name="reason" label="Reason" rows={5} />
          </FormSection>
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={handleSave} />
    </FormLayout>
  );
};
