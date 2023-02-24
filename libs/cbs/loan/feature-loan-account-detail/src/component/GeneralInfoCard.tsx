import { Box, DetailCardContent, DetailsCard, Text } from '@myra-ui';

import { RedirectButton, ROUTES } from '@coop/cbs/utils';

import { useLoanAccountDetailHooks } from '../hooks/useLoanAccountDetailHooks';

interface IGeneralInfoCardProps {
  title: string;
  items: { label: string; value: number | string | null | undefined }[];
  productId?: string;
}

export const GeneralInfoCard = ({ title, items, productId }: IGeneralInfoCardProps) => {
  const { generalInfo } = useLoanAccountDetailHooks();

  return (
    <DetailsCard title={title} bg="white" hasThreeRows>
      {items.map((item) => (
        <>
          {!['Product Name', 'Linked Account Id'].includes(item?.label) && (
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
              title="Product Name"
              children={
                <RedirectButton
                  link={`${ROUTES.SETTINGS_GENERAL_LP_DETAILS}?id=${productId}`}
                  label={item?.value as string}
                />
              }
            />
          )}
          {item?.label === 'Linked Account Id' && (
            <DetailCardContent
              title="Linked Account Id"
              children={
                <RedirectButton
                  link={`${ROUTES.CBS_ACCOUNT_SAVING_DETAILS}?id=${generalInfo?.linkedAccountId}`}
                  label={item?.value as string}
                />
              }
            />
          )}
        </>
      ))}
    </DetailsCard>
  );
};
