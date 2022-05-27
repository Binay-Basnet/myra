import { Accordion } from '@saccos/myra/ui';

type accordionProps = {
  id: string;
  title: string;
  children: React.ReactNode;
};

export const AccordionComponent = ({
  id,
  title,
  children,
  ...rest
}: accordionProps) => {
  return (
    <Accordion id={id} allowToggle={true} title={title} {...rest}>
      {children}
    </Accordion>
  );
};
