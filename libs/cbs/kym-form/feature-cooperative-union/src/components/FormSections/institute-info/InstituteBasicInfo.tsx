import { FormProvider, useForm } from 'react-hook-form';

import { FormSection, GridItem } from '@myra-ui';

import {
  CoopUnionInstitutionInformationInput,
  FormFieldSearchTerm,
  useGetCoopUnionKymOptionsQuery,
} from '@coop/cbs/data-access';
import { FormDatePicker, FormInput, FormSelect } from '@coop/shared/form';
import { getKymSectionCoOperativeUnion, useTranslation } from '@coop/shared/utils';

import { useCoopUnionInstitution } from '../../../hooks/useCoopUnionInstitution';
import { getFieldOption } from '../../../utils/getFieldOption';

interface IInstituteBasicInfoProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const InstituteBasicInfo = ({ setSection }: IInstituteBasicInfoProps) => {
  const { t } = useTranslation();

  const methods = useForm<CoopUnionInstitutionInformationInput>();

  useCoopUnionInstitution({ methods });

  const { data: organizationTypeFields } = useGetCoopUnionKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.OrganizationType,
  });

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionCoOperativeUnion(e.target.id);

          setSection(kymSection);
        }}
      >
        <FormSection id="kymCoopUnionAccBasicInformation" header="kymCoopUnionBasicInformation">
          <GridItem colSpan={2}>
            <FormInput
              isRequired
              type="text"
              name="nameOfInstitutionEn"
              label={t['kymCoopUnionNameOfInstitution']}
            />
          </GridItem>
          <FormSelect
            isRequired
            name="institutionType"
            label={t['kymCoopUnionInstitutionType']}
            options={getFieldOption(organizationTypeFields)}
          />
          <FormInput
            isRequired
            type="text"
            name="natureOfBusinessEn"
            label={t['kymCoopUnionNatureOfBusiness']}
          />

          <FormDatePicker name="regdDate" label={t['kymCoopUnionRegistrationDate']} maxToday />
          <FormInput isRequired type="number" name="vatOrPan" label={t['kymCoopUnionVATPanNo']} />

          <FormInput type="text" name="noOfBranches" label={t['serviceCenterNoOfServiceCenter']} />
        </FormSection>
      </form>
    </FormProvider>
  );
};
