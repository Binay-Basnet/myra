import { LuChevronsUpDown } from 'react-icons/lu';
import { useDisclosure } from '@chakra-ui/react';

import { Box, Collapse, FormSection, Grid, GridItem, Icon, Text } from '@myra-ui';

import { FormCheckboxGroup, FormFileInput, FormTextArea } from '@coop/shared/form';

export const MoreOption = () => {
  const collaps = useDisclosure();
  return (
    //   const { watch, setValue } = useFormContext();

    <FormSection
      subHeader="Check to enable and add details accordingly. "
      header="More Option"
      templateColumns={1}
      divider
    >
      <FormCheckboxGroup
        orientation="row"
        list={[
          { label: 'Contract', value: 'contract' },
          { label: 'Insurance', value: 'insurance' },
          { label: 'Warranty', value: 'warranty' },
          { label: 'Scheduled Maintenance', value: 'scheduledMaintenance' },
          { label: 'Deprecation', value: 'deprecation' },
        ]}
        name="list"
      />

      <GridItem colSpan={3}>
        <Box h="48px" alignItems="center" display="flex" justifyContent="space-between">
          <Text variant="pageHeader">Contract</Text>
          <Icon onClick={collaps.onToggle} cursor="pointer" as={LuChevronsUpDown} />
        </Box>
      </GridItem>
      <Collapse in={collaps.isOpen} style={{ width: '100%', paddingTop: '24px' }}>
        <Grid gridTemplateColumns="repeat(3,1fr)" gap="s20">
          <GridItem colSpan={1}>
            <FormFileInput name="attachment" label="Upload" />
          </GridItem>
          <GridItem colSpan={3}>
            <FormTextArea name="notes" label="Notes" />
          </GridItem>
        </Grid>
      </Collapse>
    </FormSection>
  );
};
