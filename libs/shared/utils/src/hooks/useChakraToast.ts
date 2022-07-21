import { useToast } from '@chakra-ui/react';

export const useChakraToast = () => {
  const toast = useToast();
  return toast;
};
