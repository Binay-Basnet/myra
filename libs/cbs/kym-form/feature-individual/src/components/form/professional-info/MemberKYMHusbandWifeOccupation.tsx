import { useFormContext } from 'react-hook-form';

import { FormSection, GridItem, Text } from '@myra-ui';

import {
  FormFieldSearchTerm,
  KymIndMemberInput,
  useGetIndividualKymOptionsQuery,
} from '@coop/cbs/data-access';
import {
  FormAmountInput,
  FormCheckbox,
  FormDatePicker,
  FormInput,
  FormPhoneNumber,
  FormSelect,
} from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { getFieldOption } from '../../../utils/getFieldOption';

export const MemberKYMHusbandWifeOccupation = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext<KymIndMemberInput>();
  const { data: occupationData } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.Occupation,
  });

  const isOwner = watch(`spouseOccupation.isOwner`);
  const maritalStatusId = watch('maritalStatusId');

  const { data: maritalStatusData } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.MaritalStatus,
  });

  if (
    getFieldOption(maritalStatusData)?.find((m) => m.value === maritalStatusId)?.label !== 'Married'
  ) {
    return null;
  }

  return (
    <FormSection
      header="kymIndEnterMAINOCCUPATIONOFHUSBANDWIFE"
      id="kymAccIndMainOccupationofHusabandWife"
    >
      <FormSelect
        name="spouseOccupation.occupationId"
        id="spouseOccupationId"
        label={t['kymIndOccupation']}
        options={getFieldOption(occupationData)}
      />
      <GridItem colSpan={2}>
        <FormInput
          type="text"
          name="spouseOccupation.orgName"
          id="spouseOrgName"
          label={t['kymIndOccupationOrgFirmName']}
        />
      </GridItem>
      <FormInput
        type="number"
        name="spouseOccupation.panVatNo"
        id="spousePanVatNo"
        label={t['kymIndOccupationPanVATNo']}
      />
      <FormInput
        type="text"
        name="spouseOccupation.address"
        id="spouseAddress"
        label={t['kymIndOccupationAddress']}
      />
      <FormAmountInput
        type="number"
        id="spouseEstimatedAnnualIncome"
        name="spouseOccupation.estimatedAnnualIncome"
        label={t['kymIndOccupationEstimatedAnnualIncome']}
      />

      <GridItem colSpan={3} display="flex" gap="9px" alignItems="center">
        <FormCheckbox name="spouseOccupation.isOwner" id="spouseIsOwner" />
        <Text variant="formLabel">{t['kymIndOccupationAreyouowner']}</Text>
      </GridItem>

      {isOwner && (
        <>
          <FormDatePicker
            id="spouseEstablishedDate"
            name="spouseOccupation.establishedDate"
            label={t['kymIndOccupationEstablishedDate']}
          />
          <FormInput
            type="number"
            id="spouseRegistrationNo"
            name="spouseOccupation.registrationNo"
            label={t['kymIndOccupationRegistrationNo']}
          />
          <FormPhoneNumber
            type="number"
            id="spouseContact"
            name="spouseOccupation.contact"
            label={t['kymIndOccupationContactNo']}
          />
        </>
      )}
    </FormSection>
  );
};
