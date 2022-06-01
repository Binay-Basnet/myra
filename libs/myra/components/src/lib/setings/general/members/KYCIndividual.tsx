import { AiFillCaretRight, AiOutlineCaretDown } from 'react-icons/ai';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/react';
import { Box, Text } from '@saccos/myra/ui';

const KYCIndividualPersonal = () => {
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
};
