import { useFormContext } from 'react-hook-form';

import { Box, FormSection } from '@myra-ui';

import { KymIndMemberInput } from '@coop/cbs/data-access';
import { KYMSection } from '@coop/cbs/kym-form/formElements';
import { FormCheckboxGroup } from '@coop/shared/form';

import { Citizenship, DrivingLicense, NationalID, Passport, VoterCard } from '../identifications';

const identificationOptions = [
  { value: 'citizenship', label: 'Citizenship' },
  { value: 'drivingLicense', label: 'Driving License' },
  { value: 'passport', label: 'Passport' },
  { value: 'voterCard', label: 'Voter Card' },
  { value: 'nationalId', label: 'National ID' },
];

export const KYMIndIdentificationDetails = () => {
  const { watch } = useFormContext<KymIndMemberInput>();

  const identificationValues = watch('identificationSelection');

  return (
    <Box>
      <FormSection
        id={KYMSection.INDIVIDUAL_IDENTIFICATION_DETAILS}
        flexLayout
        isRequired
        header="kymIndIDENTIFICATIONDETAILS"
        subHeader="kymIndChooseidentificationdetails"
      >
        <FormCheckboxGroup
          name="identificationSelection"
          showOther={false}
          list={identificationOptions}
        />
      </FormSection>

      <Box mt="s16" display="flex" flexDirection="column">
        {identificationValues?.includes('citizenship') && <Citizenship />}

        {identificationValues?.includes('drivingLicense') && <DrivingLicense />}

        {identificationValues?.includes('passport') && <Passport />}

        {identificationValues?.includes('voterCard') && <VoterCard />}

        {identificationValues?.includes('nationalId') && <NationalID />}
      </Box>
    </Box>
  );
};
