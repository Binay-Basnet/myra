import { FormPhoneNumber } from '@coop/shared/form';
import { FormInput } from '@coop/shared/form';
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
            placeholder={t['settingsOrgMainEnterName']}
            name={'contactPersonName'}
          />
        </GridItem>
        <GridItem>
          <FormPhoneNumber
            label={t['settingsOrgMainContactNo']}
            name={'contactPersonContactNumber'}
            placeholder={t['settingsOrgMainContactPersonPhone']}
          />
        </GridItem>
        <GridItem>
          <FormInput
            label={t['settingsOrgMainDesignation']}
            placeholder={t['settingsOrgMainDesignation']}
            name={'title'}
          />
        </GridItem>
      </Grid>
    </Box>
  );
};
