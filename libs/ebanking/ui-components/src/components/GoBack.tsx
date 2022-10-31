import { useRouter } from 'next/router';
import { ChevronLeftIcon } from '@chakra-ui/icons';

import { Button, Icon } from '@coop/shared/ui';

interface GoBackProps {
  handleGoBack?: () => void;
}

export const GoBack = ({ handleGoBack }: GoBackProps) => {
  const router = useRouter();
  return (
    <Button
      px={0}
      variant="link"
      onClick={() => {
        if (handleGoBack) {
          handleGoBack();
        } else {
          router.back();
        }
      }}
      gap="0"
    >
      <Icon as={ChevronLeftIcon} />
      Go Back
    </Button>
  );
};
