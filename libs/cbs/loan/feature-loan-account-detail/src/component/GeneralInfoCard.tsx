import { Box, DetailCardContent, DetailsCard, Text } from '@myra-ui';

import { RedirectButton, ROUTES } from '@coop/cbs/utils';

interface IGeneralInfoCardProps {
  title: string;
  items: { label: string; value: number | string | null | undefined }[];
  productId?: string;
}

export const GeneralInfoCard = ({ title, items, productId }: IGeneralInfoCardProps) => (
  <DetailsCard title={title} bg="white" hasThreeRows>
    {items.map((item) => (
      <>
        {item?.label !== 'Product Name' && (
          <Box display="flex" flexDirection="column" gap="s4">
            <Text fontSize="s3" fontWeight="500" color="neutralColorLight.Gray-70">
              {item.label}
            </Text>
            <Text fontSize="r1" fontWeight="600" color="neutralColorLight.Gray-80">
              {item.value}
            </Text>
          </Box>
        )}
        {item?.label === 'Product Name' && (
          <DetailCardContent
            title="ID"
            children={
              <RedirectButton
                link={`${ROUTES.SETTINGS_GENERAL_LP_DETAILS}?id=${productId}`}
                label={item?.value as string}
              />
            }
          />
        )}
      </>
    ))}
  </DetailsCard>
);
