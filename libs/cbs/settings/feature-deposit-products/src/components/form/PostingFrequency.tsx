import { FormSection, GridItem } from '@myra-ui';

import { DepositFrequency } from '@coop/cbs/data-access';
import { FormSwitchTab } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const PostingFrequency = () => {
  const { t } = useTranslation();

  const postingFrequency = [
    {
      label: t['daily'],
      value: DepositFrequency.Daily,
    },
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
      {/* <Box w="290px">
        <FormInput
          name="maxPostingFreqDifference"
          textAlign="right"
          label={t['depositProductMaximumPostingFrequencyDifference']}
          rightAddonText="days"
        />
      </Box> */}
    </FormSection>
  );
};
