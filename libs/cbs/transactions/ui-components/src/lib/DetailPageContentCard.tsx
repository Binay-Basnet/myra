import { Box, Text } from '@coop/shared/ui';

interface IDetailPageContentCard {
  header: string;
  children: React.ReactNode;
}

export const DetailPageContentCard = ({ header, children }: IDetailPageContentCard) => (
  // const { t } = useTranslation();
  (<Box display="flex" flexDirection="column" borderRadius="br2" bg="gray.0">
    <Box px="s16" height="50px">
      <Text color="neutralColorLight.Gray-80" fontWeight="SemiBold" fontSize="r1">
        {header}
      </Text>
    </Box>
    <Box p="s16">{children}</Box>
  </Box>)
);
