import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { Box } from '@myra-ui';

const AccordionContext = createContext<{
  isOpen: boolean;
  onClick: () => void;
}>({ isOpen: false, onClick: () => null });

interface IAccordionProps {
  children: React.ReactNode;
}

const Accordion = (props: IAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { children } = props;

  const onClick = useCallback(() => setIsOpen((item) => !item), []);
  const AccordianProviderValue = useMemo(() => ({ isOpen, onClick }), [isOpen, onClick]);
  return (
    <AccordionContext.Provider value={AccordianProviderValue}>{children}</AccordionContext.Provider>
  );
};

export const useAccordion = () => {
  const context = useContext(AccordionContext);

  if (context === undefined) {
    throw new Error('useAccordion should be used within coponents wrapped by Accordion only');
  }

  return context;
};

interface IAccordionSummaryProps {
  children: React.ReactNode;
}

const AccordionSummary = ({ children }: IAccordionSummaryProps) => {
  const { onClick } = useAccordion();

  return (
    <Box onClick={() => onClick()} cursor="pointer">
      {children}
    </Box>
  );
};

interface IAccordionDetailsProps {
  children: React.ReactNode;
}

const AccordionDetails = ({ children }: IAccordionDetailsProps) => {
  const { isOpen } = useAccordion();
  return (
    <Box
      borderLeft="1px"
      ml="4px"
      maxH={isOpen ? '100%' : 0}
      transition="0.5s all ease"
      overflow="hidden"
      borderColor="gray.500"
      borderStyle="dashed"
    >
      {children}
    </Box>
  );
};
Accordion.Details = AccordionDetails;
Accordion.Summary = AccordionSummary;

export default Accordion;
