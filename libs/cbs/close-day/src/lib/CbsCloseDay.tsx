import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import {
  EodOption,
  EodState,
  useGetEodStatusQuery,
  useSetEndOfDayDataMutation,
} from '@coop/cbs/data-access';
import { asyncToast, Box, Container, FormFooter, FormHeader } from '@myra-ui';
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
        router.push('/');
      },
      onError: () => {
        queryClient.invalidateQueries(['getEndOfDayDateData']);
        router.push('/');
      },
    });
  };

  const isDayCloseDisabled = () => {
    if (!ignore) return true;

    if (!eodStatus) return true;

    if (Object.values(eodStatus).find((value) => value === EodState.Ongoing)) return true;

    return false;
  };

  return (
    <>
      <Box bg="gray.100" width="100%" position="sticky" top={110} zIndex={10}>
        <Container minW="container.lg" height="fit-content" paddingInline="0">
          <FormHeader title={t['dayClose']} />
        </Container>
      </Box>
      <Container bg="white" height="fit-content" pb="90px" minW="container.lg">
        <FormProvider {...methods}>
          <DayClose />
        </FormProvider>
      </Container>
      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.lg" height="fit-content" p="0">
            <FormFooter
              mainButtonLabel={t['dayCloseCloseDay']}
              mainButtonHandler={handleDayClose}
              isMainButtonDisabled={isDayCloseDisabled()}
            />
          </Container>
        </Box>
      </Box>
    </>
  );
};
export default CbsCloseDay;
