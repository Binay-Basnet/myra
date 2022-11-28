import { FormEmailInput, FormInput, FormPhoneNumber } from '@coop/shared/form';
import { Box, Grid, GridItem } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

export const ContactDetailsOrganization = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Grid templateColumns="repeat(3, 1fr)" gap="s16">
        <GridItem>
          <FormPhoneNumber
            name="phoneNumber"
            label={t['settingsOrgContactPhoneNo']}
            __placeholder={t['settingsOrgContactPhoneNo']}
          />
        </GridItem>
        <GridItem>
          <FormEmailInput
            label={t['settingsOrgContactEmailAddress']}
            __placeholder={t['settingsOrgContactEmailAddress']}
            name="email"
          />
        </GridItem>
        <GridItem>
          <FormInput
            label={t['settingsOrgContactWebsite']}
            __placeholder={t['settingsOrgContactWebsiteAddress']}
            name="website"
          />
        </GridItem>
      </Grid>
    </Box>
  );
};
