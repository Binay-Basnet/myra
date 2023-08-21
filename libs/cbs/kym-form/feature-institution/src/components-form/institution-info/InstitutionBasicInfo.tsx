import { FormSection, GridItem } from '@myra-ui';

import { FormFieldSearchTerm, useGetInstitutionKymOptionsQuery } from '@coop/cbs/data-access';
import { getOption } from '@coop/cbs/kym-form/institution';
import { FormDatePicker, FormInput, FormSelect } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const BasicDetailsInstitution = () => {
  const { t } = useTranslation();

  const { data: organizationFields, isLoading: OrganizationLoading } =
    useGetInstitutionKymOptionsQuery({
      searchTerm: FormFieldSearchTerm.OrganizationType,
    });

  return (
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
  );
};
