/* eslint-disable-next-line */
import { Text, Box } from '@myra-ui';

export interface ShareSettingsHeaderProps {
  title: string;
}

export const ShareSettingsHeader = (props: ShareSettingsHeaderProps) => {
  const { title } = props;
  return (
    <Box
      width="100%"
      height="s40"
      display="flex"
      alignItems="center"
      borderBottom="1px"
      borderBottomColor="border.layout"
    >
      <Text fontSize="r2" color="gray.800" fontWeight="600">
        {title}
      </Text>
    </Box>
  );
};

export default ShareSettingsHeader;
