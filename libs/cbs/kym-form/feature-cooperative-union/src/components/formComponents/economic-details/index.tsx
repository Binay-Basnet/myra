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

import { KymAssestsAndtarget } from './assets';
import { KymEquilities } from './equityandliabilities';
import { ExpenseDetails } from './expenseDetails';
import { IncomeDetails } from './incomeDetails';
import { useTranslation } from '@coop/shared/utils';

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
    <FormProvider {...methods}>
      <form
        onChange={debounce(() => {
          console.log('hello', getValues());
          mutate({ id, data: getValues() });
        }, 800)}
        onSubmit={handleSubmit((data) => {
          console.log('data', data);
        })}
        onFocus={(e) => {
          const kymSection = getKymSectionCoOperativeUnion(e.target.id);

          setSection(kymSection);
        }}
      >
        <SectionContainer>
          <Text fontSize="r3" fontWeight="600">
            {t['kymCoopUnionEco6EconomicDetails']}
          </Text>
          <ContainerWithDivider>
            <KymAssestsAndtarget watch={watch} />
            <KymEquilities watch={watch} />
            <IncomeDetails watch={watch} />
            <ExpenseDetails watch={watch} />
          </ContainerWithDivider>
        </SectionContainer>
      </form>
    </FormProvider>
  );
};
