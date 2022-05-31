// import { ThemeProvider as Emotion10ThemeProvider } from 'emotion-theming';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@saccos/myra/util';

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
};
