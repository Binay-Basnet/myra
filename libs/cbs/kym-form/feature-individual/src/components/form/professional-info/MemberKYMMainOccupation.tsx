import { useFormContext } from 'react-hook-form';
import { isEmpty } from 'lodash';

import { GridItem } from '@myra-ui/components';
import { Box, Text } from '@myra-ui/foundations';
import { FormSection } from '@myra-ui/templates';

import {
  FormFieldSearchTerm,
  KymIndMemberInput,
  useGetConfigQuery,
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

export const MemberKYMMainOccupation = () => {
  const { watch } = useFormContext<KymIndMemberInput>();
  const { t } = useTranslation();

  const isOwner = watch(`mainOccupation.isOwner`);
  const professionId = watch('professionId');

  const { data: occupationData } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.Occupation,
  });

  const foreignEmploymentId = getFieldOption(occupationData)?.find(
    (a) => a.label === 'Foreign Employment'
  )?.value;

  return (
    <Box id="kymAccIndMainProfession" scrollMarginTop="200px">
      <FormSection header={t['kymIndMainOccupation']}>
        <FormSelect
          name="mainOccupation.occupationId"
          label={t['kymIndOccupation']}
          options={
            professionId?.map((data) => ({
              label: String(
                getFieldOption(occupationData)?.find((prev) => prev.value === data)?.label
              ),
              value: data as string,
            })) ?? []
          }
        />
        <GridItem colSpan={2}>
          <FormInput
            type="text"
            name="mainOccupation.orgName"
            label={t['kymIndOccupationOrgFirmName']}
          />
        </GridItem>

        <FormInput
          type="number"
          name="mainOccupation.panVatNo"
          label={t['kymIndOccupationPanVATNo']}
        />
        <FormInput type="text" name="mainOccupation.address" label={t['kymIndOccupationAddress']} />
        <FormAmountInput
          type="number"
          name="mainOccupation.estimatedAnnualIncome"
          label={t['kymIndOccupationEstimatedAnnualIncome']}
        />

        <GridItem colSpan={3} display="flex" gap="9px" alignItems="center">
          <FormCheckbox name="mainOccupation.isOwner" />
          <Text variant="formLabel">{t['kymIndOccupationAreyouowner']}</Text>
        </GridItem>

        {isOwner && (
          <>
            <FormDatePicker
              name="mainOccupation.establishedDate"
              label={t['kymIndOccupationEstablishedDate']}
            />
            <FormInput
              name="mainOccupation.registrationNo"
              label={t['kymIndOccupationRegistrationNo']}
            />
            <FormPhoneNumber name="mainOccupation.contact" label={t['kymIndOccupationContactNo']} />
          </>
        )}
      </FormSection>

      {professionId?.includes(foreignEmploymentId || '') ? <ForeignOccupation /> : null}
    </Box>
  );
};

const visaTypes = [
  { label: 'Student', value: 'Student' },
  { label: 'Employement', value: 'Employement' },
  { label: 'Tourist', value: 'Tourist' },
];
const ForeignOccupation = () => {
  const { t } = useTranslation();

  const countryList = useGetConfigQuery()?.data?.config?.countries ?? [];
  const countryOptions = !isEmpty(countryList)
    ? countryList?.map((item) => ({
        label: item?.name ?? '',
        value: item?.code ?? '',
      }))
    : [];

  return (
    <FormSection header="kymIndForeignEmploymentDetails">
      <FormSelect
        id="nameOfCountry"
        name="foreignEmpCountryId"
        label={t['kymIndNameofCountry']}
        options={countryOptions}
      />
      <FormSelect
        id="typeOfVisa"
        name="typeOfVisaId"
        label={t['kymIndTypeofVisa']}
        options={visaTypes}
      />
      <FormAmountInput
        bg="white"
        name="foreignEstimatedAnnualIncome"
        id="estimatedAnnualIncome"
        label={t['kymIndEstimatedAnnualIncome']}
        helperText={t['kymIndWriteStudentVISA']}
      />
    </FormSection>
  );
};
