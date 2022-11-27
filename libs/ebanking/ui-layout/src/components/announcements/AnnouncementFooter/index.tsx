import { Box, Text } from '@myra-ui';

export const AnnouncementFooter = () => (
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
      <Text color="primary.500" _hover={{ textDecoration: 'underline' }}>
        <a href="https://www.myraerp.com" target="_blank" rel="noreferrer">
          www.myraerp.com
        </a>
      </Text>
    </Box>
  </>
);
