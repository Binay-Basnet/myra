import { FormSelect } from '@coop/shared/form';
import { FormSection, GridItem, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const ShareAndAccount = () => {
  const { t } = useTranslation();

  return (
    <FormSection header={t['shareAndAccount']} subHeader={t['shareAndAccountSubtitle']}>
      <FormSelect name="accountForFractionalDividends" label={t['shareChooseAccount']} />

      <GridItem colSpan={3}>
        <Text fontWeight="Regular" color="neutralColorLight.Gray-80" fontSize="r1">
          {t['shareAndAccountNote']}
        </Text>
      </GridItem>
    </FormSection>
  );
};
