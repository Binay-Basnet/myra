import { AiOutlineRight } from 'react-icons/ai';
import { BsTag, BsThreeDotsVertical } from 'react-icons/bs';
import Image from 'next/legacy/image';
import { Portal } from '@chakra-ui/react';

import {
  Box,
  Checkbox,
  Divider,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@myra-ui';

const mainPopoverList = ['Preview', 'Share', 'Manage Access'];
const subPopoverList = ['Delete', 'Download', 'Rename', 'Details'];
const catPopoverList = ['cat 1', 'cat 2', 'cat 3', 'cat 4'];

const CustomPopoverContent = (props: { children: React.ReactNode }) => {
  const { children } = props;
  return (
    <PopoverContent
      w="100"
      px="s16"
      py="s4"
      bg="gray.0"
      border="none"
      boxShadow="0px 0px 2px rgba(0, 0, 0, 0.2), 0px 2px 10px rgba(0, 0, 0, 0.1)"
      outline="none"
      _focus={{
        boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.2), 0px 2px 10px rgba(0, 0, 0, 0.1)',
      }}
      zIndex="2000"
    >
      {children}
    </PopoverContent>
  );
};

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
              <CustomPopoverContent>
                {mainPopoverList?.map((item) => (
                  <Text mb="s8">{item}</Text>
                ))}
                <Popover isLazy placement="right" colorScheme="primary">
                  {() => (
                    <>
                      <PopoverTrigger>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Text>Category</Text>
                          <Icon as={AiOutlineRight} size="sm" />
                        </Box>
                      </PopoverTrigger>
                      <CustomPopoverContent>
                        {catPopoverList?.map((item) => (
                          <Box display="flex" gap="s16" alignItems="center">
                            <Checkbox />
                            <Box display="flex" gap="s8" alignItems="center">
                              <Icon as={BsTag} size="sm" />
                              <Text>{item}</Text>
                            </Box>
                          </Box>
                        ))}
                      </CustomPopoverContent>
                    </>
                  )}
                </Popover>
                <Divider my="s8" />
                {subPopoverList?.map((item) => (
                  <Text mb="s8">{item}</Text>
                ))}
              </CustomPopoverContent>
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
