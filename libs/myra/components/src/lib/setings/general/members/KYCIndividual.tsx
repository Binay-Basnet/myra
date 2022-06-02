import { CgCloseO, CgMenuGridO } from 'react-icons/cg';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import { AddIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/react';
import { Box, Button, Checkbox, Icon, Switch, Text } from '@saccos/myra/ui';
const genderDetails = ['Male', 'Female', 'Transgender'];

const Gender = () => {
  return (
    <Box>
      {genderDetails.map((item, index) => {
        return (
          <Box
            display={'flex'}
            key={`${item}${index}`}
            justifyContent={'space-between'}
            alignItems="center"
            h="60px"
          >
            <Box pr="s16" display={'flex'} justifyContent="flex-start">
              <Icon size="md" as={CgMenuGridO} />
              <Switch size="md" ml="s20" />
              <Text
                fontSize={'r1'}
                fontWeight="400"
                color={'gray.800'}
                ml="s20"
              >
                {item}
              </Text>
            </Box>
            <Icon as={CgCloseO} size="sm" />
          </Box>
        );
      })}
    </Box>
  );
};
const PersonalInformation = [
  'Gender',
  'Nationality',
  'Contact Details',
  'Education Qualification',
  'Religion',
  'Marital Status',
  'Family Relationship',
  'Identification Documents',
];

export const KYCIndividualPersonal = () => {
  return (
    <Accordion allowMultiple allowToggle mb="0">
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <AccordionButton bg={isExpanded ? '#E0E5EB' : ''} h="60px">
              <Box flex="1" textAlign="left">
                <Text fontSize={'r1'} fontWeight="600">
                  {' '}
                  Section 1 : Personal Information
                </Text>
              </Box>
              {isExpanded ? (
                <>
                  <Button
                    variant="ghost"
                    size={'md'}
                    shade="primary"
                    leftIcon={<AddIcon />}
                    mr="s8"
                  >
                    Add New Field
                  </Button>
                  <IoChevronUpOutline fontSize="18px" />
                </>
              ) : (
                <IoChevronDownOutline fontSize="18px" />
              )}
            </AccordionButton>

            <AccordionPanel pb={2}>
              <Accordion allowMultiple allowToggle mb="0" px="s12" pb="s12">
                {' '}
                {PersonalInformation.map((item, index) => (
                  // <Text key={`${item}${index}`}>{item}</Text>
                  <AccordionItem key={`${item}${index}`} mt="s12">
                    {({ isExpanded }) => (
                      <>
                        <AccordionButton
                          bg={isExpanded ? '#E0E5EB' : ''}
                          h="60px"
                        >
                          <Box flex="1" textAlign="left">
                            <Text fontSize={'r1'} fontWeight="500">
                              {' '}
                              {item}
                            </Text>
                          </Box>
                          {isExpanded ? (
                            <IoChevronUpOutline fontSize="18px" />
                          ) : (
                            <IoChevronDownOutline fontSize="18px" />
                          )}
                        </AccordionButton>
                        <AccordionPanel
                          pb={'0'}
                          border={'1px'}
                          borderColor={'border.layout'}
                        >
                          {Gender()}
                        </AccordionPanel>
                        <AccordionPanel pb="0">
                          <Box
                            display="flex"
                            alignItems={'center'}
                            justifyContent="space-between"
                            h="60px"
                          >
                            <Button
                              variant="ghost"
                              size={'md'}
                              shade="primary"
                              leftIcon={<AddIcon />}
                            >
                              Add New Option
                            </Button>
                            <Checkbox children="Show “Other” option" />
                          </Box>
                        </AccordionPanel>
                      </>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
      {/* ====================================================part 2 ============================================================== */}
      <AccordionItem mt="s16">
        {({ isExpanded }) => (
          <>
            <AccordionButton bg={isExpanded ? '#E0E5EB' : ''} h="60px">
              <Box flex="1" textAlign="left">
                <Text fontSize={'r1'} fontWeight="600">
                  {' '}
                  Section 2: Professional Information
                </Text>
              </Box>
              {isExpanded ? (
                <>
                  <Button
                    variant="ghost"
                    size={'md'}
                    shade="primary"
                    leftIcon={<AddIcon />}
                    mr="s8"
                  >
                    Add New Field
                  </Button>
                  <IoChevronUpOutline fontSize="18px" />
                </>
              ) : (
                <IoChevronDownOutline fontSize="18px" />
              )}
            </AccordionButton>

            <AccordionPanel pb={2}>
              <Accordion allowMultiple allowToggle mb="0" px="s12" pb="s12">
                {' '}
                {PersonalInformation.map((item, index) => (
                  // <Text key={`${item}${index}`}>{item}</Text>
                  <AccordionItem key={`${item}${index}`} mt="s12">
                    {({ isExpanded }) => (
                      <>
                        <AccordionButton
                          bg={isExpanded ? '#E0E5EB' : ''}
                          h="60px"
                        >
                          <Box flex="1" textAlign="left">
                            <Text fontSize={'r1'} fontWeight="500">
                              {' '}
                              {item}
                            </Text>
                          </Box>
                          {isExpanded ? (
                            <IoChevronUpOutline fontSize="18px" />
                          ) : (
                            <IoChevronDownOutline fontSize="18px" />
                          )}
                        </AccordionButton>
                        <AccordionPanel
                          pb={'0'}
                          border={'1px'}
                          borderColor={'border.layout'}
                        >
                          {Gender()}
                        </AccordionPanel>
                        <AccordionPanel pb="0">
                          <Box
                            display="flex"
                            alignItems={'center'}
                            justifyContent="space-between"
                            h="60px"
                          >
                            <Button
                              variant="ghost"
                              size={'md'}
                              shade="primary"
                              leftIcon={<AddIcon />}
                            >
                              Add New Option
                            </Button>
                            <Checkbox children="Show “Other” option" />
                          </Box>
                        </AccordionPanel>
                      </>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
      {/* ===============================================================part3===================================================== */}
      <AccordionItem mt="s16">
        {({ isExpanded }) => (
          <>
            <AccordionButton bg={isExpanded ? '#E0E5EB' : ''} h="60px">
              <Box flex="1" textAlign="left">
                <Text fontSize={'r1'} fontWeight="600">
                  {' '}
                  Section 3 : Cooperative Information
                </Text>
              </Box>
              {isExpanded ? (
                <>
                  <Button
                    variant="ghost"
                    size={'md'}
                    shade="primary"
                    leftIcon={<AddIcon />}
                    mr="s8"
                  >
                    Add New Field
                  </Button>
                  <IoChevronUpOutline fontSize="18px" />
                </>
              ) : (
                <IoChevronDownOutline fontSize="18px" />
              )}
            </AccordionButton>

            <AccordionPanel pb={2}>
              <Accordion allowMultiple allowToggle mb="0" px="s12" pb="s12">
                {' '}
                {PersonalInformation.map((item, index) => (
                  // <Text key={`${item}${index}`}>{item}</Text>
                  <AccordionItem key={`${item}${index}`} mt="s12">
                    {({ isExpanded }) => (
                      <>
                        <AccordionButton
                          bg={isExpanded ? '#E0E5EB' : ''}
                          h="60px"
                        >
                          <Box flex="1" textAlign="left">
                            <Text fontSize={'r1'} fontWeight="500">
                              {' '}
                              {item}
                            </Text>
                          </Box>
                          {isExpanded ? (
                            <IoChevronUpOutline fontSize="18px" />
                          ) : (
                            <IoChevronDownOutline fontSize="18px" />
                          )}
                        </AccordionButton>
                        <AccordionPanel
                          pb={'0'}
                          border={'1px'}
                          borderColor={'border.layout'}
                        >
                          {Gender()}
                        </AccordionPanel>
                        <AccordionPanel pb="0">
                          <Box
                            display="flex"
                            alignItems={'center'}
                            justifyContent="space-between"
                            h="60px"
                          >
                            <Button
                              variant="ghost"
                              size={'md'}
                              shade="primary"
                              leftIcon={<AddIcon />}
                            >
                              Add New Option
                            </Button>
                            <Checkbox children="Show “Other” option" />
                          </Box>
                        </AccordionPanel>
                      </>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
      {/* ============================================= part 4 ============================================================ */}
      <AccordionItem mt="s16">
        {({ isExpanded }) => (
          <>
            <AccordionButton bg={isExpanded ? '#E0E5EB' : ''} h="60px">
              <Box flex="1" textAlign="left">
                <Text fontSize={'r1'} fontWeight="600">
                  {' '}
                  Section 4 : Documents and Declarations
                </Text>
              </Box>
              {isExpanded ? (
                <>
                  <Button
                    variant="ghost"
                    size={'md'}
                    shade="primary"
                    leftIcon={<AddIcon />}
                    mr="s8"
                  >
                    Add New Field
                  </Button>
                  <IoChevronUpOutline fontSize="18px" />
                </>
              ) : (
                <IoChevronDownOutline fontSize="18px" />
              )}
            </AccordionButton>

            <AccordionPanel pb={2}>
              <Accordion allowMultiple allowToggle mb="0" px="s12" pb="s12">
                {' '}
                {PersonalInformation.map((item, index) => (
                  // <Text key={`${item}${index}`}>{item}</Text>
                  <AccordionItem key={`${item}${index}`} mt="s12">
                    {({ isExpanded }) => (
                      <>
                        <AccordionButton
                          bg={isExpanded ? '#E0E5EB' : ''}
                          h="60px"
                        >
                          <Box flex="1" textAlign="left">
                            <Text fontSize={'r1'} fontWeight="500">
                              {' '}
                              {item}
                            </Text>
                          </Box>
                          {isExpanded ? (
                            <IoChevronUpOutline fontSize="18px" />
                          ) : (
                            <IoChevronDownOutline fontSize="18px" />
                          )}
                        </AccordionButton>
                        <AccordionPanel
                          pb={'0'}
                          border={'1px'}
                          borderColor={'border.layout'}
                        >
                          {Gender()}
                        </AccordionPanel>
                        <AccordionPanel pb="0">
                          <Box
                            display="flex"
                            alignItems={'center'}
                            justifyContent="space-between"
                            h="60px"
                          >
                            <Button
                              variant="ghost"
                              size={'md'}
                              shade="primary"
                              leftIcon={<AddIcon />}
                            >
                              Add New Option
                            </Button>
                            <Checkbox children="Show “Other” option" />
                          </Box>
                        </AccordionPanel>
                      </>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};
