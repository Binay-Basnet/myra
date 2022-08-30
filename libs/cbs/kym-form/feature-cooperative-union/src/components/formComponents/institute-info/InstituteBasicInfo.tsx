import { FormProvider, useForm } from 'react-hook-form';

import {
  CoopUnionInstitutionInformationInput,
  FormFieldSearchTerm,
  useGetCoopUnionKymOptionsQuery,
} from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { FormSection, GridItem } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';
import { getKymSectionCoOperativeUnion } from '@coop/shared/utils';

import { useCooperativeUnionInstitution } from '../../../hooks';
import { getFieldOption } from '../../../utils/getFieldOption';

interface IInstituteBasicInfoProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const InstituteBasicInfo = ({
  setSection,
}: IInstituteBasicInfoProps) => {
  const { t } = useTranslation();

  const methods = useForm<CoopUnionInstitutionInformationInput>();

  const { data: organizationTypeFields } = useGetCoopUnionKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.OrganizationType,
  });

  const { sectionStatus } = useCooperativeUnionInstitution({ methods });
  const sectionErrors = sectionStatus?.errors?.[0]?.errors;

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionCoOperativeUnion(e.target.id);

          setSection(kymSection);
        }}
      >
        <FormSection
          id="kymCoopUnionAccBasicInformation"
          header="kymCoopUnionBasicInformation"
        >
          <GridItem colSpan={2}>
            <FormInput
              // control={control}
              type="text"
              name="nameOfInstitutionEn"
              label={t['kymCoopUnionNameOfInstitution']}
              __placeholder={t['kymCoopUnionNameOfInstitution']}
              errorText={
                sectionErrors?.['nameOfInstitutionEn'] &&
                sectionErrors['nameOfInstitutionEn'][0]
              }
            />
          </GridItem>
          <FormSelect
            name="institutionType"
            label={t['kymCoopUnionInstitutionType']}
            __placeholder={t['kymCoopUnionSelectInstitutionType']}
            options={getFieldOption(organizationTypeFields)}
            errorText={
              sectionErrors?.['institutionType'] &&
              sectionErrors['institutionType'][0]
            }
          />
          <FormInput
            type="text"
            name="natureOfBusinessEn"
            label={t['kymCoopUnionNatureOfBusiness']}
            __placeholder={t['kymCoopUnionNatureOfBusiness']}
            errorText={
              sectionErrors?.['natureOfBusinessEn'] &&
              sectionErrors['natureOfBusinessEn'][0]
            }
          />

          <FormInput
            type="date"
            name="regdDate"
            label={t['kymCoopUnionRegistrationDate']}
            __placeholder="DD-MM-YYYY"
            errorText={
              sectionErrors?.['regdDate'] && sectionErrors['regdDate'][0]
            }
          />
          <FormInput
            type="number"
            name="vatOrPan"
            label={t['kymCoopUnionVATPanNo']}
            __placeholder={t['kymCoopUnionEnterVATPanNo']}
            errorText={
              sectionErrors?.['vatOrPan'] && sectionErrors['vatOrPan'][0]
            }
          />
          {/* <FormInput
          type="text"
          name="oprOfficeAddress"
          label={t['kymCoopUnionOperatingOfficeAddress']}
          __placeholder={t['kymCoopUnionOperatingOfficeAddress']}
        /> */}

          <FormInput
            type="text"
            name="noOfBranches"
            label={t['serviceCenterNoOfServiceCenter']}
            __placeholder={t['serviceCenterEnterNoOfServiceCenter']}
            errorText={
              sectionErrors?.['noOfBranches'] &&
              sectionErrors['noOfBranches'][0]
            }
          />

          {/* <FormInput
          type="text"
          name="branchOfficeAddress"
          label={t['kymCoopUnionBranchOfficeAddress']}
          __placeholder={t['kymCoopUnionBranchOfficeAddress']}
        /> */}
        </FormSection>
      </form>
    </FormProvider>
  );
};
