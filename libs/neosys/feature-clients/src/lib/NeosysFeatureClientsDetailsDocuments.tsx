import { GrView } from 'react-icons/gr';
import { EditIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/react';

import { Box, Button, Grid, Text } from '@coop/shared/ui';

import { ClientDetailHeader } from './components';

/* eslint-disable-next-line */
export interface NeosysFeatureClientsDetailsDocumentsProps {}

export function NeosysFeatureClientsDetailsDocuments(
  props: NeosysFeatureClientsDetailsDocumentsProps
) {
  return (
    <Box bg="white" flexBasis="35%" borderRadius="4px">
      <ClientDetailHeader
        title="Documents"
        button={
          <Button variant="ghost" fontSize="r1" leftIcon={<EditIcon />}>
            Add New Document
          </Button>
        }
      />

      <Grid p="s16" gap="s16" templateColumns="repeat(2, 1fr)">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p="s8"
          border="1px solid"
          borderColor="border.layout"
          borderRadius="4px"
        >
          <Box display="flex" gap="s8" alignItems="center">
            <Box boxSize="36px">
              <Image src="/registration-doc.png" borderRadius="s4" />
            </Box>
            <Text fontSize="r1">Registration Doc</Text>
          </Box>

          <GrView />
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p="s8"
          border="1px solid"
          borderColor="border.layout"
          borderRadius="4px"
        >
          <Box display="flex" gap="s8" alignItems="center">
            <Box
              boxSize="36px"
              borderRadius="4px"
              border="1px solid"
              borderColor="border.layout"
            >
              <Image src="/moa.png" />
            </Box>
            <Text fontSize="r1">MOA</Text>
          </Box>

          <GrView />
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p="s8"
          border="1px solid"
          borderColor="border.layout"
          borderRadius="4px"
        >
          <Box display="flex" gap="s8" alignItems="center">
            <Box boxSize="36px">
              <Image src="/aoa.png" borderRadius="s4" />
            </Box>
            <Text fontSize="r1">AOA</Text>
          </Box>

          <GrView />
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p="s8"
          border="1px solid"
          borderColor="border.layout"
          borderRadius="4px"
        >
          <Box display="flex" gap="s8" alignItems="center">
            <Box boxSize="36px">
              <Image src="/bod.png" borderRadius="s4" />
            </Box>
            <Text fontSize="r1">BOD Decision</Text>
          </Box>

          <GrView />
        </Box>
      </Grid>
    </Box>
  );
}

export default NeosysFeatureClientsDetailsDocuments;
