import { Control } from 'react-hook-form';

import { FormInput } from '@coop/shared/form';
import { Box, Grid, GridItem } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

type Props = {
  control: Control<any>;
};

export const RegistrationDetailsOrganization = ({ control }: Props) => {
  const { t } = useTranslation();
  return (
    <Box>
      <Grid templateColumns="repeat(3, 1fr)" gap="s16">
        <GridItem colSpan={2}>
          <FormInput
            label={t['settingsOrgRegRegdOffice']}
            placeholder={t['settingsOrgRegRegdOffice']}
            control={control}
            name="regdOffice"
          />
        </GridItem>
        <GridItem>
          <FormInput
            label={t['settingsOrgRegRegdNo']}
            placeholder={t['settingsOrgRegRegdNo']}
            control={control}
            name={'regdNo'}
          />
        </GridItem>
      </Grid>
      <Box mt="s16">
        <FormInput
          label={t['settingsOrgRegRegdAddress']}
          placeholder={t['settingsOrgRegRegdAddress']}
          control={control}
          name="regdAddress"
        />
      </Box>
      <Grid templateColumns="repeat(3, 1fr)" gap="s16" mt={'s16'}>
        <GridItem>
          <FormInput
            label={t['settingsOrgRegPANVATNo']}
            placeholder={t['settingsOrgRegPANVATNo']}
            control={control}
            name="panOrVat"
          />
        </GridItem>
      </Grid>
    </Box>
  );
};
