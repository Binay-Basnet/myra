import { Box, Text } from '@coop/shared/ui';

export const AnnouncementFooter = () => {
  return (
    <>
      <Box px="s16" fontSize="s3" color="gray.600">
        <Text cursor="pointer" _hover={{ color: 'gray.800' }}>
          Terms & Conditions
        </Text>
        <Text cursor="pointer" _hover={{ color: 'gray.800' }}>
          Privacy Policy
        </Text>
        <Text cursor="pointer" _hover={{ color: 'gray.800' }}>
          Help & Support
        </Text>
      </Box>

      <Box px="s16" fontSize="s3" color="gray.600">
        <Text>For Support:</Text>
        <Text color="primary.500">www.myraerp.com</Text>
      </Box>
    </>
  );
};
