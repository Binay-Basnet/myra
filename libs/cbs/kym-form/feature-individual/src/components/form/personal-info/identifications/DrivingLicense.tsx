import { Box, FormSection, Text } from '@myra-ui';

import { FormDatePicker, FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const DrivingLicense = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Text p="s20" pb="0" fontSize="r1" fontWeight="medium" color="neutralColorLight.Gray-70">
        {t['kymIndDrivingLicense']}
      </Text>

      <FormSection>
        <FormInput
          isRequired
          type="text"
          name="identification.1.identificationNo"
          label={t['kymIndDrivingLicenseNo']}
        />

        <FormInput
          isRequired
          type="text"
          name="identification.1.place"
          label={t['kymIndDrivingLicenseIssuePlace']}
        />

        <FormDatePicker
          isRequired
          name="identification.1.date"
          label={t['kymIndDrivingLicenseIssueDate']}
          maxToday
        />
      </FormSection>
    </Box>
  );
};
