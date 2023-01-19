import React, { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, Container, FormFooter, FormHeader, Loader, toast } from '@myra-ui';

import {
  BranchCategory,
  EodOption,
  EodState,
  useAppSelector,
  useGetEodStatusQuery,
  useSetEndOfDayDataMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { useTranslation } from '@coop/shared/utils';

import { DayClose } from '../component/DayClose';

/* eslint-disable-next-line */
export interface CbsCloseDayProps {}

export const CbsCloseDay = () => {
  const [stopFetch, setStopFetch] = React.useState(false);
  const router = useRouter();

  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const user = useAppSelector((state) => state?.auth?.user);

  const methods = useForm();

  const { watch } = methods;

  const ignore = watch('ignore');

  const { mutateAsync: closeDay } = useSetEndOfDayDataMutation();

  const { data: eodStatusQueryData } = useGetEodStatusQuery(
    {},
    {
      onSuccess: async (res) => {
        if (
          res?.transaction?.eodStatus?.states?.transactionDate === EodState.Completed &&
          !res?.transaction?.eodStatus?.states?.headOfficeReady
        ) {
          setStopFetch(true);

          toast({ id: 'day-close-complete', type: 'success', message: 'Day closed successfully' });
          router.push('/');
        }
      },
      refetchInterval: stopFetch ? false : 2000,
      enabled: user?.currentBranch?.category === BranchCategory.HeadOffice,
    }
  );
  const showAdditionalFields = useMemo(() => {
    if (!eodStatusQueryData?.transaction?.eodStatus?.states?.currentBranchesReady) {
      return false;
    }

    if (
      Object.values(eodStatusQueryData?.transaction?.eodStatus?.states ?? {}).find(
        (value) => value === EodState.Ongoing
      )
    ) {
      return false;
    }

    return (
      eodStatusQueryData?.transaction?.eodStatus?.states?.transactionDate !== EodState.Completed
    );
  }, [eodStatusQueryData]);

  const dayCloseList = useMemo(() => {
    const eodStatus = eodStatusQueryData?.transaction?.eodStatus?.states;

    const eodError = eodStatusQueryData?.transaction?.eodStatus?.errors;

    if (!eodStatus?.currentBranchesReady) {
      return [
        {
          title: 'Branch Readiness',
          subTitle: 'Check if all the branches have completed branch readiness or not.',
          status: EodState.CompletedWithErrors,
          errors: eodError?.readiness as string[],
        },
      ];
    }

    return [
      {
        title: 'Branch Readiness',
        subTitle: 'Check if all the branches have completed branch readiness or not.',
        status: EodState.Completed,
      },
      {
        title: 'dayCloseDailyInterestBooking',
        subTitle: 'dayCloseInterestBooking',
        status: eodError ? eodStatus?.interestBooking : EodState.Completed,
        errors: eodError?.interestBooking as string[],
      },
      {
        title: 'dayCloseCheckFrequency',
        subTitle: 'dayCloseImplementthedayend',
        status: eodError ? eodStatus?.interestPosting : EodState.Completed,
        errors: eodError?.interestPosting as string[],
      },
      {
        title: 'dayCloseTransactionDateProgress',
        subTitle: 'dayCloseChecktransactiondate',
        status: eodStatus?.transactionDate ?? EodState.Completed,
      },
      {
        title: 'dayCloseCheckMaturity',
        subTitle: 'dayCloseCheckAccount',
        status: eodError ? eodStatus?.maturity : EodState.Completed,
        errors: eodError?.maturity as string[],
      },
      {
        title: 'Check Dormant',
        subTitle: 'Check if the account is dormant or not.',
        status: eodError ? eodStatus?.dormancy : EodState.Completed,
        errors: eodError?.dormancy as string[],
      },
      {
        title: 'Branch Readiness',
        subTitle: 'Check if all the branches have completed branch readiness or not.',
        status: eodError ? eodStatus?.cashInHand : EodState.Completed,
        errors: eodError?.cashInHand as string[],
      },
      {
        title: 'Cash with Teller',
        subTitle:
          'Check if the cash with teller at the start of day balances with the cash with teller at the end after all transactions have been completed.',
        status: eodError ? eodStatus?.cashInHand : EodState.Completed,
        errors: eodError?.cashInHand as string[],
      },
      {
        title: 'dayCloseCashVault',
        subTitle: 'dayCloseCheckCashVault',
        status: eodError ? eodStatus?.cashInVault : EodState.Completed,
        errors: eodError?.cashInVault as string[],
      },
      {
        title: 'Loan Interest Booking',
        subTitle:
          'Interest booking should be done for all the loan accounts before closing the day.',
        status: eodError ? eodStatus?.loanInterestBooking : EodState.Completed,
        errors: eodError?.loanInterestBooking as string[],
      },
    ];
  }, [eodStatusQueryData]);

  const eodStatus = eodStatusQueryData?.transaction?.eodStatus;

  const handleDayClose = () => {
    asyncToast({
      id: 'set-close-day-with-error',
      promise: closeDay({ option: EodOption.CompleteWithError }),
      msgs: {
        loading: 'Closing the Day',
        success: 'Day closed',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getEndOfDayDateData']);
        queryClient.invalidateQueries(['getEODStatus']);
        // router.push('/');
      },
      onError: () => {
        queryClient.invalidateQueries(['getEndOfDayDateData']);
        queryClient.invalidateQueries(['getEODStatus']);
        // router.push('/');
      },
    });
  };

  const isDayCloseDisabled = () => {
    if (!eodStatus?.states?.currentBranchesReady) {
      return true;
    }

    if (
      eodStatusQueryData?.transaction?.eodStatus?.states?.transactionDate !== EodState.Completed
    ) {
      return false;
    }

    if (!ignore) return true;

    if (!eodStatus?.states) return true;

    if (Object.values(eodStatus?.states ?? {}).find((value) => value === EodState.Ongoing))
      return true;

    return false;
  };

  useEffect(() => {
    if (user?.currentBranch?.category !== BranchCategory.HeadOffice) {
      router.push(ROUTES.HOME);
    }
  }, [user?.currentBranch]);

  return user?.currentBranch?.category === BranchCategory.HeadOffice ? (
    <>
      <Box bg="gray.100" width="100%" position="sticky" top={0} zIndex={10}>
        <Container minW="container.lg" height="fit-content" paddingInline="0">
          <FormHeader title={t['dayClose']} />
        </Container>
      </Box>
      <Container bg="white" minHeight="calc(100vh - 110px)" pb="90px" minW="container.lg">
        <FormProvider {...methods}>
          <DayClose showAdditionalFields={showAdditionalFields} dayCloseList={dayCloseList} />
        </FormProvider>
      </Container>
      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.lg" height="fit-content" p="0">
            <FormFooter
              mainButtonLabel={t['dayCloseCloseDay']}
              mainButtonHandler={
                eodStatusQueryData?.transaction?.eodStatus?.states?.transactionDate !==
                EodState.Completed
                  ? handleDayClose
                  : () => router?.push('/')
              }
              isMainButtonDisabled={isDayCloseDisabled()}
            />
          </Container>
        </Box>
      </Box>
    </>
  ) : (
    <Loader />
  );
};
export default CbsCloseDay;
