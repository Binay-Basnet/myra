import { FormProvider, useForm } from 'react-hook-form';

import { FormSection, GridItem } from '@myra-ui';

import {
  FormFieldSearchTerm,
  KymInsInput,
  useGetInstitutionKymOptionsQuery,
} from '@coop/cbs/data-access';
import { getOption } from '@coop/cbs/kym-form/institution';
import { FormDatePicker, FormInput, FormSelect } from '@coop/shared/form';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

import { useInstitution } from '../hooks/useInstitution';

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const BasicDetailsInstitution = (props: IProps) => {
  const { t } = useTranslation();
  const { setSection } = props;

  const methods = useForm<KymInsInput>();

  useInstitution({ methods });

  const { data: organizationFields, isLoading: OrganizationLoading } =
    useGetInstitutionKymOptionsQuery({
      searchTerm: FormFieldSearchTerm.OrganizationType,
    });

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionInstitution(e.target.id);
          setSection(kymSection);
        }}
      >
        <FormSection id="kymInsBasicInformation" header="kymInsBasicInformation">
          <GridItem colSpan={2}>
            <FormInput
              isRequired
              type="text"
              name="institutionName"
              label={t['kymInsNameofInstitution']}
            />
          </GridItem>
          <FormSelect
            isRequired
            name="institutionTypeId"
            label={t['kymInsOrganizationType']}
            options={getOption(organizationFields)}
            isLoading={OrganizationLoading}
          />
          <FormInput
            isRequired
            type="text"
            name="natureOfBusiness"
            label={t['kymInsNatureofBusiness']}
          />
          <FormDatePicker name="registrationDate" label={t['kymInsRegistrationDate']} maxToday />
          <FormInput isRequired type="number" name="vatOrPanNo" label={t['kymInsVATPanNo']} />
          <FormInput type="text" name="noOfBranches" label={t['serviceCenterNoOfServiceCenter']} />
        </FormSection>
      </form>
    </FormProvider>
  );
};
