import { BiArrowBack } from 'react-icons/bi';
import { useRouter } from 'next/router';

import { Box, Icon, Text } from '@myra-ui/foundations';

import { useTranslation } from '@coop/shared/utils';

interface ChangePasswordLayoutProps {
  children: React.ReactNode;
}

export const ChangePasswordContainerLayout = (props: ChangePasswordLayoutProps) => {
  const { children } = props;
  const { t } = useTranslation();
  const route = useRouter();
  return (
    <Box
      display="flex"
      flexDirection="column"
      w={492}
      bg="white"
      mt="s20"
      borderRadius={8}
      p="s16"
      gap="s32"
    >
      <Box display="flex" gap={2} alignItems="center" cursor="pointer" onClick={() => route.back()}>
        <Icon as={BiArrowBack} size="sm" />
        <Text fontSize="r1">{t['backText']}</Text>
      </Box>
      {children}
    </Box>
  );
};
