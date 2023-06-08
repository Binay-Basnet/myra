import { AlertDialog } from '@myra-ui';
import { Box, Button, Text } from '@myra-ui/foundations';

export interface FormHeaderProps {
  title: string;
  closeLink?: string;
  buttonLabel?: string;
  buttonHandler?: () => void;
  isFormDirty?: boolean;
}

export const FormHeader = ({
  title,
  closeLink,
  buttonLabel,
  buttonHandler,
  isFormDirty = false,
}: FormHeaderProps) => (
  <Box
    w="100%"
    h="3.125rem"
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    px="s16"
    bg="white"
    borderBottom="1px"
    borderBottomColor="border.layout"
  >
    <Text variant="pageHeader" color="gray.800">
      {title}
    </Text>

    <Box display="flex" gap="s24">
      {buttonLabel && buttonHandler && (
        <Button variant="ghost" onClick={buttonHandler}>
          {buttonLabel}
        </Button>
      )}

      <AlertDialog
        title="Saving in Progress: Your Form Changes are Being Safeguarded!"
        description="Please Hold On! We're in the middle of saving your valuable modifications to ensure nothing gets lost. If you close now. Everything will be lost"
        isFormDirty={isFormDirty}
        closeLink={closeLink}
      />
    </Box>
  </Box>
);

export default FormHeader;
