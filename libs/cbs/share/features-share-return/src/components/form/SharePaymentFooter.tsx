import { IoChevronBackOutline } from 'react-icons/io5';

import { Button, FormFooter } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

type FooterProps = {
  previousButtonHandler: () => void;
  handleSubmit: () => void;
  isDisabled?: boolean;
};

export const SharePaymentFooter = ({
  previousButtonHandler,
  handleSubmit,
  isDisabled,
}: FooterProps) => {
  const { t } = useTranslation();

  return (
    <FormFooter
      status={
        <Button
          variant="outline"
          leftIcon={<IoChevronBackOutline />}
          onClick={previousButtonHandler}
        >
          {t['previous']}
        </Button>
      }
      mainButtonLabel={t['shareConfirmPayment']}
      mainButtonHandler={handleSubmit}
      isMainButtonDisabled={isDisabled}
    />
  );
};
