import { FormProvider, useForm } from 'react-hook-form';

import { FormSection } from '@myra-ui';

import { CoopUnionInstitutionInformationInput } from '@coop/cbs/data-access';
import { FormDatePicker, FormEmailInput, FormInput, FormPhoneNumber } from '@coop/shared/form';
import { getKymSectionCoOperativeUnion, useTranslation } from '@coop/shared/utils';

import { useCoopUnionInstitution } from '../../../hooks/useCoopUnionInstitution';

interface IContactDetailsProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const ContactDetails = ({ setSection }: IContactDetailsProps) => {
  const { t } = useTranslation();

  const methods = useForm<CoopUnionInstitutionInformationInput>();
  useCoopUnionInstitution({ methods });

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionCoOperativeUnion(e.target.id);
          setSection(kymSection);
        }}
      >
        <FormSection id="kymCoopUnionAccContactDetails" header="kymCoopUnionContactDetails">
          <FormPhoneNumber isRequired name="phone" label={t['kymCoopUnionPhone']} />

          <FormInput type="number" name="fax" label={t['kymCoopUnionFax']} />

          <FormEmailInput isRequired name="contactEmail" label={t['kymCoopUnionEmail']} />

          <FormInput type="text" name="website" label={t['kymCoopUnionWebsiteLinkAny']} />

          <FormInput type="number" name="postBoxNo" label={t['kymCoopUnionPostBoxNo']} />
          <FormInput type="number" name="noOfEmployee" label={t['kymCoopUnionNumberOfEmployees']} />
          <FormDatePicker name="lastAgmDate" label={t['kymCoopUnionAGMDetailsDate']} />
        </FormSection>
      </form>
    </FormProvider>
  );
};
