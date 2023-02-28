import { Container } from '@myra-ui';

/* eslint-disable-next-line */
export interface MigrationUiLayoutProps {
  children: React.ReactNode;
}

export const MigrationUiLayout = (props: MigrationUiLayoutProps) => {
  const { children } = props;
  return (
    <Container minW="container.xl" p={5}>
      {children}
    </Container>
  );
};

export default MigrationUiLayout;
