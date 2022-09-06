import { Box, FormFooter, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

type FooterProps = {
  paymentButtonHandler: () => void;
};

const ShareInfoFooter = ({ paymentButtonHandler }: FooterProps) => {
  const { t } = useTranslation();

  return (
    <FormFooter
      status={
        <Box display="flex" gap="s8">
          <Text
            color="neutralColorLight.Gray-60"
            fontWeight="Regular"
            as="i"
            fontSize="r1"
          >
            Form details saved to draft 09:41 AM
          </Text>
        </Box>
      }
      mainButtonLabel={t['proceedToPayment']}
      mainButtonHandler={paymentButtonHandler}
    />
  );
};

export default ShareInfoFooter;
