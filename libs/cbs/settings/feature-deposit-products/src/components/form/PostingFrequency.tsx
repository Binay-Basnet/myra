import { useRouter } from 'next/router';

import { FormSection, GridItem } from '@myra-ui';

import { DepositFrequency } from '@coop/cbs/data-access';
import { FormSwitchTab } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const PostingFrequency = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const postingFrequency = [
    {
      label: t['daily'],
      value: DepositFrequency.Daily,
      isDisabled: router?.asPath?.includes('/edit'),
    },
    {
      label: t['monthly'],
      value: DepositFrequency.Monthly,
      isDisabled: router?.asPath?.includes('/edit'),
    },
    {
      label: t['quaterly'],
      value: DepositFrequency.Quarterly,
      isDisabled: router?.asPath?.includes('/edit'),
    },
    {
      label: t['halfYearly'],
      value: DepositFrequency.HalfYearly,
      isDisabled: router?.asPath?.includes('/edit'),
    },
    {
      label: t['yearly'],
      value: DepositFrequency.Yearly,
      isDisabled: router?.asPath?.includes('/edit'),
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
