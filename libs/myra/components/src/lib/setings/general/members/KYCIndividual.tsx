import { useState } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import {
  IoChevronDownOutline,
  IoChevronUpOutline,
  IoClose,
} from 'react-icons/io5';
import { AddIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/react';
import { Box, Button, Checkbox, Icon, Switch, Text } from '@coop/myra/ui';

const genderDetails = ['Male', 'Female', 'Transgender'];

const GRID2X3 = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="14"
      viewBox="0 0 10 14"
      fill="none"
    >
      <path
        d="M4.16659 11.9997C4.16659 12.9163 3.41659 13.6663 2.49992 13.6663C1.58325 13.6663 0.833252 12.9163 0.833252 11.9997C0.833252 11.083 1.58325 10.333 2.49992 10.333C3.41659 10.333 4.16659 11.083 4.16659 11.9997ZM2.49992 5.33301C1.58325 5.33301 0.833252 6.08301 0.833252 6.99967C0.833252 7.91634 1.58325 8.66634 2.49992 8.66634C3.41659 8.66634 4.16659 7.91634 4.16659 6.99967C4.16659 6.08301 3.41659 5.33301 2.49992 5.33301ZM2.49992 0.333008C1.58325 0.333008 0.833252 1.08301 0.833252 1.99967C0.833252 2.91634 1.58325 3.66634 2.49992 3.66634C3.41659 3.66634 4.16659 2.91634 4.16659 1.99967C4.16659 1.08301 3.41659 0.333008 2.49992 0.333008ZM7.49992 3.66634C8.41659 3.66634 9.16659 2.91634 9.16659 1.99967C9.16659 1.08301 8.41659 0.333008 7.49992 0.333008C6.58325 0.333008 5.83325 1.08301 5.83325 1.99967C5.83325 2.91634 6.58325 3.66634 7.49992 3.66634ZM7.49992 5.33301C6.58325 5.33301 5.83325 6.08301 5.83325 6.99967C5.83325 7.91634 6.58325 8.66634 7.49992 8.66634C8.41659 8.66634 9.16659 7.91634 9.16659 6.99967C9.16659 6.08301 8.41659 5.33301 7.49992 5.33301ZM7.49992 10.333C6.58325 10.333 5.83325 11.083 5.83325 11.9997C5.83325 12.9163 6.58325 13.6663 7.49992 13.6663C8.41659 13.6663 9.16659 12.9163 9.16659 11.9997C9.16659 11.083 8.41659 10.333 7.49992 10.333Z"
        fill="#636972"
      />
    </svg>
  );
};

const Gender = () => {
  const [genderInfo, setGenderInfo] = useState(genderDetails);
  const handleDragEnd = (result: DropResult) => {
    const items = Array.from(genderInfo);
    const [reorderedItem] = items.splice(result.source.index, 1);
    if (result.destination) {
      items.splice(result.destination.index, 0, reorderedItem);
      setGenderInfo(items);
    }
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="gender">
        {(provided) => (
          <Box {...provided.droppableProps} ref={provided.innerRef}>
            {genderInfo.map((item, index) => {
              return (
                <Draggable
                  key={`${item}${index}`}
                  draggableId={item}
                  index={index}
                >
                  {(provided) => (
                    <Box
                      display={'flex'}
                      justifyContent={'space-between'}
                      alignItems="center"
                      h="60px"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <Box
                        pr="s16"
                        display={'flex'}
                        justifyContent="flex-start"
                        alignItems="center"
                      >
                        <Box {...provided.dragHandleProps}>
                          <Icon size="md" as={GRID2X3} />
                        </Box>
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
                      <Icon as={IoClose} size="sm" />
                    </Box>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
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
                        <AccordionPanel p="0">
                          <Box
                            display="flex"
                            alignItems={'center'}
                            justifyContent="space-between"
                            p="s16"
                          >
                            <Button
                              variant="ghost"
                              size={'md'}
                              px="0"
                              py="0"
                              h="auto"
                              m="0"
                              shade="primary"
                              leftIcon={<AddIcon />}
                              _hover={{ bg: 'transparent' }}
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
                  Section 3 : cooperative Information
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
