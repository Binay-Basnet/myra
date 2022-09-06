import { FormProvider, useForm } from 'react-hook-form';

import { CoopUnionInstitutionInformationInput } from '@coop/cbs/data-access';
import { FormAddress, FormInput } from '@coop/shared/form';
import { FormSection, GridItem } from '@coop/shared/ui';
import {
  getKymSectionCoOperativeUnion,
  useTranslation,
} from '@coop/shared/utils';

import { useCooperativeUnionInstitution } from '../../../hooks';

interface IRegisteredDetailsProps {
  setSection: (section: { section: string; subSection: string }) => void;
}

export const RegisteredDetails = ({ setSection }: IRegisteredDetailsProps) => {
  const { t } = useTranslation();

  const methods = useForm<CoopUnionInstitutionInformationInput>();

  useCooperativeUnionInstitution({ methods });

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionCoOperativeUnion(e.target.id);

          setSection(kymSection);
        }}
      >
        <FormSection
          id="kymCoopUnionAccRegisteredDetails"
          header="kymCoopUnionRegisteredDetails"
        >
          <FormInput
            type="number"
            name="regdNo"
            label={t['kymCoopUnionRegisteredNumber']}
          />
          <GridItem colSpan={2}>
            <FormInput
              type="text"
              name="issuingOffice"
              label={t['kymCoopUnionIssuingOffice']}
            />
          </GridItem>

          <FormAddress name="regdAddress" />
        </FormSection>
      </form>
    </FormProvider>
  );
};
