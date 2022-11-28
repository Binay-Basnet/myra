// import { ThemeProvider as Emotion10ThemeProvider } from 'emotion-theming';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { ChakraProvider } from '@chakra-ui/react';

import { theme } from '@coop/shared/utils';

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
  nextRouter: {
    Provider: RouterContext.Provider,
  },
};
