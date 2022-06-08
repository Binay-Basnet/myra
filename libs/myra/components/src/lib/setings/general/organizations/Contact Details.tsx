import { Control } from 'react-hook-form';
import { Box, Grid, GridItem } from '@coop/myra/ui';

import { FormEmailInput } from '../../../newFormComponents/FormEmailInput';
import { FormPhoneNumber } from '../../../newFormComponents/FormPhoneNumber';
import { FormTextInput } from '../../../newFormComponents/FormTextInput';

type Props = {
  control: Control<any>;
};

export const ContactDetailsOrganization = ({ control }: Props) => {
  return (
    <Box>
      <Grid templateColumns="repeat(3, 1fr)" gap="s16">
        <GridItem>
          {' '}
          <FormPhoneNumber
            control={control}
            name={'contactNumber'}
            label={'Phone No'}
            placeholder={'Phone No'}
          />
        </GridItem>
        <GridItem>
          <FormEmailInput
            label="Email Address"
            placeholder="Email Address"
            name={'Email Address'}
            control={control}
          />
        </GridItem>
        <GridItem>
          {' '}
          <FormTextInput
            label="Website"
            placeholder="Website Address"
            name={'website'}
            control={control}
          />
        </GridItem>
      </Grid>
    </Box>
  );
};
