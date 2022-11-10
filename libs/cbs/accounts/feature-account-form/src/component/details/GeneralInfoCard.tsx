import { Box, DetailsCard, Text } from '@coop/shared/ui';

interface IGeneralInfoCardProps {
  title: string;
  items: { label: string; value: string | null | undefined }[];
}

export const GeneralInfoCard = ({ title, items }: IGeneralInfoCardProps) => (
  <DetailsCard title={title} bg="white">
    {items.map(
      (item) =>
        item.value && (
          <Box display="flex" flexDirection="column" gap="s4">
            <Text fontSize="s3" fontWeight="500" color="neutralColorLight.Gray-70">
              {item.label}
            </Text>
            <Text fontSize="r1" fontWeight="600" color="neutralColorLight.Gray-80">
              {item.value}
            </Text>
          </Box>
        )
    )}
  </DetailsCard>
);
