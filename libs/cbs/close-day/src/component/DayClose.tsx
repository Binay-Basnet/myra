import { useMemo } from 'react';
import { IoCheckmarkDone, IoClose, IoRefreshOutline } from 'react-icons/io5';
import { Spinner } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import { Alert, asyncToast, Box, Button, Divider, Icon, Text } from '@myra-ui';

import {
  EodOption,
  EodState,
  useGetEodStatusQuery,
  useSetEndOfDayDataMutation,
} from '@coop/cbs/data-access';
import { FormCheckbox } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

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

export const DayClose = () => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const { data: eodStatusQueryData, refetch } = useGetEodStatusQuery();

  const dayCloseList = useMemo(() => {
    const eodStatus = eodStatusQueryData?.transaction?.eodStatus?.states;

    const eodError = eodStatusQueryData?.transaction?.eodStatus?.errors;

    return [
      {
        title: 'dayCloseDailyInterestBooking',
        subTitle: 'dayCloseInterestBooking',
        status: eodError?.interestBooking ? eodStatus?.interestBooking : EodState.Completed,
        errors: eodError?.interestBooking,
      },
      {
        title: 'dayCloseCheckFrequency',
        subTitle: 'dayCloseImplementthedayend',
        status: eodError?.interestPosting ? eodStatus?.interestPosting : EodState.Completed,
        errors: eodError?.interestPosting,
      },
      {
        title: 'dayCloseTransactionDateProgress',
        subTitle: 'dayCloseChecktransactiondate',
        status: eodStatus?.transactionDate ?? EodState.Completed,
      },
      {
        title: 'dayCloseCheckMaturity',
        subTitle: 'dayCloseCheckAccount',
        status: eodError?.maturity ? eodStatus?.maturity : EodState.Completed,
        errors: eodError?.maturity,
      },
      {
        title: 'Check Dormant',
        subTitle: 'Check if the account is dormant or not.',
        status: eodError?.dormancy ? eodStatus?.dormancy : EodState.Completed,
        errors: eodError?.dormancy,
      },
      {
        title: 'Cash in Hand',
        subTitle:
          'Check if the cash in hand at the start of day balances with the cash in hand at the end after all transactions have been completed.',
        status: eodError?.cashInHand ? eodStatus?.cashInHand : EodState.Completed,
        errors: eodError?.cashInHand,
      },
      {
        title: 'dayCloseCashVault',
        subTitle: 'dayCloseCheckCashVault',
        status: eodError?.cashInVault ? eodStatus?.cashInVault : EodState.Completed,
        errors: eodError?.cashInVault,
      },
      {
        title: 'Loan Interest Booking',
        subTitle:
          'Interest booking should be done for all the loan accounts before closing the day.',
        status: eodError?.loanInterestBooking ? eodStatus?.loanInterestBooking : EodState.Completed,
        errors: eodError?.loanInterestBooking,
      },
    ];
  }, [eodStatusQueryData]);

  const eodStatusIcon = (status: EodState | undefined | null) => {
    switch (status) {
      case EodState.Completed:
        return <Icon color="primary.500" as={IoCheckmarkDone} />;
      case EodState.CompletedWithErrors:
        return <Icon color="danger.500" as={IoClose} />;
      case EodState.Ongoing:
        return <Spinner size="sm" />;
      default:
        return <Icon color="danger.500" as={IoClose} />;
    }
  };

  const eodStatusText = (status: EodState | undefined | null) => {
    let statusText = '';
    switch (status) {
      case EodState.Completed:
        statusText = 'Completed';
        break;
      case EodState.CompletedWithErrors:
        statusText = 'Not completed';
        break;
      case EodState.Ongoing:
        statusText = 'Ongoing';
        break;
      default:
        statusText = 'Not completed';
    }

    return statusText;
  };

  const hasErrors = useMemo(
    () =>
      !!Object.values(eodStatusQueryData?.transaction?.eodStatus?.states ?? {}).find(
        (value) => value === EodState.Ongoing
      ),
    [eodStatusQueryData]
  );

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
          <Button leftIcon={<IoRefreshOutline />} onClick={() => refetch()}>
            {t['dayCloseReload']}
          </Button>
        </Box>
        {dayCloseList?.map(({ title, subTitle, status, errors }, index) => (
          <>
            <Box display="flex" gap="s16" py="s16" key={title}>
              <NumberStatus number={index + 1} active={status === EodState.Completed} />
              <Box display="flex" flexDirection="column" gap="s16">
                <Box>
                  <Text
                    fontSize="r1"
                    fontWeight="SemiBold"
                    color="neutralColorLight.Gray-80"
                    lineHeight="150%"
                  >
                    {t[title] ?? title}
                  </Text>
                  <Text
                    fontSize="r1"
                    fontWeight="Regular"
                    color="neutralColorLight.Gray-80"
                    lineHeight="150%"
                  >
                    {t[subTitle] ?? subTitle}
                  </Text>
                </Box>

                <Box display="flex" alignItems="center" gap="s8">
                  {eodStatusIcon(status)}

                  <Text
                    fontSize="s3"
                    fontWeight="SemiBold"
                    color="neutralColorLight.Gray-70"
                    lineHeight="150%"
                  >
                    {eodStatusText(status)}
                  </Text>
                </Box>

                {status === EodState.CompletedWithErrors &&
                  errors?.length &&
                  errors?.map((error) => (
                    <Alert status="error" hideCloseIcon>
                      <Text
                        fontSize="r1"
                        fontWeight="SemiBold"
                        color="neutralColorLight.Gray-80"
                        lineHeight="150%"
                      >
                        {error}
                      </Text>
                    </Alert>
                  ))}
              </Box>
            </Box>
            <Divider />
          </>
        ))}

        {hasErrors && (
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
