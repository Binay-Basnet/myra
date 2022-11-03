import { FormProvider, useForm } from 'react-hook-form';

import { KymInsInput } from '@coop/cbs/data-access';
import { FormAddress, FormInput } from '@coop/shared/form';
import { FormSection, GridItem } from '@coop/shared/ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

import { useInstitution } from '../hooks/useInstitution';

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const RegisteredDetailsInstitution = ({ setSection }: IProps) => {
  const { t } = useTranslation();
  const methods = useForm<KymInsInput>();

  useInstitution({ methods });

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionInstitution(e.target.id);
          setSection(kymSection);
        }}
      >
        <FormSection id="kymInsRegisteredDetails" header="kymInsRegisteredDetails">
          {' '}
          <FormInput
            id="registeredDetailsInstitution"
            type="number"
            name="registeredNumber"
            label={t['kymInsRegisteredNumber']}
          />
          <GridItem colSpan={2}>
            <FormInput
              id="registeredDetailsInstitution"
              type="text"
              name="issuingOffice"
              label={t['kymInsIssuingOffice']}
            />
          </GridItem>
          <FormAddress name="registeredAddress" />
        </FormSection>
      </form>
    </FormProvider>
  );
};
