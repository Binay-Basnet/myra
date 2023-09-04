import { Alert, Box, Modal, Text } from '@myra-ui';

interface IDividendPostingErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  errors: string[];
}

export const DividendPostingErrorModal = ({
  isOpen,
  onClose,
  errors,
}: IDividendPostingErrorModalProps) => (
  <Modal title="Share Dividend Posting Errors" open={isOpen} onClose={onClose} width="3xl">
    <Box display="flex" flexDirection="column" gap="s16">
      {errors?.map((error) => (
        <Alert status="error" hideCloseIcon>
          <Text
            fontSize="r1"
            fontWeight="SemiBold"
            color="neutralColorLight.Gray-80"
            lineHeight="150%"
          >
            {error}
          </Text>
        </Alert>
      ))}
    </Box>
  </Modal>
);
