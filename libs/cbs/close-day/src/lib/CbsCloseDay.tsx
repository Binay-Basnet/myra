import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, Container, FormFooter, FormHeader } from '@myra-ui';

import {
  EodOption,
  EodState,
  useGetEodStatusQuery,
  useSetEndOfDayDataMutation,
} from '@coop/cbs/data-access';
import { useTranslation } from '@coop/shared/utils';

import { DayClose } from '../component/DayClose';

/* eslint-disable-next-line */
export interface CbsCloseDayProps {}

export const CbsCloseDay = () => {
  const router = useRouter();

  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const methods = useForm();

  const { watch } = methods;

  const ignore = watch('ignore');

  const { mutateAsync: closeDay } = useSetEndOfDayDataMutation();

  const { data: eodStatusQueryData } = useGetEodStatusQuery();
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

  return (
    <>
      <Box bg="gray.100" width="100%" position="sticky" top={110} zIndex={10}>
        <Container minW="container.lg" height="fit-content" paddingInline="0">
          <FormHeader title={t['dayClose']} />
        </Container>
      </Box>
      <Container bg="white" minHeight="calc(100vh - 110px)" pb="90px" minW="container.lg">
        <FormProvider {...methods}>
          <DayClose />
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
  );
};
export default CbsCloseDay;
