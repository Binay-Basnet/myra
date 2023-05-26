import { ReactNode } from 'react';
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';

import { Box, FormFooter, FormFooterProps, FormHeader, FormHeaderProps } from '@myra-ui';

interface IFormLayoutProps<T extends FieldValues> {
  children: ReactNode;
  hasSidebar?: boolean;
  methods?: UseFormReturn<T>;
}

const FormLayout = <T extends FieldValues>({
  children,
  hasSidebar,
  methods,
}: IFormLayoutProps<T>) =>
  methods ? (
    <FormProvider {...methods}>
      <Box height="100%" maxH="calc(100vh - 6.875rem)" display="flex" justifyContent="center">
        <Box
          width={hasSidebar ? '6xl' : '4xl'}
          display="flex"
          flexDirection="column"
          bgColor="gray.0"
        >
          {children}
        </Box>
      </Box>
    </FormProvider>
  ) : (
    <Box height="100%" maxH="calc(100vh - 6.875rem)" display="flex" justifyContent="center">
      <Box
        width={hasSidebar ? '6xl' : '4xl'}
        display="flex"
        flexDirection="column"
        bgColor="gray.0"
      >
        {children}
      </Box>
    </Box>
  );

// type HeaderProps = FormHeaderProps & {
//   isFormAutoSave?: boolean;
// };

const Header = (props: FormHeaderProps) => (
  <Box bg="gray.100" width="100%" maxH="3.125rem">
    <FormHeader {...props} />
  </Box>
);

const Footer = (props: FormFooterProps) => (
  <Box bg="gray.100" width="100%" maxH="3.75rem">
    <FormFooter {...props} />
  </Box>
);

const Content = ({ children }: { children: ReactNode }) => (
  <Box display="flex" flex={1} maxH="calc(100vh - 13.75rem)">
    {children}
  </Box>
);

const Sidebar = ({
  children,
  borderPosition = 'left',
}: {
  children: ReactNode;
  borderPosition?: 'left' | 'right';
}) => (
  <Box
    w="20rem"
    borderLeft={borderPosition === 'left' ? '1px' : '0'}
    borderRight={borderPosition === 'right' ? '1px' : '0'}
    borderColor="border.layout"
    overflowY="auto"
    overflowX="hidden"
    sx={{
      '&::-webkit-scrollbar': {
        width: '12px',
        height: '8px',
        backgroundColor: 'transparent',
      },
      '&:hover::-webkit-scrollbar': {
        width: '12px',
        height: '8px',
        backgroundColor: '#f5f5f5',

        display: 'block',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'transparent',
        borderRadius: '8px',
      },
      '&:hover::-webkit-scrollbar-thumb': {
        backgroundColor: 'gray.300',
        borderRadius: '8px',
      },
    }}
  >
    {children}
  </Box>
);

const Form = ({ children }: { children: ReactNode }) => (
  <Box
    flex={1}
    overflowY="auto"
    sx={{
      '&::-webkit-scrollbar': {
        width: '12px',
        height: '8px',
        backgroundColor: 'transparent',
      },
      '&:hover::-webkit-scrollbar': {
        width: '12px',
        height: '8px',
        backgroundColor: '#f5f5f5',

        display: 'block',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'transparent',
        borderRadius: '8px',
      },
      '&:hover::-webkit-scrollbar-thumb': {
        backgroundColor: 'gray.300',
        borderRadius: '8px',
      },
    }}
  >
    {children}
  </Box>
);

FormLayout.Header = Header;
FormLayout.Footer = Footer;
FormLayout.Content = Content;
FormLayout.Sidebar = Sidebar;
FormLayout.Form = Form;

export { FormLayout };
