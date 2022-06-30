import { FormEmailInput } from '@coop/shared/form';
import { FormPhoneNumber } from '@coop/shared/form';
import { FormInput } from '@coop/shared/form';
import { Box, Grid, GridItem } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const ContactDetailsOrganization = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Grid templateColumns="repeat(3, 1fr)" gap="s16">
        <GridItem>
          <FormPhoneNumber
            name={'phoneNumber'}
            label={t['settingsOrgContactPhoneNo']}
            placeholder={t['settingsOrgContactPhoneNo']}
          />
        </GridItem>
        <GridItem>
          <FormEmailInput
            label={t['settingsOrgContactEmailAddress']}
            placeholder={t['settingsOrgContactEmailAddress']}
            name={'email'}
          />
        </GridItem>
        <GridItem>
          <FormInput
            label={t['settingsOrgContactWebsite']}
            placeholder={t['settingsOrgContactWebsiteAddress']}
            name={'website'}
          />
        </GridItem>
      </Grid>
    </Box>
  );
};
