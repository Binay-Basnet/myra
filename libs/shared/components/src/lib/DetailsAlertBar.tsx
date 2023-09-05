import { FiAlertTriangle } from 'react-icons/fi';

import { Box, Button, Icon, Text } from '@myra-ui';

export const DetailsAlertBar = (props: {
  title: string;
  buttonText: string;
  alertButtonHandler: () => void;
}) => {
  const { title, buttonText, alertButtonHandler } = props;
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p="s16"
      bg="warning.0"
      fontWeight="medium"
      borderBottom="1px"
      borderColor="border.layout"
      position="sticky"
      top={0}
      zIndex={2}
    >
      <Box display="flex" alignItems="center" gap="s8">
        <Icon color="warning.500" as={FiAlertTriangle} />
        <Text fontSize="r1" color="gray.800">
          {title}
        </Text>
      </Box>
      <Button onClick={alertButtonHandler}>{buttonText}</Button>
    </Box>
  );
};

export default DetailsAlertBar;
