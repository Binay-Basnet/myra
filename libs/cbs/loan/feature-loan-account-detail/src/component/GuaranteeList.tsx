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

export const GuaranteeList = () => {
  const guaranteeDetail = [
    {
      label: 'Member Name',
      value: 'Godatta Prasad',
    },
    {
      label: 'Account Name',
      value: 'Gold Saving Account',
    },
    {
      label: 'Available Balance',
      value: '12,000.00',
    },
    {
      label: 'Maximum Collateral Amount Available',
      value: '26,000.00',
    },
    {
      label: 'Total Gurantee Amount',
      value: '12,000.00',
    },
    {
      label: 'Gurantee Amount',
      value: '15,000.00',
    },
  ];
  return (
    <DetailsCard title="Guarantee List (3)" bg="white" hasTable>
      <Accordion defaultIndex={[0]} display="flex" flexDirection="column" gap="s16" allowToggle>
        <AccordionItem key={1}>
          <AccordionButton>
            <Box
              flex="1"
              display="flex"
              p="s4"
              justifyContent="flex-start"
              gap="s8"
              alignItems="center"
            >
              <Box display="flex" flexDirection="column" gap="s4" textAlign="left">
                <Box display="flex" gap="s8" alignItems="center">
                  <Text fontSize="r1" color="gray.800" lineHeight="150%" fontWeight="SemiBold">
                    Gold Saving Account
                  </Text>
                  <Chips variant="solid" type="label" size="sm" theme="success" label="Active" />
                </Box>
                <Text fontSize="s3" color="gray.500" lineHeight="125%" fontWeight="Regular">
                  Recurring Product
                </Text>
              </Box>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <AccordianListCardComponent columns={3} accordionCardDetails={guaranteeDetail} />
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
