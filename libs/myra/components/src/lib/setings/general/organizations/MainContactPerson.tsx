import { Control } from 'react-hook-form';
import { FormPhoneNumber } from '@coop/shared/form';
import { FormInput } from '@coop/shared/form';
import { Box, Grid, GridItem } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

type Props = {
  control: Control<any>;
};
export const MainContactPersonOrganization = ({ control }: Props) => {
  const { t } = useTranslation();
  return (
    <Box>
      <Grid templateColumns="repeat(3, 1fr)" gap="s16">
        <GridItem>
          {' '}
          <FormInput
            label={t['settingsOrgMainName']}
            placeholder={t['settingsOrgMainEnterName']}
            name={'mainContactPersonName'}
            control={control}
          />
        </GridItem>
        <GridItem>
          <FormPhoneNumber
            label={t['settingsOrgMainContactNo']}
            name={'mainContactPersonNumber'}
            placeholder={t['settingsOrgMainContactPersonPhone']}
            control={control}
          />
        </GridItem>
        <GridItem>
          {' '}
          <FormInput
            label={t['settingsOrgMainDesignation']}
            placeholder={t['settingsOrgMainDesignation']}
            control={control}
            name={'mainContactPersonTitle'}
          />
        </GridItem>
      </Grid>
    </Box>
  );
};
