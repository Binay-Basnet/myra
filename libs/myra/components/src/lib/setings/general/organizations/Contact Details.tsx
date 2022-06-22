import { Control } from 'react-hook-form';

import { FormEmailInput } from '@coop/shared/form';
import { FormPhoneNumber } from '@coop/shared/form';
import { FormInput } from '@coop/shared/form';
import { Box, Grid, GridItem } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

type Props = {
  control: Control<any>;
};

export const ContactDetailsOrganization = ({ control }: Props) => {
  const { t } = useTranslation();
  return (
    <Box>
      <Grid templateColumns="repeat(3, 1fr)" gap="s16">
        <GridItem>
          {' '}
          <FormPhoneNumber
            control={control}
            name={'contactNumber'}
            label={t['settingsOrgContactPhoneNo']}
            placeholder={t['settingsOrgContactPhoneNo']}
          />
        </GridItem>
        <GridItem>
          <FormEmailInput
            label={t['settingsOrgContactEmailAddress']}
            placeholder={t['settingsOrgContactEmailAddress']}
            name={'Email Address'}
            control={control}
          />
        </GridItem>
        <GridItem>
          {' '}
          <FormInput
            label={t['settingsOrgContactWebsite']}
            placeholder={t['settingsOrgContactWebsiteAddress']}
            name={'website'}
            control={control}
          />
        </GridItem>
      </Grid>
    </Box>
  );
};
