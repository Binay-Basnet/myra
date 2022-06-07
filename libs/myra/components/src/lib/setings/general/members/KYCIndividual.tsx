import { useState } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { CgCloseO, CgMenuGridO } from 'react-icons/cg';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import { AddIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/react';
import { Box, Button, Checkbox, Icon, Switch, Text } from '@coop/myra/ui';
const genderDetails = ['Male', 'Female', 'Transgender'];

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
                      >
                        <Box {...provided.dragHandleProps}>
                          <Icon size="md" as={CgMenuGridO} />
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
                      <Icon as={CgCloseO} size="sm" />
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
