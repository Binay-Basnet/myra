import { FormInput, FormPhoneNumber } from '@coop/shared/form';
import { Box, Grid, GridItem } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const MainContactPersonOrganization = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Grid templateColumns="repeat(3, 1fr)" gap="s16">
        <GridItem>
          <FormInput
            label={t['settingsOrgMainName']}
            __placeholder={t['settingsOrgMainEnterName']}
            name="contactPersonName"
          />
        </GridItem>
        <GridItem>
          <FormPhoneNumber
            label={t['settingsOrgMainContactNo']}
            name="contactPersonContactNumber"
            __placeholder={t['settingsOrgMainContactPersonPhone']}
          />
        </GridItem>
        <GridItem>
          <FormInput
            label={t['settingsOrgMainDesignation']}
            __placeholder={t['settingsOrgMainDesignation']}
            name="title"
          />
        </GridItem>
      </Grid>
    </Box>
  );
};
