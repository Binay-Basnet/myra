import { Control } from 'react-hook-form';
import { Box, Grid, GridItem, PhoneNumber, TextInput } from '@saccos/myra/ui';

import { FormEmailInput } from '../../../newFormComponents/FormEmailInput';
import { FormPhoneNumber } from '../../../newFormComponents/FormPhoneNumber';
import { FormTextInput } from '../../../newFormComponents/FormTextInput';
type Props = {
  control: Control<any>;
};
export const MainContactPersonOrganization = ({ control }: Props) => {
  return (
    <Box>
      <Grid templateColumns="repeat(3, 1fr)" gap="s16">
        <GridItem>
          {' '}
          <FormTextInput
            label="Name"
            placeholder="Enter name"
            name={'mainContactPersonName'}
            control={control}
          />
        </GridItem>
        <GridItem>
          <FormPhoneNumber
            label="Contact No"
            name={'mainContactPersonNumber'}
            placeholder="Enter Contact No"
            control={control}
          />
        </GridItem>
        <GridItem>
          {' '}
          <FormTextInput
            label="Title / Position"
            placeholder="Title / Position"
            control={control}
            name={'mainContactPersonTitle'}
          />
        </GridItem>
      </Grid>
    </Box>
  );
};
