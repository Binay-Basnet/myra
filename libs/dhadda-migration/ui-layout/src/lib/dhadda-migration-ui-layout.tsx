import { Container } from '@myra-ui';

/* eslint-disable-next-line */
export interface DhaddaMigrationUiLayoutProps {
  children: React.ReactNode;
}

export const DhaddaMigrationUiLayout = (props: DhaddaMigrationUiLayoutProps) => {
  const { children } = props;
  return (
    <Container minW="container.lg" height="fit-content" p="s60">
      {children}
    </Container>
  );
};

export default DhaddaMigrationUiLayout;
