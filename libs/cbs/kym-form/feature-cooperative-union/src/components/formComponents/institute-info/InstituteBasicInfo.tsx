import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSelect } from '@coop/shared/form';
import { GridItem, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const InstituteBasicInfo = () => {
  const { t } = useTranslation();
  return (
    <GroupContainer id="Basic Information" scrollMarginTop={'200px'}>
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
            name="nameOfInstitution"
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
          name="natureOfBusiness"
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
        <FormInput
          type="text"
          name="oprOfficeAddress"
          label={t['kymCoopUnionOperatingOfficeAddress']}
          placeholder={t['kymCoopUnionOperatingOfficeAddress']}
        />

        <FormInput
          type="text"
          name="noOfBranches"
          label={t['kymCoopUnionNoOfBranches']}
          placeholder={t['kymCoopUnionEnterNoOfBranches']}
        />

        <FormInput
          type="text"
          name="branchOfficeAddress"
          label={t['kymCoopUnionBranchOfficeAddress']}
          placeholder={t['kymCoopUnionBranchOfficeAddress']}
        />
      </InputGroupContainer>
    </GroupContainer>
  );
};
