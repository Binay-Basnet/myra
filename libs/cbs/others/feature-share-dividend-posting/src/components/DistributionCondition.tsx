import { useFormContext } from 'react-hook-form';

import { Alert, Box, FormSection, GridItem, Text } from '@myra-ui';

import { DistributionCondition, DividendDistributionCondition } from '@coop/cbs/data-access';
import { FormNumberInput, FormSwitchTab } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

const months = [
  {
    label: 'firstMonth',
    name: 'firstMonth',
  },
  {
    label: 'secondMonth',
    name: 'secondMonth',
  },
  {
    label: 'thirdMonth',
    name: 'thirdMonth',
  },
  {
    label: 'fourthMonth',
    name: 'fourthMonth',
  },
  {
    label: 'fifthMonth',
    name: 'fifthMonth',
  },
  {
    label: 'sixthMonth',
    name: 'sixthMonth',
  },
  {
    label: 'seventhMonth',
    name: 'seventhMonth',
  },
  {
    label: 'eightMonth',
    name: 'eightMonth',
  },
  {
    label: 'ninthMonth',
    name: 'ninthMonth',
  },
  {
    label: 'tenthMonth',
    name: 'tenthMonth',
  },
  {
    label: 'eleventhMonth',
    name: 'eleventhMonth',
  },
  {
    label: 'twelfthMonth',
    name: 'twelfthMonth',
  },
];

export const DistributionConditionComp = () => {
  const { t } = useTranslation();

  const { watch } = useFormContext();

  const distributionCondition = watch('condition');

  return (
    <FormSection header={t['shareDividentDistributionCondition']}>
      <GridItem colSpan={3}>
        <FormSwitchTab
          name="condition"
          label={t['shareAddDifferentShareDividentRate']}
          options={[
            {
              label: t['shareDividentDaily'],
              value: DistributionCondition.Daily,
              isDisabled: true,
            },
            {
              label: t['shareDividentMonthly'],
              value: DistributionCondition.Monthly,
              isDisabled: true,
            },
            {
              label: t['shareDividentQuarterly'],
              value: DistributionCondition.Quarterly,
              isDisabled: true,
            },
          ]}
        />
      </GridItem>
      {distributionCondition === DistributionCondition.Daily && (
        <GridItem colSpan={3}>
          <Alert
            status="info"
            title="Interest is calculated daily and dividend is calculated based on the interest."
            hideCloseIcon
          />
        </GridItem>
      )}
      {distributionCondition === DistributionCondition.Quarterly && (
        <>
          <GridItem colSpan={3} display="flex" alignItems="center" justifyContent="space-between">
            <Text fontSize="r1" color="gray.800">
              {t['share1stQuarter']}
            </Text>
            <Box w="20%">
              <FormNumberInput
                name="dividendRate.quarterly.firstQuarter"
                size="sm"
                rightElement={
                  <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                    %
                  </Text>
                }
              />
            </Box>
          </GridItem>
          <GridItem colSpan={3} display="flex" alignItems="center" justifyContent="space-between">
            <Text fontSize="r1" color="gray.800">
              {t['share2ndQuarter']}
            </Text>
            <Box w="20%">
              <FormNumberInput
                name="dividendRate.quarterly.secondQuarter"
                size="sm"
                rightElement={
                  <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                    %
                  </Text>
                }
              />
            </Box>
          </GridItem>
          <GridItem colSpan={3} display="flex" alignItems="center" justifyContent="space-between">
            <Text fontSize="r1" color="gray.800">
              {t['share3rdQuarter']}
            </Text>
            <Box w="20%">
              <FormNumberInput
                name="dividendRate.quarterly.thirdQuarter"
                size="sm"
                rightElement={
                  <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                    %
                  </Text>
                }
              />
            </Box>
          </GridItem>
          <GridItem colSpan={3} display="flex" alignItems="center" justifyContent="space-between">
            <Text fontSize="r1" color="gray.800">
              {t['share4thQuarter']}
            </Text>
            <Box w="20%">
              <FormNumberInput
                name="dividendRate.quarterly.fourthQuarter"
                size="sm"
                rightElement={
                  <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                    %
                  </Text>
                }
              />
            </Box>
          </GridItem>
        </>
      )}
      {distributionCondition === DividendDistributionCondition?.Monthly && (
        <>
          {months.map(({ label, name }) => (
            <GridItem colSpan={3}>
              <Box
                display="flex"
                flexDir="row"
                alignItems="center"
                justifyContent="space-between"
                key={name}
                gap="s8"
              >
                <Text fontWeight="400" fontSize="r1">
                  {t[label]}
                </Text>
                <Box w="20%">
                  <FormNumberInput
                    name={`dividendRate.monthly.${name}`}
                    size="sm"
                    rightElement={
                      <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                        %
                      </Text>
                    }
                  />
                </Box>
              </Box>
            </GridItem>
          ))}
        </>
      )}
    </FormSection>
  );
};
