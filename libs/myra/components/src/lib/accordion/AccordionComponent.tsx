import { Accordion, ChakraAccordianProps as AccordionProps } from '@coop/shared/ui';

interface IAccordionProps extends AccordionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export const AccordionComponent =
  () =>
  ({ id, title, children, ...rest }: IAccordionProps) =>
    (
      <Accordion id={id} title={title} {...rest}>
        {children}
      </Accordion>
    );
