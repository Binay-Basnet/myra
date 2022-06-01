import React from 'react';
import { AiFillCaretRight, AiOutlineCaretDown } from 'react-icons/ai';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from '@chakra-ui/react';

const PersonalInformation: string[] = [
  'Basic Information',
  'Contact Details',
  'Identification Details',
  'Permanent Address',
  'Temporary Address',
  'Incase of residing in Rented House',
  'Family Details',
];
const ProfessionalDetails: string[] = [
  'Profession',
  'Main Profession',
  'Main Occupation of Husaband/Wife',
  'Income Source Details',
];
const SACCOSmembership: string[] = [
  'Main Purpose of Becoming a Member',
  'Member of Another Cooperative',
  'Family Member in this institution',
  'Financial Transaction Details',
  'Estimated Withdraw/Deposit Amount in the Institureion',
];
const Decleration: string[] = ['Declaration', 'Declaration of the Member'];
// const Text = chakra(Tab, {
//   baseStyle: {
//     color: '#474F5C',
//     height: '40px',
//     fontSize: '14px',
//     fontWeight: '400',
//     textAlign: 'left',
//     display: 'flex',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     border: 'none',
//     _selected: { color: '#37474F', bg: '#E2E8EE', fontWeight: '500' },
//   },
// });
export function AccorrdianAddMember() {
  return (
    <Accordion allowMultiple allowToggle mb="0">
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text fontSize={'s2'} fontWeight="600">
                  {' '}
                  1. Personal Details
                </Text>
              </Box>
              {isExpanded ? (
                <AiOutlineCaretDown fontSize="12px" />
              ) : (
                <AiFillCaretRight fontSize="12px" />
              )}
            </AccordionButton>

            <AccordionPanel pb={2}>
              {' '}
              {PersonalInformation.map((item, index) => (
                // <Text key={`${item}${index}`}>{item}</Text>
                <Text
                  mb="s16"
                  pl="s16"
                  fontSize="s2"
                  fontWeight="400"
                  key={`${item}${index}`}
                >
                  {item}
                </Text>
              ))}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text fontSize={'s2'} fontWeight="600">
                  {' '}
                  2. Professional Details
                </Text>
              </Box>
              {isExpanded ? (
                <AiOutlineCaretDown fontSize="12px" />
              ) : (
                <AiFillCaretRight fontSize="12px" />
              )}
            </AccordionButton>

            <AccordionPanel pb={2}>
              {' '}
              {ProfessionalDetails.map((item, index) => (
                <Text
                  key={`${item}${index}`}
                  mb="s16"
                  pl="s16"
                  fontSize="s2"
                  fontWeight="400"
                >
                  {item}
                </Text>
              ))}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text fontSize={'s2'} fontWeight="600">
                  {' '}
                  3. SACCOS Membership
                </Text>
              </Box>
              {isExpanded ? (
                <AiOutlineCaretDown fontSize="12px" />
              ) : (
                <AiFillCaretRight fontSize="12px" />
              )}
            </AccordionButton>

            <AccordionPanel pb={2}>
              {' '}
              {SACCOSmembership.map((item, index) => (
                <Text
                  key={`${item}${index}`}
                  mb="s16"
                  pl="s16"
                  fontSize="s2"
                  fontWeight="400"
                >
                  {item}
                </Text>
              ))}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text fontSize={'s2'} fontWeight="600">
                  {' '}
                  4. Decleration
                </Text>
              </Box>
              {isExpanded ? (
                <AiOutlineCaretDown fontSize="12px" />
              ) : (
                <AiFillCaretRight fontSize="12px" />
              )}
            </AccordionButton>

            <AccordionPanel pb={2}>
              {' '}
              {Decleration.map((item, index) => (
                <Text
                  key={`${item}${index}`}
                  mb="s16"
                  pl="s16"
                  fontSize="s2"
                  fontWeight="400"
                >
                  {item}
                </Text>
              ))}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
}
