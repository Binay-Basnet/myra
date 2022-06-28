import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormEmailInput, FormInput, FormPhoneNumber } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const CurrentMemberDetails = () => {
  const { t } = useTranslation();
  return (
    <GroupContainer
      id="kymCoopUnionAccCurrentMembers"
      scrollMarginTop={'200px'}
    >
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        {t['kymCoopUnionCurrentMembers']}
      </Text>
      <InputGroupContainer>
        <FormInput
          type="number"
          name="noOfMaleMember"
          label={t['kymCoopUnionNoofMalemembers']}
          placeholder={t['kymCoopUnionEnternoofMaleMembers']}
        />
        <FormInput
          type="number"
          name="noOfFemaleMember"
          label={t['kymCoopUnionNoofFemalemembers']}
          placeholder={t['kymCoopUnionEnternoofFemaleMembers']}
        />
        <FormInput
          type="number"
          name="noOfInstitutionalMember"
          label={t['kymCoopUnionNoofInstitutionalmembers']}
          placeholder={t['kymCoopUnionEnternoofInstitutuionalMembers']}
        />
        <FormInput
          type="number"
          name="totalCurrentMmeber"
          label={t['kymCoopUnionTotalcurrentmembers']}
          placeholder={t['kymCoopUnionEntertotalcurrentmembers']}
        />
      </InputGroupContainer>
    </GroupContainer>
  );
};
