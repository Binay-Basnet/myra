import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  DetailsCard,
} from '@myra-ui';

import { AccordianMemberDetailsCardComponent } from '../components/AccordianCard';

export const ApplicantDetails = () => (
  <DetailsCard title="Applicant Details" bg="white" hasTable>
    <Accordion defaultIndex={[0]} display="flex" flexDirection="column" gap="s16" allowToggle>
      <AccordionItem>
        <AccordionButton>
          <Box flex="1" textAlign="left" p="s16">
            person 1
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          {' '}
          <AccordianMemberDetailsCardComponent
            permanentAddress={{
              province: '1',
              district: 'morang',
              houseNo: 'dmsmdsmd',
              localGovernment: 'kdfdkfkd',
            }}
          />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton>
          <Box flex="1" textAlign="left" p="s16">
            person 2
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          {' '}
          <AccordianMemberDetailsCardComponent
            permanentAddress={{
              province: '1',
              district: 'morang',
              houseNo: 'dmsmdsmd',
              localGovernment: 'kdfdkfkd',
            }}
          />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  </DetailsCard>
);
