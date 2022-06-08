import {
  Accordion,
  ChakraAccordianProps as AccordionProps,
} from '@coop/myra/ui';

interface accordionProps extends AccordionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export const AccordionComponent =
  (props: accordionProps) =>
  ({ id, title, children, ...rest }: accordionProps) => {
    return (
      <Accordion id={id} title={title} {...rest}>
        {children}
      </Accordion>
    );
  };
