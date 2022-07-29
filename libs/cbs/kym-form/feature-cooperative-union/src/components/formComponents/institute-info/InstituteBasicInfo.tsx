import { FormProvider, useForm } from 'react-hook-form';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { CoopUnionInstitutionInformationInput } from '@coop/shared/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { GridItem, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';
import { getKymSectionCoOperativeUnion } from '@coop/shared/utils';

import { useCooperativeUnionInstitution } from '../../../hooks';

interface IInstituteBasicInfoProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const InstituteBasicInfo = ({
  setSection,
}: IInstituteBasicInfoProps) => {
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
              />
            </GridItem>
            <FormSelect
              name="institutionType"
              label={t['kymCoopUnionInstitutionType']}
              placeholder={t['kymCoopUnionSelectInstitutionType']}
              options={[
                { label: 'Banking', value: 'Male' },
                { label: 'NGO', value: 'Female' },
                { label: 'Other', value: 'Other' },
              ]}
            />
            <FormInput
              type="text"
              name="natureOfBusinessEn"
              label={t['kymCoopUnionNatureOfBusiness']}
              placeholder={t['kymCoopUnionNatureOfBusiness']}
            />

            <FormInput
              type="date"
              name="regdDate"
              label={t['kymCoopUnionRegistrationDate']}
              placeholder="DD-MM-YYYY"
            />
            <FormInput
              type="number"
              name="vatOrPan"
              label={t['kymCoopUnionVATPanNo']}
              placeholder={t['kymCoopUnionEnterVATPanNo']}
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
              label={t['kymCoopUnionNoOfBranches']}
              placeholder={t['kymCoopUnionEnterNoOfBranches']}
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
