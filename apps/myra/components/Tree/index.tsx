import { createContext, useContext, useState } from 'react';
// import { AiOutlineCaretRight } from 'react-icons/ai';
import { BsCaretDownFill } from 'react-icons/bs';
import { MdOutlineCircle } from 'react-icons/md';
import { Box, HStack, Icon, Text } from '@chakra-ui/react';

const AccordionContext = createContext<{
  isOpen: boolean;
  onClick: (value: boolean) => void;
}>({ isOpen: true, onClick: () => null });

interface IAccordionProps {
  children: React.ReactNode;
}
function Accordion(props: IAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { children } = props;

  const onClick = (value: boolean) => {
    setIsOpen(value);
  };
  return (
    <AccordionContext.Provider value={{ isOpen, onClick }}>
      {children}
    </AccordionContext.Provider>
  );
}

const useAccordion = () => {
  const context = useContext(AccordionContext);

  if (context === undefined) {
    throw new Error(
      'useAccordion should be used within coponents wrapped by Accordion only'
    );
  }

  return context;
};

interface IAccordionSummaryProps {
  children: React.ReactNode;
}
function AccordionSummary({ children }: IAccordionSummaryProps) {
  const { onClick, isOpen } = useAccordion();

  return <Box onClick={() => onClick(!isOpen)}>{children}</Box>;
}

interface IAccordionDetailsProps {
  children: React.ReactNode;
}
function AccordionDetails({ children }: IAccordionDetailsProps) {
  const { isOpen } = useAccordion();
  //   if (!isOpen) return null;
  return (
    <Box
      borderLeft="1px"
      maxH={isOpen ? 999 : 0}
      transition="0.5s all ease"
      overflow="hidden"
      borderColor="gray.500"
      borderStyle="dashed"
    >
      {children}{' '}
    </Box>
  );
}
Accordion.Details = AccordionDetails;
Accordion.Summary = AccordionSummary;

function Test() {
  return (
    <Box position="relative">
      <Box
        position="absolute"
        height="33px"
        width="30px"
        // bg="green"
        borderBottom="1px"
        borderStyle="dashed"
        borderColor="gray.500"
      ></Box>
      <Box px="34px" pt={5}>
        <HStack ml="-5px" alignItems="center">
          {/* <Box pl={1}> */}
          <Icon as={MdOutlineCircle} color="gray.500" />
          {/* </Box> */}
          <HStack alignItems="center">
            <Text fontWeight="bold">10</Text>{' '}
            <Text fontWeight="400" fontSize="14px">
              Share Capital{' '}
            </Text>
          </HStack>
        </HStack>
      </Box>
    </Box>
  );
}
function Tree() {
  const { isOpen } = useAccordion();
  return (
    <Accordion>
      <Accordion.Summary>
        <HStack ml="-7px">
          <Icon as={BsCaretDownFill} color="gray.500" />
          <HStack>
            <Text fontWeight="bold" fontSize="14px">
              101
            </Text>{' '}
            <Text fontWeight="400" fontSize="14px">
              Share Capital{' '}
            </Text>
          </HStack>
        </HStack>
      </Accordion.Summary>
      {isOpen && (
        <Accordion.Details>
          <Test />
          <Test />
          <Test />
          <Test />

          <Box position="relative">
            <Box
              position="absolute"
              height="25px"
              width="40px"
              // bg="green"
              borderBottom="1px"
              borderStyle="dashed"
              borderColor="gray.500"
            ></Box>
            <Box px="44px" py={3}>
              <Tree />
            </Box>
          </Box>
        </Accordion.Details>
      )}
    </Accordion>
  );
}

export default Tree;
