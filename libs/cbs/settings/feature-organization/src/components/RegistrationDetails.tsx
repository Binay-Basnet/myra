import { FormInput } from '@coop/shared/form';
import { Box, Grid, GridItem } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const RegistrationDetailsOrganization = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Grid templateColumns="repeat(3, 1fr)" gap="s16">
        <GridItem colSpan={2}>
          <FormInput
            label={t['settingsOrgRegRegdOffice']}
            __placeholder={t['settingsOrgRegEnterRegdOffice']}
            name="regdOffice"
          />
        </GridItem>
        <GridItem>
          <FormInput
            label={t['settingsOrgRegRegdNo']}
            __placeholder={t['settingsOrgRegEnterRegdNo']}
            name="regdNo"
          />
        </GridItem>
      </Grid>
      <Box mt="s16">
        <FormInput
          label={t['settingsOrgRegRegdAddress']}
          __placeholder={t['settingsOrgRegEnterRegdAddress']}
          name="regdAddress"
        />
      </Box>
      <Grid templateColumns="repeat(3, 1fr)" gap="s16" mt="s16">
        <GridItem>
          <FormInput
            label={t['settingsOrgRegPANVATNo']}
            __placeholder={t['settingsOrgRegPANVATNo']}
            name="panOrVat"
          />
        </GridItem>
      </Grid>
    </Box>
  );
};
