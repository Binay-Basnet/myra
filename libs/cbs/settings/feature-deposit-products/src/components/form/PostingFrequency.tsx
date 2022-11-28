// import debounce from 'lodash/debounce';

import { DepositFrequency } from '@coop/cbs/data-access';
import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { Box, FormSection, GridItem } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

export const PostingFrequency = () => {
  const { t } = useTranslation();

  const postingFrequency = [
    {
      label: t['monthly'],
      value: DepositFrequency.Monthly,
    },
    {
      label: t['quaterly'],
      value: DepositFrequency.Quarterly,
    },
    {
      label: t['halfYearly'],
      value: DepositFrequency.HalfYearly,
    },
    {
      label: t['yearly'],
      value: DepositFrequency.Yearly,
    },
  ];

  return (
    <FormSection header="depositProductPostingFrequency">
      <GridItem colSpan={3}>
        <FormSwitchTab name="postingFrequency" options={postingFrequency} />
      </GridItem>
      <Box w="290px">
        <FormInput
          name="maxPostingFreqDifference"
          textAlign="right"
          label={t['depositProductMaximumPostingFrequencyDifference']}
          rightAddonText="days"
        />
      </Box>
    </FormSection>
  );
};
