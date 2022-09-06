import { FormProvider, useForm } from 'react-hook-form';

import { CoopUnionInstitutionInformationInput } from '@coop/cbs/data-access';
import { FormEmailInput, FormInput, FormPhoneNumber } from '@coop/shared/form';
import { FormSection } from '@coop/shared/ui';
import {
  getKymSectionCoOperativeUnion,
  useTranslation,
} from '@coop/shared/utils';

import { useCooperativeUnionInstitution } from '../../../hooks';

interface IContactDetailsProps {
  setSection: (section: { section: string; subSection: string }) => void;
}

export const ContactDetails = ({ setSection }: IContactDetailsProps) => {
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
          id="kymCoopUnionAccContactDetails"
          header="kymCoopUnionContactDetails"
        >
          <FormPhoneNumber name="phone" label={t['kymCoopUnionPhone']} />

          <FormInput type="number" name="fax" label={t['kymCoopUnionFax']} />

          <FormEmailInput name="contactEmail" label={t['kymCoopUnionEmail']} />

          <FormInput
            type="text"
            name="website"
            label={t['kymCoopUnionWebsiteLinkAny']}
          />

          <FormInput
            type="number"
            name="postBoxNo"
            label={t['kymCoopUnionPostBoxNo']}
          />
          <FormInput
            type="number"
            name="noOfEmployee"
            label={t['kymCoopUnionNumberOfEmployees']}
          />
          <FormInput
            type="date"
            name="lastAgmDate"
            label={t['kymCoopUnionAGMDetailsDate']}
          />
        </FormSection>
      </form>
    </FormProvider>
  );
};
