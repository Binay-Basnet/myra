import { Box, Grid, GridItem, Select, TextInput } from '@saccos/myra/ui';

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];
export const AddressOrganization = () => {
  return (
    <Box>
      <Grid templateColumns="repeat(3, 1fr)" gap="s16">
        <GridItem>
          {' '}
          <Select label="Province" options={options} />
        </GridItem>
        <GridItem>
          {' '}
          <Select label="District" options={options} />
        </GridItem>
        <GridItem>
          {' '}
          <Select label="VDC / Municipality" options={options} />
        </GridItem>
        <GridItem>
          {' '}
          <TextInput label="Ward No" placeholder="Enter Ward" />
        </GridItem>
        <GridItem>
          {' '}
          <TextInput label="Locality" placeholder="Locality" />
        </GridItem>
      </Grid>
    </Box>
  );
};
