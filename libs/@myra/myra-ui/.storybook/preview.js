import { ChakraProvider } from '@chakra-ui/react';

import { theme } from '@myra-ui/theme';

const withThemeProvider = (Story, context) => {
  return (
    <ChakraProvider theme={theme}>
      <Story {...context} />
    </ChakraProvider>
  );
};

export const decorators = [withThemeProvider];
export const parameters = {
  chakra: {
    theme,
  },
  backgrounds: {
    default: 'light',
  },
};
