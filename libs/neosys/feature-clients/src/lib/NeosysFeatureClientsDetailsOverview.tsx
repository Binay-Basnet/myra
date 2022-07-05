import { GrView } from 'react-icons/gr';
import { EditIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/react';

import { Box, Button, Text } from '@coop/shared/ui';

import { ClientDetailHeader } from './components';

/* eslint-disable-next-line */
export interface NeosysFeatureClientsDetailsOverviewProps {}

export function NeosysFeatureClientsDetailsOverview(
  props: NeosysFeatureClientsDetailsOverviewProps
) {
  return (
    <Box display="flex" gap="s16">
      <Box bg="white" flexBasis="65%" borderRadius="4px">
        <ClientDetailHeader
          title="Edit"
          button={
            <Button variant="ghost" fontSize="r1" leftIcon={<EditIcon />}>
              Edit
            </Button>
          }
        />

        <Box p="s16" display="flex" flexDirection="column" gap="s8">
          <Box display="flex">
            <Text flexBasis="35%">Type</Text>
            <Text flexGrow={1}>SACCOS</Text>
          </Box>

          <Box display="flex">
            <Text flexBasis="35%">Code</Text>
            <Text flexGrow={1}>2345623465453</Text>
          </Box>

          <Box display="flex">
            <Text flexBasis="35%">PAN / VAT </Text>
            <Text flexGrow={1}>1234572q567456</Text>
          </Box>

          <Box display="flex">
            <Text flexBasis="35%">Regd No</Text>
            <Text flexGrow={1}>3453ASFDFSF12343</Text>
          </Box>

          <Box display="flex">
            <Text flexBasis="35%">Contact Number</Text>
            <Text flexGrow={1}>Ram Nepal</Text>
          </Box>

          <Box display="flex">
            <Text flexBasis="35%">Email</Text>
            <Text flexGrow={1}>ram@saccos.com</Text>
          </Box>

          <Box display="flex">
            <Text flexBasis="35%">Contact Number</Text>
            <Text flexGrow={1}>Kathmandu, Tokha Municipality-10</Text>
          </Box>
        </Box>
      </Box>

      <Box bg="white" flexBasis="35%" borderRadius="4px">
        <ClientDetailHeader
          title="Documents"
          button={
            <Button variant="ghost" fontSize="r1" leftIcon={<EditIcon />}>
              Edit
            </Button>
          }
        />

        <Box p="s16" display="flex" flexDirection="column" gap="s16">
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
        </Box>
      </Box>
    </Box>
  );
}

export default NeosysFeatureClientsDetailsOverview;
