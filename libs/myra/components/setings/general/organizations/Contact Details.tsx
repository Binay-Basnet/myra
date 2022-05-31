import {
  Grid,
  GridItem,
  PhoneNumber,
  Box,
  EmailInput,
  TextInput,
} from '../../../../ui/src';

export const ContactDetailsOrganization = () => {
  return (
    <Box>
      <Grid templateColumns="repeat(3, 1fr)" gap="s16">
        <GridItem>
          {' '}
          <PhoneNumber label="Phone No" />
        </GridItem>
        <GridItem>
          <EmailInput label="Email Address" />
        </GridItem>
        <GridItem>
          {' '}
          <TextInput label="Website" placeholder="Enter Website" />
        </GridItem>
      </Grid>
    </Box>
  );
};
