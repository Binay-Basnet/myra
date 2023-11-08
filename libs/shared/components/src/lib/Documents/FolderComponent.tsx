import { BsThreeDotsVertical } from 'react-icons/bs';
import Image from 'next/legacy/image';
import { Portal } from '@chakra-ui/react';

import { Box, Checkbox, Icon, Popover, PopoverContent, PopoverTrigger, Text } from '@myra-ui';

export const FolderComponent = () => (
  <Box p="s16" borderRadius="8" bg="white" height={180} width={170}>
    <Box display="flex" justifyContent="space-between">
      <Checkbox />
      <Popover isLazy placement="right" colorScheme="primary">
        {() => (
          <>
            <PopoverTrigger>
              <Box>
                <Icon as={BsThreeDotsVertical} cursor="pointer" />
              </Box>
            </PopoverTrigger>
            <Portal>
              <PopoverContent
                bg="gray.0"
                w="100px"
                border="none"
                boxShadow="0px 0px 2px rgba(0, 0, 0, 0.2), 0px 2px 10px rgba(0, 0, 0, 0.1)"
                outline="none"
                _focus={{
                  boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.2), 0px 2px 10px rgba(0, 0, 0, 0.1)',
                }}
                zIndex="2000"
              >
                gg
              </PopoverContent>
            </Portal>
          </>
        )}
      </Popover>
    </Box>
    <Box display="flex" justifyContent="center">
      <Image src="/folder.svg" height={110} width={110} />
    </Box>
    <Box display="flex" justifyContent="center">
      <Text fontSize="s3" fontWeight="medium">
        Hari Bahadur
      </Text>
    </Box>
  </Box>
);

export default FolderComponent;
