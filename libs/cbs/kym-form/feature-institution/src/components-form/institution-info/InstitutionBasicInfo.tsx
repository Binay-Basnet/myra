import { FormProvider, useForm } from 'react-hook-form';

import {
  FormFieldSearchTerm,
  KymInsInput,
  useGetInstitutionKymOptionsQuery,
} from '@coop/cbs/data-access';
import { FormDatePicker, FormInput, FormSelect } from '@coop/shared/form';
import { FormSection, GridItem } from '@coop/shared/ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

import { useInstitution } from '../hooks/useInstitution';
import { getOption } from '../../utils/getOptionsInstitution';

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const BasicDetailsInstitution = (props: IProps) => {
  const { t } = useTranslation();
  const methods = useForm<KymInsInput>({
    defaultValues: {},
  });
  const { setSection } = props;
  const { data: organizationFields, isLoading: OrganizationLoading } =
    useGetInstitutionKymOptionsQuery({
      searchTerm: FormFieldSearchTerm.OrganizationType,
    });
  useInstitution({ methods });

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
            <FormInput type="text" name="institutionName" label={t['kymInsNameofInstitution']} />
          </GridItem>
          <FormSelect
            name="institutionTypeId"
            label={t['kymInsOrganizationType']}
            options={getOption(organizationFields)}
            isLoading={OrganizationLoading}
          />
          <FormInput type="text" name="natureOfBusiness" label={t['kymInsNatureofBusiness']} />

          <FormDatePicker name="registrationDate" label={t['kymInsRegistrationDate']} />

          <FormInput type="number" name="vatOrPanNo" label={t['kymInsVATPanNo']} />

          <FormInput type="text" name="noOfBranches" label={t['serviceCenterNoOfServiceCenter']} />
        </FormSection>
      </form>
    </FormProvider>
  );
};
