import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IoPlayOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Spinner } from '@chakra-ui/react';
import format from 'date-fns/format';

import { Box, Button, Chips, Icon, Text } from '@myra-ui';

import { useEodHistoryQuery, useGetEndOfDayDateDataQuery } from '@coop/cbs/data-access';
import { InputGroupContainer } from '@coop/cbs/settings/ui-containers';
import { ROUTES } from '@coop/cbs/utils';
import { FormDatePicker } from '@coop/shared/form';

export const EodList = () => {
  const router = useRouter();

  const [stopFetch, setStopFetch] = useState(false);

  const methods = useForm();

  const transactionDate = methods.watch('transactionDate');

  const { data: eodHistoryData } = useEodHistoryQuery(
    { transactionDate },
    {
      onSuccess: async (res) => {
        if (res?.endOfDay?.history?.[0]?.status !== 'ONGOING') {
          setStopFetch(true);
        }
      },
      refetchInterval: stopFetch ? false : 2000,
    }
  );

  const { data: endOfDayData } = useGetEndOfDayDateDataQuery();
  const closingDate = useMemo(() => endOfDayData?.transaction?.endOfDayDate?.value, [endOfDayData]);

  return (
    <>
      <FormProvider {...methods}>
        <InputGroupContainer>
          <FormDatePicker
            name="transactionDate"
            label="Transaction Date"
            minDate={closingDate?.local ? new Date(closingDate?.en ?? '') : new Date()}
          />
        </InputGroupContainer>
      </FormProvider>

      <Box display="flex" flexDirection="column" gap="s16">
        {eodHistoryData?.endOfDay?.history?.map((eod, index) => (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px="s16"
            py="s12"
            border="1px"
            borderColor="border.layout"
          >
            <Box display="flex" flexDirection="column" gap="s4">
              <Text fontSize="r2" fontWeight={600} color="gray.800">
                {format(new Date(eod?.eodDate ?? ''), 'dd MMMM, yyyy')}
              </Text>
              <Text fontSize="s2" fontWeight={400} color="gray.600">
                Day End: {format(new Date(eod?.completedTime ?? ''), 'dd MMM, yyyy')} at{' '}
                {format(new Date(eod?.completedTime ?? ''), 'KK:mm aaa')}
              </Text>
            </Box>

            <Box display="flex" alignItems="center" gap="64px">
              <Box display="flex" gap="s4">
                {eod?.status === 'ONGOING' ? (
                  <Chips
                    variant="solid"
                    theme="success"
                    size="sm"
                    type="status"
                    label="Ongoing"
                    icon={<Spinner />}
                  />
                ) : null}
                {eod?.errorCount ? (
                  <Chips
                    variant="solid"
                    theme="danger"
                    size="sm"
                    type="status"
                    label={`${eod.errorCount} Errors`}
                  />
                ) : null}
              </Box>
              <Box display="flex" gap="s16">
                <Button
                  variant="outline"
                  rightIcon={<Icon as={ChevronRightIcon} color="primary.500" />}
                  onClick={() =>
                    router.push(`${ROUTES.SETTINGS_EOD_HISTORY_DETAILS}?id=${eod?.eodDate}`)
                  }
                >
                  Full Details
                </Button>
                {index === 0 && endOfDayData?.transaction?.endOfDayDate?.isYearEnd && (
                  <Button
                    // variant="outline"
                    leftIcon={<Icon as={IoPlayOutline} color="white" />}
                    onClick={() => router.push(`${ROUTES.YEAR_END_CLOSE}`)}
                  >
                    Initiate Year End
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};
