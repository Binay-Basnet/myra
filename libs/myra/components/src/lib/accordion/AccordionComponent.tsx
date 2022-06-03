import { Accordion, AccordionProps as abc } from '@saccos/myra/ui';

interface accordionProps extends abc {
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
