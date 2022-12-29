import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, Button, Text } from '@myra-ui';

import { EodOption, EodState, useSetEndOfDayDataMutation } from '@coop/cbs/data-access';
import { FormCheckbox } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { StatusList } from './StatusList';

interface INumberStatusProps {
  active: boolean;
  number: number | string;
}

export const NumberStatus = ({ number, active }: INumberStatusProps) => (
  <Box
    w="s20"
    h="s20"
    display="flex"
    alignItems="center"
    justifyContent="center"
    fontSize="s2"
    fontWeight="600"
    borderRadius="100%"
    bg={active ? 'primary.500' : 'gray.500'}
    color="white"
  >
    {number}
  </Box>
);

interface IDayCloseProps {
  dayCloseList: {
    title: string;
    subTitle: string;
    status: EodState | null | undefined;
    errors?: string[];
  }[];
  showAdditionalFields: boolean;
}

export const DayClose = ({ dayCloseList, showAdditionalFields }: IDayCloseProps) => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  // const showAdditionalFields = useMemo(() => {
  //   if (!eodStatusQueryData?.transaction?.eodStatus?.states?.currentBranchesReady) {
  //     return false;
  //   }

  //   if (
  //     Object.values(eodStatusQueryData?.transaction?.eodStatus?.states ?? {}).find(
  //       (value) => value === EodState.Ongoing
  //     )
  //   ) {
  //     return false;
  //   }

  //   return (
  //     eodStatusQueryData?.transaction?.eodStatus?.states?.transactionDate !== EodState.Completed
  //   );
  // }, [eodStatusQueryData]);

  // const dayCloseList = useMemo(() => {
  //   const eodStatus = eodStatusQueryData?.transaction?.eodStatus?.states;

  //   const eodError = eodStatusQueryData?.transaction?.eodStatus?.errors;

  //   if (!eodStatus?.currentBranchesReady) {
  //     return [
  //       {
  //         title: 'Branch Readiness',
  //         subTitle: 'Check if all the branches have completed branch readiness or not.',
  //         status: EodState.CompletedWithErrors,
  //         errors: eodError?.readiness as string[],
  //       },
  //     ];
  //   }

  //   return [
  //     {
  //       title: 'Branch Readiness',
  //       subTitle: 'Check if all the branches have completed branch readiness or not.',
  //       status: EodState.Completed,
  //     },
  //     {
  //       title: 'dayCloseDailyInterestBooking',
  //       subTitle: 'dayCloseInterestBooking',
  //       status: eodError ? eodStatus?.interestBooking : EodState.Completed,
  //       errors: eodError?.interestBooking as string[],
  //     },
  //     {
  //       title: 'dayCloseCheckFrequency',
  //       subTitle: 'dayCloseImplementthedayend',
  //       status: eodError ? eodStatus?.interestPosting : EodState.Completed,
  //       errors: eodError?.interestPosting as string[],
  //     },
  //     {
  //       title: 'dayCloseTransactionDateProgress',
  //       subTitle: 'dayCloseChecktransactiondate',
  //       status: eodStatus?.transactionDate ?? EodState.Completed,
  //     },
  //     {
  //       title: 'dayCloseCheckMaturity',
  //       subTitle: 'dayCloseCheckAccount',
  //       status: eodError ? eodStatus?.maturity : EodState.Completed,
  //       errors: eodError?.maturity as string[],
  //     },
  //     {
  //       title: 'Check Dormant',
  //       subTitle: 'Check if the account is dormant or not.',
  //       status: eodError ? eodStatus?.dormancy : EodState.Completed,
  //       errors: eodError?.dormancy as string[],
  //     },
  //     {
  //       title: 'Branch Readiness',
  //       subTitle: 'Check if all the branches have completed branch readiness or not.',
  //       status: eodError ? eodStatus?.cashInHand : EodState.Completed,
  //       errors: eodError?.cashInHand as string[],
  //     },
  //     {
  //       title: 'Cash with Teller',
  //       subTitle:
  //         'Check if the cash with teller at the start of day balances with the cash with teller at the end after all transactions have been completed.',
  //       status: eodError ? eodStatus?.cashInHand : EodState.Completed,
  //       errors: eodError?.cashInHand as string[],
  //     },
  //     {
  //       title: 'dayCloseCashVault',
  //       subTitle: 'dayCloseCheckCashVault',
  //       status: eodError ? eodStatus?.cashInVault : EodState.Completed,
  //       errors: eodError?.cashInVault as string[],
  //     },
  //     {
  //       title: 'Loan Interest Booking',
  //       subTitle:
  //         'Interest booking should be done for all the loan accounts before closing the day.',
  //       status: eodError ? eodStatus?.loanInterestBooking : EodState.Completed,
  //       errors: eodError?.loanInterestBooking as string[],
  //     },
  //   ];
  // }, [eodStatusQueryData]);

  const { mutateAsync: closeDay } = useSetEndOfDayDataMutation();

  const reinitiateCloseDay = () => {
    asyncToast({
      id: 'reinitiate-day-close',
      msgs: {
        loading: 'Reinitiating day close',
        success: 'Day close reinitiated',
      },
      promise: closeDay({ option: EodOption.Reinitiate }),
      onSuccess: () => {
        queryClient.invalidateQueries(['getEndOfDayDateData']);
        queryClient.invalidateQueries(['getEODStatus']);
      },
    });
  };

  return (
    <Box display="flex" flexDirection="column" py="s16">
      <Box display="flex" flexDirection="column">
        <Box display="flex" py="s16" justifyContent="space-between" alignItems="center">
          <Text
            fontSize="r2"
            fontWeight="SemiBold"
            color="neutralColorLight.Gray-80"
            lineHeight="s20"
          >
            {t['dayCloseInOrder']}
          </Text>
          {/* <Button leftIcon={<IoRefreshOutline />} onClick={() => refetch()}>
            {t['dayCloseReload']}
          </Button> */}
        </Box>

        <StatusList statusList={dayCloseList} />

        {showAdditionalFields && (
          <Box display="flex" flexDirection="column" gap="s48" py="s32">
            <Box>
              <Button variant="outline" onClick={reinitiateCloseDay}>
                {t['dayCloseReinitiateDayEnd']}
              </Button>
            </Box>

            <FormCheckbox name="ignore" label={t['dayCloseIgnoreErrors']} />
          </Box>
        )}
      </Box>
    </Box>
  );
};
