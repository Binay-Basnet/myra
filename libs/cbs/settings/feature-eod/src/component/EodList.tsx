import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Spinner } from '@chakra-ui/react';
import format from 'date-fns/format';
import NepaliDate from 'nepali-date-converter';

import { Box, Chips, Text } from '@myra-ui';

import {
  DateType,
  store,
  useEodHistoryQuery,
  useGetEndOfDayDateDataQuery,
} from '@coop/cbs/data-access';
import { InputGroupContainer } from '@coop/cbs/settings/ui-containers';
import { FormDatePicker } from '@coop/shared/form';

export const EodList = () => {
  const dateType = store.getState().auth?.preference?.date || DateType.Ad;

  const [stopFetch, setStopFetch] = useState(false);

  const methods = useForm();

  const { data: endOfDayData } = useGetEndOfDayDateDataQuery();

  const closingDate = useMemo(() => endOfDayData?.transaction?.endOfDayDate?.value, [endOfDayData]);

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

  return (
    <>
      <FormProvider {...methods}>
        <InputGroupContainer>
          <FormDatePicker
            name="transactionDate"
            label="Transaction Date"
            maxDate={
              closingDate
                ? dateType === 'BS'
                  ? new NepaliDate(closingDate?.np).toJsDate()
                  : new Date(closingDate?.en)
                : new Date()
            }
          />
        </InputGroupContainer>
      </FormProvider>

      <Box display="flex" flexDirection="column" gap="s16">
        {eodHistoryData?.endOfDay?.history?.map((eod) => (
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
                {format(new Date(eod?.completedTime ?? ''), 'KK:MMbbb')}
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
              {/* <Button
                variant="outline"
                rightIcon={<Icon as={ChevronRightIcon} color="primary.500" />}
              >
                Full Details
              </Button> */}
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};
