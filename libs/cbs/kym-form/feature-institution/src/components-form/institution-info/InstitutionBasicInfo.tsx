import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSelect } from '@coop/shared/form';
import { Box, GridItem, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const BasicDetailsInstitution = () => {
  const { t } = useTranslation();
  return (
    <GroupContainer id="Basic Information" scrollMarginTop={'200px'}>
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        {t['kymInsBasicInformation']}
      </Text>
      <InputGroupContainer>
        <GridItem colSpan={2}>
          <FormInput
            // control={control}
            type="text"
            name={'institutionName'}
            label={t['kymInsNameofInstitution']}
            placeholder={t['kymInsNameofInstitution']}
          />
        </GridItem>
        <FormSelect
          name="institutionType"
          label={t['kymInsOrganizationType']}
          placeholder={t['kymInsSelectOrganizationType']}
          options={[
            { label: 'Banking', value: 'Male' },
            { label: 'Ngo', value: 'Female' },
            { label: 'Other', value: 'Other' },
          ]}
        />
        <FormInput
          type="text"
          name="natureOfBusiness"
          label={t['kymInsNatureofBusiness']}
          placeholder={t['kymInsNatureofBusiness']}
        />

        <FormInput
          type="date"
          name="registrationDate"
          label={t['kymInsRegistrationDate']}
          placeholder="DD-MM-YYYY"
        />
        <FormInput
          type="number"
          name="vatOrPanNo"
          label={t['kymInsVATPanNo']}
          placeholder={t['kymInsEnterVATPanNo']}
        />
        <FormInput
          type="text"
          name="operatingOfficeAddress"
          label={t['kymInsOperatingOfficeAddress']}
          placeholder={t['kymInsEnterAddress']}
        />

        <FormInput
          type="text"
          name="noOfBranches"
          label={t['kymInsNoofBranches']}
          placeholder={t['kymInsEnterNoofBranches']}
        />

        <FormInput
          type="text"
          name="branchOfficeAddress"
          label={t['kymInsBranchOfficeAddress']}
          placeholder={t['kymInsBranchOfficeAddress']}
        />
      </InputGroupContainer>
    </GroupContainer>
  );
};
