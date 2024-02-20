import { Text } from '@myra-ui';

import { SectionContainer } from '@coop/cbs/kym-form/ui-containers';
import { useTranslation } from '@coop/shared/utils';

import { KymAssestsAndtarget } from './assets';
import { KymEquilities } from './equityandliabilities';
import { ExpenseDetails } from './expenseDetails';
import { IncomeDetails } from './incomeDetails';

export const EconomicDetails = () => {
  const { t } = useTranslation();

  return (
    <SectionContainer p="s20" borderBottom="1px solid" borderBottomColor="border.layout" gap="s32">
      <Text fontSize="r3" fontWeight="600">
        {t['kymCoopUnionAcc6EconomicDetails']}
      </Text>
      <KymAssestsAndtarget />
      <KymEquilities />
      <IncomeDetails />
      <ExpenseDetails />
    </SectionContainer>
  );
};
