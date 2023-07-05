import { useFormContext } from 'react-hook-form';

import { Box, FormSection, GridItem } from '@myra-ui';

import { FormFieldSearchTerm, useGetIndividualKymOptionsQuery } from '@coop/cbs/data-access';
import { FormInput, FormMemberSelect, FormSelect, FormSwitchTab } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { getFieldOption } from '../../../utils/getFieldOption';

const booleanList = [
  {
    label: 'Yes',
    value: true,
  },
  {
    label: 'No',
    value: false,
  },
];

const KYMIndCoopBasicInformation = () => {
  const { t } = useTranslation();

  const { watch } = useFormContext();

  const { data: purposeData, isLoading: purposeLoading } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.Purpose,
  });

  const isMemberOfAnotherCooperative = watch('isMemberOfAnotherCooperative');

  return (
    <>
      <FormSection templateColumns={2} id="kymAccIndMainPurposeofBecomingMember">
        <FormSelect
          name="purposeId"
          label={t['kynIndMainpurposeofbecomingmember']}
          isLoading={purposeLoading}
          options={getFieldOption(purposeData)}
        />
      </FormSection>

      <FormSection>
        <GridItem colSpan={3}>
          <FormSwitchTab
            label={t['kynIndMemberofAnothercooperative']}
            options={booleanList}
            name="isMemberOfAnotherCooperative"
          />
        </GridItem>
        {isMemberOfAnotherCooperative && (
          <>
            <FormInput type="text" name="otherCoopName" label={t['kymIndCooperativeName']} />

            <FormInput name="otherCoopBranchId" label={t['kymIndCooperativeServiceCenter']} />

            <FormInput
              type="text"
              name="otherCoopMemberId"
              label={t['kymIndCooperativeMemberID']}
            />
          </>
        )}
      </FormSection>
    </>
  );
};

const KYMIndCoopIntroducers = () => {
  const { t } = useTranslation();

  return (
    <FormSection header="kymIndIntroducers" templateColumns={2}>
      <FormMemberSelect
        forceEnableAll
        name="firstIntroducerId"
        label={t['kymIndFirstIntroducer']}
      />

      <FormMemberSelect
        forceEnableAll
        name="secondIntroducerId"
        label={t['kymIndSecondIntroducer']}
      />
    </FormSection>
  );
};

export const KYMIndCoopBasicDetails = () => (
  <Box display="flex" flexDirection="column" id="kymAccIndIncomeSourceDetails">
    <KYMIndCoopBasicInformation />

    <KYMIndCoopIntroducers />
  </Box>
);
