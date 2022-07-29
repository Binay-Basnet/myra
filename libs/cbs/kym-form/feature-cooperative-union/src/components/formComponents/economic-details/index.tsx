import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';

import {
  ContainerWithDivider,
  SectionContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { useSetEconomicDetailsDataMutation } from '@coop/shared/data-access';
import { Text } from '@coop/shared/ui';
import { getKymSectionCoOperativeUnion } from '@coop/shared/utils';
import { useTranslation } from '@coop/shared/utils';

import { KymAssestsAndtarget } from './assets';
import { KymEquilities } from './equityandliabilities';
import { ExpenseDetails } from './expenseDetails';
import { IncomeDetails } from './incomeDetails';

interface economicDetailsProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const EconomicDetails = (props: economicDetailsProps) => {
  const { t } = useTranslation();
  const { setSection } = props;
  const router = useRouter();
  const id = String(router?.query?.['id']);
  const { mutate } = useSetEconomicDetailsDataMutation({});
  const methods = useForm({});
  const { handleSubmit, getValues, watch } = methods;

  return (
    <SectionContainer>
      <Text fontSize="r3" fontWeight="600">
        {t['kymCoopUnionEco6EconomicDetails']}
      </Text>
      <ContainerWithDivider>
        <KymAssestsAndtarget setSection={setSection} />
        <KymEquilities setSection={setSection} />
        <IncomeDetails setSection={setSection} />
        <ExpenseDetails setSection={setSection} />
      </ContainerWithDivider>
    </SectionContainer>
  );
};
