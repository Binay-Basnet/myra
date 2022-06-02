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
  Button,
  Checkbox,
} from '@chakra-ui/react';
import { Box, Text } from '@saccos/myra/ui';
import { AddIcon } from '@chakra-ui/icons';

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
  return (
    <AccordionPanel {...rest}>
      {children}
      <Box
        mt="10px"
        display="flex"
        justifyContent="space-between"
        alignContent="center"
        borderTop="1px solid #E6E6E6"
      >
        <Button color="primary.500" variant="ghost" leftIcon={<AddIcon />}>
          Add New Option
        </Button>

        <Checkbox>Show “Other” option</Checkbox>
      </Box>
    </AccordionPanel>
  );
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
              <Text fontWeight="SemiBold" color="gray.800">
                {title}
              </Text>
            </Box>
            <AccordionIcon />
          </AccordionButtonComponent>
        </h2>
        <AccordionPanelComponent bg="white" pb={4}>
          {children}
        </AccordionPanelComponent>
      </AccordionItemComponent>
    </ChakraAccordian>
  );
}

export default Accordion;
