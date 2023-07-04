import { Button, ButtonProps } from '@myra-ui';

export const TopButtonWrapper = (props: ButtonProps) => (
  <Button
    as="button"
    variant="unstyled"
    w="s32"
    h="s32"
    display="flex"
    alignItems="center"
    justifyContent="center"
    flexShrink={0}
    cursor="pointer"
    bg="gray.50"
    borderRadius="br1"
    minW="none"
    _hover={{ bg: 'gray.100' }}
    {...props}
  />
);
