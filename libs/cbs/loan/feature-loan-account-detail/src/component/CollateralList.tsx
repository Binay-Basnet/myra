import { IoTrash } from 'react-icons/io5';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Chips,
  DetailsCard,
  Divider,
  IconButton,
  Text,
} from '@myra-ui';

import { AccordianListCardComponent } from './AccordianCard';

export const CollateralList = () => {
  const collatDetail = [
    {
      label: 'Owner Name',
      value: 'Godatta Prasad',
    },
    {
      label: 'Relation with Owner',
      value: 'Son',
    },
    {
      label: 'Sheet No.',
      value: '123',
    },
    {
      label: 'Kitta No.',
      value: '242343',
    },
    {
      label: 'Area',
      value: '53721 sq. ft ',
    },
    {
      label: 'Valuation Method',
      value: 'Godatta Prasad',
    },
    {
      label: 'Valuation Percent',
      value: 'Godatta Prasad',
    },
    {
      label: 'Valuator',
      value: 'Godatta Prasad',
    },
    {
      label: 'FMV (Mximum Amount)',
      value: 'Godatta Prasad',
    },
    {
      label: 'DV (Minimum Amount)',
      value: 'Godatta Prasad',
    },
    {
      label: 'Collateral Valuation',
      value: 'Godatta Prasad',
    },
  ];
  return (
    <DetailsCard title="Collateral List (3)" bg="white" hasTable>
      <Accordion defaultIndex={[0]} display="flex" flexDirection="column" gap="s16" allowToggle>
        <AccordionItem key={1}>
          <AccordionButton>
            <Box
              flex="1"
              display="flex"
              height="60px"
              px="s16"
              justifyContent="flex-start"
              gap="s8"
              alignItems="center"
            >
              <Box display="flex" flexDirection="column" gap="s4" textAlign="left">
                <Box display="flex" gap="s8" alignItems="center">
                  <Text fontSize="r1" color="gray.800" lineHeight="150%" fontWeight="SemiBold">
                    Kalanki Land
                  </Text>
                  <Chips variant="solid" type="label" size="sm" theme="success" label="Active" />
                </Box>
                <Text fontSize="s3" color="gray.500" lineHeight="125%" fontWeight="Regular">
                  Land
                </Text>
              </Box>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <AccordianListCardComponent accordionCardDetails={collatDetail} />
            {/* <Grid templateColumns="repeat(2,1fr)" gap="s20">
                {item?.docs?.map((docs) => (
                  <DocumentComponent keyText={docs?.key} value={docs?.value} />
                ))}
              </Grid> */}
            <Divider />
            <Box display="flex" w="50px" gap="s16" p="s16">
              <IconButton
                colorScheme="transparent"
                aria-label="Release"
                icon={<IoTrash />}
                color="danger.500"
                size="sm"
              />
              <Button color="danger.500" variant="link">
                Release
              </Button>
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </DetailsCard>
  );
};
