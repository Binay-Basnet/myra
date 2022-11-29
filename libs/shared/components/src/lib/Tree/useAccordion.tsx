import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Box } from '@myra-ui';

const AccordionContext = createContext<{
  isOpen: boolean;
  onToggle: () => void;
}>({ isOpen: false, onToggle: () => null });

interface IAccordionProps {
  defaultOpen: boolean;
  children: React.ReactNode;
}

const Accordion = (props: IAccordionProps) => {
  const { children, defaultOpen } = props;
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const onToggle = useCallback(() => setIsOpen((item) => !item), []);

  useEffect(() => {
    if (defaultOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [defaultOpen]);

  const memoizedValue = useMemo(() => ({ isOpen, onToggle }), [isOpen, onToggle]);
  return <AccordionContext.Provider value={memoizedValue}>{children}</AccordionContext.Provider>;
};

export const useAccordion = () => {
  const context = useContext(AccordionContext);

  if (context === undefined) {
    throw new Error('useAccordion should be used within components wrapped by <Accordion> only');
  }

  return context;
};

interface IAccordionSummaryProps {
  children: React.ReactNode;
}

const AccordionSummary = ({ children }: IAccordionSummaryProps) => {
  const { onToggle } = useAccordion();

  return (
    <Box onClick={() => onToggle()} cursor="pointer">
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
