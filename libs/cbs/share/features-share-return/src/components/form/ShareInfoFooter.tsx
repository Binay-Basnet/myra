import { Box, FormFooter, Text } from '@coop/shared/ui';
import { amountConverter, useTranslation } from '@coop/shared/utils';

type FooterProps = {
  totalAmount: number;
  paymentButtonHandler: () => void;
};

export const ShareInfoFooter = ({ paymentButtonHandler, totalAmount }: FooterProps) => {
  const { t } = useTranslation();

  return (
    <FormFooter
      status={
        <Box display="flex" gap="s8">
          <Text color="neutralColorLight.Gray-60" fontWeight="Regular" as="i" fontSize="r1">
            {totalAmount ? (
              <Text>
                Total Amount
                <Text ml="s32" color="neutralColorLight.Gray-70" fontWeight="SemiBold" as="span">
                  {amountConverter(totalAmount)}
                </Text>
              </Text>
            ) : (
              ' Form details saved to draft 09:41 AM'
            )}
          </Text>
        </Box>
      }
      mainButtonLabel={t['proceedToPayment']}
      mainButtonHandler={paymentButtonHandler}
    />
  );
};
