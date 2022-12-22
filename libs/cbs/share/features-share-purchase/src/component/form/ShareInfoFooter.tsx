import { Box, FormFooter, Text } from '@myra-ui';

import { amountConverter, useTranslation } from '@coop/shared/utils';

type FooterProps = {
  disableButton: number | boolean;
  totalAmount: number;
  paymentButtonHandler: () => void;
};

export const ShareInfoFooter = ({
  paymentButtonHandler,
  totalAmount,
  disableButton,
}: FooterProps) => {
  const { t } = useTranslation();

  return (
    <FormFooter
      status={
        <Box display="flex" gap="s8">
          <Text color="neutralColorLight.Gray-60" fontWeight="Regular" as="i" fontSize="r1">
            {totalAmount ? (
              <Text>
                {t['sharePurchaseTotalAmount']}
                <Text ml="s32" color="neutralColorLight.Gray-70" fontWeight="SemiBold" as="span">
                  {amountConverter(totalAmount)}
                </Text>
              </Text>
            ) : (
              ''
            )}
          </Text>
        </Box>
      }
      mainButtonLabel={t['proceedToPayment']}
      mainButtonHandler={paymentButtonHandler}
      isMainButtonDisabled={!disableButton}
    />
  );
};
