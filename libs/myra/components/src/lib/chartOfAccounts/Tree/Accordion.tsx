import { createContext, useContext, useState } from 'react';
import { Box } from '@chakra-ui/react';

const AccordionContext = createContext<{
  isOpen: boolean;
  onClick: () => void;
}>({ isOpen: false, onClick: () => null });

interface IAccordionProps {
  children: React.ReactNode;
}
function Accordion(props: IAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { children } = props;

  const onClick = () => {
    setIsOpen((isOpen) => !isOpen);
  };
  return (
    <AccordionContext.Provider value={{ isOpen, onClick }}>
      {children}
    </AccordionContext.Provider>
  );
}

export const useAccordion = () => {
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
  const { onClick } = useAccordion();

  return (
    <Box onClick={() => onClick()} cursor="pointer">
      {children}
    </Box>
  );
}

interface IAccordionDetailsProps {
  children: React.ReactNode;
}
function AccordionDetails({ children }: IAccordionDetailsProps) {
  const { isOpen } = useAccordion();
  return (
    <Box
      borderLeft="1px"
      maxH={isOpen ? 999 : 0}
      transition="0.5s all ease"
      overflow="hidden"
      borderColor="gray.500"
      borderStyle="dashed"
    >
      {children}
    </Box>
  );
}
Accordion.Details = AccordionDetails;
Accordion.Summary = AccordionSummary;

export default Accordion;
