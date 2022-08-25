import { FormProvider, useForm } from 'react-hook-form';

import {
  CoopUnionInstitutionInformationInput,
  FormFieldSearchTerm,
  useGetCoopUnionKymOptionsQuery,
} from '@coop/cbs/data-access';
import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSelect } from '@coop/shared/form';
import { GridItem, Text } from '@coop/shared/ui';
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
  const sectionErrors = sectionStatus?.errors[0]?.errors;

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionCoOperativeUnion(e.target.id);

          setSection(kymSection);
        }}
      >
        <GroupContainer
          id="kymCoopUnionAccBasicInformation"
          scrollMarginTop={'200px'}
        >
          <Text
            fontSize="r1"
            fontWeight="semibold"
            color="neutralColorLight.Gray-80"
          >
            {t['kymCoopUnionBasicInformation']}
          </Text>
          <InputGroupContainer>
            <GridItem colSpan={2}>
              <FormInput
                // control={control}
                type="text"
                name="nameOfInstitutionEn"
                label={t['kymCoopUnionNameOfInstitution']}
                placeholder={t['kymCoopUnionNameOfInstitution']}
                errorText={
                  sectionErrors?.['nameOfInstitutionEn'] &&
                  sectionErrors['nameOfInstitutionEn'][0]
                }
              />
            </GridItem>
            <FormSelect
              name="institutionType"
              label={t['kymCoopUnionInstitutionType']}
              placeholder={t['kymCoopUnionSelectInstitutionType']}
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
              placeholder={t['kymCoopUnionNatureOfBusiness']}
              errorText={
                sectionErrors?.['natureOfBusinessEn'] &&
                sectionErrors['natureOfBusinessEn'][0]
              }
            />

            <FormInput
              type="date"
              name="regdDate"
              label={t['kymCoopUnionRegistrationDate']}
              placeholder="DD-MM-YYYY"
              errorText={
                sectionErrors?.['regdDate'] && sectionErrors['regdDate'][0]
              }
            />
            <FormInput
              type="number"
              name="vatOrPan"
              label={t['kymCoopUnionVATPanNo']}
              placeholder={t['kymCoopUnionEnterVATPanNo']}
              errorText={
                sectionErrors?.['vatOrPan'] && sectionErrors['vatOrPan'][0]
              }
            />
            {/* <FormInput
          type="text"
          name="oprOfficeAddress"
          label={t['kymCoopUnionOperatingOfficeAddress']}
          placeholder={t['kymCoopUnionOperatingOfficeAddress']}
        /> */}

            <FormInput
              type="text"
              name="noOfBranches"
              label={t['serviceCenterNoOfServiceCenter']}
              placeholder={t['serviceCenterEnterNoOfServiceCenter']}
              errorText={
                sectionErrors?.['noOfBranches'] &&
                sectionErrors['noOfBranches'][0]
              }
            />

            {/* <FormInput
          type="text"
          name="branchOfficeAddress"
          label={t['kymCoopUnionBranchOfficeAddress']}
          placeholder={t['kymCoopUnionBranchOfficeAddress']}
        /> */}
          </InputGroupContainer>
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
