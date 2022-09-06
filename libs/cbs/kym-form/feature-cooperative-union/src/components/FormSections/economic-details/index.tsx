import { SectionContainer } from '@coop/cbs/kym-form/ui-containers';
import { Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { KymAssestsAndtarget } from './assets';
import { KymEquilities } from './equityandliabilities';
import { ExpenseDetails } from './expenseDetails';
import { IncomeDetails } from './incomeDetails';

interface economicDetailsProps {
  setSection: (section: { section: string; subSection: string }) => void;
}

export const EconomicDetails = (props: economicDetailsProps) => {
  const { t } = useTranslation();
  const { setSection } = props;

  return (
    <SectionContainer
      p="s20"
      borderBottom="1px solid"
      borderBottomColor="border.layout"
      gap="s32"
    >
      <Text fontSize="r3" fontWeight="600">
        {t['kymCoopUnionEco6EconomicDetails']}
      </Text>
      <KymAssestsAndtarget setSection={setSection} />
      <KymEquilities setSection={setSection} />
      <IncomeDetails setSection={setSection} />
      <ExpenseDetails setSection={setSection} />
    </SectionContainer>
  );
};
