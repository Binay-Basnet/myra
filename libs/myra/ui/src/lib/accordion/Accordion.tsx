import {
  Accordion as ChakraAccordian,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  AccordionProps as ChakraAccordianProps,
  AccordionItemProps as ChakraAccordianItemProps,
  AccordionButtonProps as ChakraAccordianButtonProps,
  AccordionPanelProps as ChakraAccordianPanelProps,
} from '@chakra-ui/react';
import { Box, Divider } from '@saccos/myra/ui';

/* eslint-disable-next-line */
export interface AccordionProps extends ChakraAccordianProps {
  id: string;
  title: string;
  allowToggle: boolean;
  allowMultiple?: boolean;
  children: React.ReactNode;
}

const AccordionItemComponent = ({
  children,
  ...rest
}: ChakraAccordianItemProps) => {
  return <AccordionItem {...rest}>{children}</AccordionItem>;
};

const AccordionButtonComponent = ({
  children,
  ...rest
}: ChakraAccordianButtonProps) => {
  return <AccordionButton {...rest}>{children}</AccordionButton>;
};

const AccordionPanelComponent = ({
  children,
  ...rest
}: ChakraAccordianPanelProps) => {
  return <AccordionPanel {...rest}>{children}</AccordionPanel>;
};

export function Accordion(props: AccordionProps) {
  const { children, id, allowMultiple, allowToggle, title, ...rest } = props;
  return (
    <ChakraAccordian
      allowMultiple={allowMultiple}
      allowToggle={allowToggle}
      {...rest}
    >
      <AccordionItemComponent id={id}>
        <h2>
          <AccordionButtonComponent>
            <Box flex="1" textAlign="left">
              {title}
            </Box>
            <AccordionIcon />
          </AccordionButtonComponent>
        </h2>
        <AccordionPanelComponent bg="white" pb={4}>
          <Divider mb="10px" />
          {children}
        </AccordionPanelComponent>
      </AccordionItemComponent>
    </ChakraAccordian>
  );
}

export default Accordion;
