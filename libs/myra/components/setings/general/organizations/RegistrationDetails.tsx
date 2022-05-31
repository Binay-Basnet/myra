import {
  Grid,
  GridItem,
  PhoneNumber,
  Box,
  EmailInput,
  TextInput,
} from '../../../../ui/src';

export const RegistrationDetailsOrganization = () => {
  return (
    <Box>
      <Grid templateColumns="repeat(3, 1fr)" gap="s16">
        <GridItem>
          <TextInput label="Regd No" placeholder="Regd No" />
        </GridItem>
        <GridItem colSpan={2}>
          <TextInput label="Regd Office" placeholder="Regd Office" />
        </GridItem>
      </Grid>
      <Box mt="s16">
        <TextInput label="Regd Address" placeholder="Regd Address" />
      </Box>
      <Grid templateColumns="repeat(3, 1fr)" gap="s16" mt={'s16'}>
        <GridItem>
          <TextInput label="PAN/VAT No" placeholder="PAN/VAT No" />
        </GridItem>
      </Grid>
    </Box>
  );
};
