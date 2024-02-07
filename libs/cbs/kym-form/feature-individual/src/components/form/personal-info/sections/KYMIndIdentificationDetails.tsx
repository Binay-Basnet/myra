import { useFormContext } from 'react-hook-form';

import { Box, FormSection } from '@myra-ui';

import { KymIndMemberInput } from '@coop/cbs/data-access';
import { KYMSection } from '@coop/cbs/kym-form/formElements';
import { FormCheckboxGroup } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { Citizenship, DrivingLicense, NationalID, Passport, VoterCard } from '../identifications';

export const KYMIndIdentificationDetails = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext<KymIndMemberInput>();

  const identificationOptions = [
    { value: 'citizenship', label: t['kymIndIdentificationCitizenship'] },
    { value: 'drivingLicense', label: t['kymIndIdentificationDrivingLicense'] },
    { value: 'passport', label: t['kymIndIdentificationPassport'] },
    { value: 'voterCard', label: t['kymIndVoterCard'] },
    { value: 'nationalId', label: t['kymIndNationalID'] },
  ];

  const identificationValues = watch('identificationSelection');

  return (
    <Box>
      <FormSection
        id={KYMSection.INDIVIDUAL_IDENTIFICATION_DETAILS}
        flexLayout
        isRequired
        header="kymIndIdentificationDetails"
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
