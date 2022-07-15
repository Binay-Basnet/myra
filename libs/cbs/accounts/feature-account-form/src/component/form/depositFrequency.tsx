import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSelect, FormSwitchTab } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const DepositFrequency = () => {
  const { t } = useTranslation();

  const daysList = [
    { label: t['accSunday'], value: 'sunday' },
    { label: t['accMonday'], value: 'monday' },
    { label: t['accTuesday'], value: 'tuesday' },
    { label: t['accWednesday'], value: 'wednesday' },
    { label: t['accThursday'], value: 'thursday' },
    { label: t['accFriday'], value: 'friday' },
    { label: t['accSaturday'], value: 'saturday' },
  ];

  const monthlyList = [
    { label: t['accDay'], value: 'day' },
    { label: t['accDayOfWeek'], value: 'dayOfWeek' },
  ];

  return (
    <GroupContainer
      scrollMarginTop={'200px'}
      display="flex"
      flexDirection={'column'}
      gap="s16"
    >
      <Box
        display="flex"
        flexDirection="column"
        p="s20"
        background="neutralColorLight.Gray-0"
      >
        <Text
          fontWeight="SemiBold"
          fontSize="r1"
          color="neutralColorLight.Gray-60"
        >
          {t['accDepositFrequency']}
        </Text>

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
          <Text
            fontSize="s3"
            color="neutralColorLight.Gray-80"
            fontWeight="Medium"
          >
            {t['accWeekly']}
          </Text>
          <Box>
            <Text
              fontSize="s3"
              color="neutralColorLight.Gray-80"
              fontWeight="Medium"
            >
              {t['accDayoftheWeek']}
            </Text>
            <FormSwitchTab
              name="paymentMode"
              options={daysList.map((value) => ({
                label: value.label,
                value: value.value,
              }))}
            />
          </Box>
        </Box>

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
            <Text
              fontWeight="SemiBold"
              fontSize="r1"
              color="neutralColorLight.Gray-60"
              mb="s4"
            >
              {t['accMonthly']}
            </Text>
            <Text
              fontSize="s3"
              color="neutralColorLight.Gray-80"
              fontWeight="Medium"
            >
              {t['accAddfrequencydayorweek']}
            </Text>
          </Box>
          <FormSwitchTab
            name="paymentMode"
            options={monthlyList.map((value) => ({
              label: value.label,
              value: value.value,
            }))}
          />
          <Box
            display="grid"
            mt="s16"
            gridTemplateColumns="repeat(3, 1fr)"
            gap={6}
          >
            <FormInput
              type="text"
              name="noOfReturnedShares"
              label={t['accDay']}
              placeholder={t['accEnterDay']}
            />
          </Box>
          <Box
            display="grid"
            mt="s16"
            gridTemplateColumns="repeat(3, 1fr)"
            gap={6}
          >
            <FormSelect
              name="memberId"
              label={t['accFrequencyDay']}
              placeholder={t['accFrequencyDay']}
              options={[
                {
                  label: '1',
                  value: '1',
                },
                {
                  label: '2',
                  value: '2',
                },
                {
                  label: '3',
                  value: '3',
                },
              ]}
            />

            <FormSelect
              name="memberId"
              label={t['accDayOfWeek']}
              placeholder={t['accDayOfWeek']}
              options={[
                {
                  label: 'Sunday',
                  value: 'sunday',
                },
                {
                  label: 'Monday',
                  value: 'monday',
                },
                {
                  label: 'Tuesday',
                  value: 'tuesday',
                },
              ]}
            />
          </Box>
        </Box>

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
            <Text
              fontWeight="SemiBold"
              fontSize="r1"
              color="neutralColorLight.Gray-60"
              mb="s4"
            >
              {t['accYearly']}
            </Text>
          </Box>
          <FormSwitchTab
            name="paymentMode"
            options={monthlyList.map((value) => ({
              label: value.label,
              value: value.value,
            }))}
          />
          <Box
            display="grid"
            mt="s16"
            gridTemplateColumns="repeat(3, 1fr)"
            gap={6}
          >
            <FormSelect
              name="memberId"
              label={t['accSelectMonth']}
              placeholder={t['accSelectMonth']}
              options={[
                {
                  label: 'January',
                  value: 'anuary',
                },
                {
                  label: 'February',
                  value: 'february',
                },
                {
                  label: 'March',
                  value: 'march',
                },
              ]}
            />

            <FormSelect
              name="memberId"
              label={t['accSelectDay']}
              placeholder={t['accSelectDay']}
              options={[
                {
                  label: 'Sunday',
                  value: 'sunday',
                },
                {
                  label: 'Monday',
                  value: 'monday',
                },
                {
                  label: 'Tuesday',
                  value: 'tuesday',
                },
              ]}
            />
          </Box>
        </Box>
      </Box>
    </GroupContainer>
  );
};
