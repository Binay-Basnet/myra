import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

interface IDetailPageContentCard {
  header: string;
  children: React.ReactNode;
}

export const DetailPageContentCard = ({
  header,
  children,
}: IDetailPageContentCard) => {
  const { t } = useTranslation();
  return (
    <Box display="flex" flexDirection="column" borderRadius="br2" bg="gray.0">
      <Box p="s16">
        <Text
          color="neutralColorLight.Gray-80"
          fontWeight="SemiBold"
          fontSize="r1"
        >
          {t[header]}
        </Text>
      </Box>
      {children}
    </Box>
  );
};
