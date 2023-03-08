import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, Text } from '@myra-ui';

import {
  Frequency,
  FrequencyDay,
  Months,
  useGetAccountOpenProductDetailsQuery,
  Week,
  WeeklyFrequency,
} from '@coop/cbs/data-access';
import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSelect, FormSwitchTab } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const DepositFrequency = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const monthly = watch('depositFrequencyMonthly');
  const [triggerQuery, setTriggerQuery] = useState(false);
  const products = watch('productId');
  useEffect(() => {
    if (products) {
      setTriggerQuery(true);
    }
  }, [products]);
  const productdata = useGetAccountOpenProductDetailsQuery(
    { id: products },
    {
      enabled: triggerQuery,
    }
  );
  const productDeposit =
    productdata?.data?.settings?.general?.depositProduct?.formState?.data?.depositFrequency;

  const daysList = [
    { label: t['accSunday'], value: Week.Sunday },
    { label: t['accMonday'], value: Week.Monday },
    { label: t['accTuesday'], value: Week.Tuesday },
    { label: t['accWednesday'], value: Week.Wednesday },
    { label: t['accThursday'], value: Week.Thursday },
    { label: t['accFriday'], value: Week.Friday },
    { label: t['accSaturday'], value: Week.Saturday },
  ];

  const frequencyDayList = [
    { label: 'First', value: FrequencyDay?.First },
    { label: 'Second', value: FrequencyDay?.Second },
    { label: 'Third', value: FrequencyDay?.Third },
    { label: 'Last', value: FrequencyDay?.Last },
  ];

  const monthlyList = [
    { label: t['accDay'], value: WeeklyFrequency.Day },
    { label: t['accDayOfWeek'], value: WeeklyFrequency.DayOfTheWeek },
  ];

  const monthsList = [
    { label: 'January', value: Months.January },
    { label: 'Febuary', value: Months.February },
    { label: 'March', value: Months.March },
    { label: 'April', value: Months.April },
    { label: 'May', value: Months.May },
    { label: 'June', value: Months.June },
    { label: 'July', value: Months.July },
    { label: 'August', value: Months.August },
    { label: 'September', value: Months.September },
    { label: 'October', value: Months.October },
    { label: 'November', value: Months.November },
    { label: 'December', value: Months.December },
  ];

  return (
    <GroupContainer scrollMarginTop="200px" display="flex" flexDirection="column" gap="s16">
      <Box display="flex" flexDirection="column" background="neutralColorLight.Gray-0">
        <Text fontWeight="SemiBold" fontSize="r1" color="neutralColorLight.Gray-60">
          {t['accDepositFrequency']}
        </Text>

        {productDeposit === Frequency?.Daily && (
          <Text fontWeight="SemiBold" fontSize="s3">
            The Deposit Frequency is set to be Daily.
          </Text>
        )}
        {productDeposit === Frequency?.Weekly && (
          <Box
            display="flex"
            flexDirection="column"
            p="s16"
            mt="s16"
            gap={5}
            justifyContent="space-between"
            border="1px solid"
            borderColor="border.layout"
            borderRadius="br2"
          >
            <Text fontSize="s3" color="neutralColorLight.Gray-80" fontWeight="Medium">
              {t['accWeekly']}
            </Text>
            <Box display="flex" flexDirection="column" gap="s4">
              <Text fontSize="s3" color="neutralColorLight.Gray-80" fontWeight="Medium">
                {t['accDayoftheWeek']}
              </Text>
              <FormSwitchTab
                name="depositFrequencyWeekly"
                options={daysList.map((value) => ({
                  label: value.label,
                  value: value.value,
                }))}
              />
            </Box>
          </Box>
        )}
        {productDeposit === Frequency?.Monthly && (
          <Box
            display="flex"
            flexDirection="column"
            p="s20"
            mt="s16"
            background="neutralColorLight.Gray-0"
            border="1px solid"
            borderColor="border.layout"
            borderRadius="br2"
          >
            <Box mb="s16">
              <Text fontWeight="SemiBold" fontSize="r1" color="neutralColorLight.Gray-60" mb="s4">
                {t['accMonthly']}
              </Text>
              <Text fontSize="s3" color="neutralColorLight.Gray-80" fontWeight="Medium">
                {t['accAddfrequencydayorweek']}
              </Text>
            </Box>
            <FormSwitchTab
              name="depositFrequencyMonthly"
              options={monthlyList.map((value) => ({
                label: value.label,
                value: value.value,
              }))}
            />
            {monthly === WeeklyFrequency.Day && (
              <Box display="grid" mt="s16" gridTemplateColumns="repeat(3, 1fr)" gap="s16">
                <FormInput
                  type="number"
                  name="depositFrequencyDay"
                  label={t['accDay']}
                  __placeholder={t['accEnterDay']}
                />
              </Box>
            )}

            {monthly === WeeklyFrequency.DayOfTheWeek && (
              <Box display="grid" mt="s16" gridTemplateColumns="repeat(3, 1fr)" gap="s16">
                <FormSelect
                  name="depositFrequencyFrequencyDay"
                  label={t['accFrequencyDay']}
                  options={frequencyDayList}
                />

                <FormSelect
                  name="depositFrequencyDayOfWeek"
                  label={t['accDayOfWeek']}
                  __placeholder={t['accDayOfWeek']}
                  options={daysList}
                />
              </Box>
            )}
          </Box>
        )}
        {productDeposit === Frequency?.Yearly && (
          <Box
            display="flex"
            flexDirection="column"
            p="s16"
            mt="s16"
            background="neutralColorLight.Gray-0"
            border="1px solid"
            borderColor="border.layout"
            borderRadius="br2"
          >
            <Box>
              <Text fontWeight="SemiBold" fontSize="r1" color="neutralColorLight.Gray-60" mb="s4">
                {t['accYearly']}
              </Text>
            </Box>
            <Box display="grid" mt="s16" gridTemplateColumns="repeat(3, 1fr)" gap={6}>
              <FormSelect
                name="depositFrequencyYearlyMonth"
                label={t['accSelectMonth']}
                __placeholder={t['accSelectMonth']}
                options={monthsList}
              />

              <FormInput name="depositFrequencyYearlyDay" label={t['accSelectDay']} type="number" />
            </Box>
          </Box>
        )}

        <Box display="grid" mt="s16" gridTemplateColumns="repeat(3, 1fr)" gap="s16">
          <FormInput
            name="installmentAmount"
            label={t['accinstallmentAmount']}
            __placeholder="0.00"
            type="text"
            textAlign="right"
          />
        </Box>
      </Box>
    </GroupContainer>
  );
};
