import {
  Accordion as ChakraAccordian,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  AccordionProps as ChakraAccordianProps,
} from '@chakra-ui/react';
import { Box } from '@saccos/myra/ui';

/* eslint-disable-next-line */
export interface AccordionProps extends ChakraAccordianProps {
  title: string;
  allowToggle: boolean;
  allowMultiple?: boolean;
  children: React.ReactNode;
}

export function Accordion(props: AccordionProps) {
  const { children, allowMultiple, allowToggle, title, ...rest } = props;
  return (
    <ChakraAccordian
      bg="primary.0"
      allowMultiple={allowMultiple}
      allowToggle={allowToggle}
      {...rest}
    >
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              {title}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel bg="white" pb={4}>
          {children}
        </AccordionPanel>
      </AccordionItem>
    </ChakraAccordian>
  );
}

export default Accordion;
