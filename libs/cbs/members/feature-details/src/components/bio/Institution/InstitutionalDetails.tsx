import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  DetailsCard,
} from '@myra-ui';

import { AccordianMemberDetailsCardComponent } from './AccordianCard';
import { AccountOperationInstruction } from './AccountOperationInstruction';
import { AddressDetails } from './AddressDetails';
import { MemberInstitutionBasicInfo } from './BasicDetailsInstitution';
import { ContactDetailsInstitution } from './ContactDetailsIntitution';
import { OperatingOfficeAddress } from './OperatingOfficeAddressInstitution';
import { RegisteredDetails } from './RegisteredInstitution';
import { SisterConcernComponent } from './SisterConcernCard';
import { TransactionProfileDetails } from './TransactionProfileDetails';

export const BioInstitution = () => (
  <>
    <MemberInstitutionBasicInfo />
    <AddressDetails />
    <RegisteredDetails />
    <OperatingOfficeAddress />
    <ContactDetailsInstitution />
    <SisterConcernComponent
      address="NepalThok"
      name="Akash Dangol"
      phoneNo="98604444554"
      type="Agriculture"
    />
    <TransactionProfileDetails />
    <DetailsCard title="Account Operator Details" bg="white" hasTable>
      <Accordion defaultIndex={[0]} gap="s16">
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left" p="s16">
              Operator 1
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
              Operator 1
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
    <AccountOperationInstruction />
  </>
);
