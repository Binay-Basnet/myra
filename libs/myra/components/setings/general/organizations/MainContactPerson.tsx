import {
  Grid,
  GridItem,
  PhoneNumber,
  Box,
  EmailInput,
  TextInput,
} from '../../../../ui/src';

export const MainContactPersonOrganization = () => {
  return (
    <Box>
      <Grid templateColumns="repeat(3, 1fr)" gap="s16">
        <GridItem>
          {' '}
          <TextInput label="Name" placeholder="Enter name" />
        </GridItem>
        <GridItem>
          <PhoneNumber label="Contact No" />
        </GridItem>
        <GridItem>
          {' '}
          <TextInput label="Title / Position" placeholder="Title / Position" />
        </GridItem>
      </Grid>
    </Box>
  );
};
