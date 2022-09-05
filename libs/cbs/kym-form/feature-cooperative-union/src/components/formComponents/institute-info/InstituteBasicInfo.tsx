import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  CoopUnionInstitutionInformationInput,
  FormFieldSearchTerm,
  useGetCoopUnionKymOptionsQuery,
} from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { FormSection, GridItem } from '@coop/shared/ui';
import {
  getKymSectionCoOperativeUnion,
  useTranslation,
} from '@coop/shared/utils';

import { useCooperativeUnionInstitution } from '../../../hooks';
import { getFieldOption } from '../../../utils/getFieldOption';

interface IInstituteBasicInfoProps {
  setSection: React.Dispatch<
    React.SetStateAction<{ section: string; subSection: string }>
  >;
}

export const InstituteBasicInfo = ({
  setSection,
}: IInstituteBasicInfoProps) => {
  const { t } = useTranslation();

  const methods = useForm<CoopUnionInstitutionInformationInput>();

  useCooperativeUnionInstitution({ methods });

  const { data: organizationTypeFields } = useGetCoopUnionKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.OrganizationType,
  });

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionCoOperativeUnion(e.target.id);

          setSection((prev) =>
            prev?.subSection !== kymSection.subSection ? kymSection : prev
          );
        }}
      >
        <FormSection
          id="kymCoopUnionAccBasicInformation"
          header="kymCoopUnionBasicInformation"
        >
          <GridItem colSpan={2}>
            <FormInput
              type="text"
              name="nameOfInstitutionEn"
              label={t['kymCoopUnionNameOfInstitution']}
            />
          </GridItem>
          <FormSelect
            name="institutionType"
            label={t['kymCoopUnionInstitutionType']}
            options={getFieldOption(organizationTypeFields)}
          />
          <FormInput
            type="text"
            name="natureOfBusinessEn"
            label={t['kymCoopUnionNatureOfBusiness']}
          />

          <FormInput
            type="date"
            name="regdDate"
            label={t['kymCoopUnionRegistrationDate']}
          />
          <FormInput
            type="number"
            name="vatOrPan"
            label={t['kymCoopUnionVATPanNo']}
          />

          <FormInput
            type="text"
            name="noOfBranches"
            label={t['serviceCenterNoOfServiceCenter']}
          />
        </FormSection>
      </form>
    </FormProvider>
  );
};
