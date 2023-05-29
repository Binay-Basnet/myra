import { useState } from 'react';
import { BiBell } from 'react-icons/bi';
import { IoReload } from 'react-icons/io5';
import { Flex, Spinner } from '@chakra-ui/react';

import {
  Box,
  Icon,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@myra-ui';

import { useGetTasksQuery } from '@coop/neosys-admin/data-access';

export const NotificationPopover = () => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const { data, refetch, isLoading, isRefetching } = useGetTasksQuery(
    {},
    { enabled, staleTime: 0 }
  );
  const tasksData = !!data && data?.neosys?.tasks;

  const getTaskColor = (status: 'COMPLETED' | 'FAILED' | 'RUNNING' | undefined) => {
    switch (status) {
      case 'FAILED':
        return 'danger.400';
      case 'RUNNING':
        return 'yellow.400';
      case 'COMPLETED':
        return 'green.400';
      default:
        return '';
    }
  };

  return (
    <Popover
      placement="bottom-end"
      onOpen={() => setEnabled(true)}
      onClose={() => setEnabled(false)}
    >
      {({ isOpen }) => (
        <>
          <PopoverTrigger>
            <IconButton
              h="40px"
              icon={<Icon size="md" as={BiBell} />}
              aria-label="History"
              variant="ghost"
              color="gray.0"
              bg={isOpen ? 'primary.dark' : 'primary.800'}
              _hover={{ backgroundColor: 'primary.dark' }}
            />
          </PopoverTrigger>
          <PopoverContent
            bg="gray.0"
            w="500px"
            h="450px"
            overflowY="scroll"
            border="none"
            boxShadow="0px 0px 2px rgba(0, 0, 0, 0.2), 0px 2px 10px rgba(0, 0, 0, 0.1)"
            outline="none"
            _focus={{
              boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.2), 0px 2px 10px rgba(0, 0, 0, 0.1)',
            }}
            color="white"
            zIndex="2000"
          >
            <PopoverBody p="0">
              <Box display="flex" flexDirection="column">
                <Box
                  px="s12"
                  py="s16"
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  borderBottom="1px solid"
                  borderColor="border.layout"
                  position="sticky"
                  top="0"
                  bg="white"
                >
                  <Box
                    ml="14px"
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    width="100%"
                  >
                    <Text fontWeight="SemiBold" fontSize="s3" color="primary.500">
                      Recent Tasks
                    </Text>
                    <IconButton
                      h="20px"
                      minWidth="20px"
                      icon={<Icon size="sm" as={IoReload} />}
                      aria-label="Reload"
                      variant="ghost"
                      color="primary.500"
                      _hover={{ backgroundColor: 'gray.100' }}
                      onClick={() => refetch()}
                    />
                  </Box>
                </Box>
                {isLoading || isRefetching ? (
                  <Flex justifyContent="center" alignItems="center" h="400px">
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="primary.default"
                      size="xl"
                    />
                  </Flex>
                ) : (
                  <Box borderBottom="1px solid" borderColor="border.layout">
                    {tasksData &&
                      tasksData?.map((task, index, array) => (
                        <Box
                          key={task?.id}
                          display="flex"
                          flexDirection="row"
                          alignItems="center"
                          justifyContent="space-between"
                          p="s8"
                          // mb="s8"
                          borderBottom={index === array.length - 1 ? '' : '1px solid'}
                          borderColor="border.layout"
                          borderLeft="4px solid"
                          borderLeftColor={getTaskColor(task?.status)}
                        >
                          <Box display="flex" flexDirection="column" w="100%" p="s6">
                            <Flex direction="row" justifyContent="space-between">
                              <Text fontSize="s3" color="black" fontWeight="SemiBold">
                                {task?.type.replace('_', ' ')}
                              </Text>
                              <Text fontSize="s2" color="black" fontWeight="SemiBold">
                                {task?.status}
                              </Text>
                            </Flex>
                            <Text fontSize="s2" color="blackAlpha.600">
                              {task?.slug}
                            </Text>
                            <Text fontSize="s1" color="gray.500">
                              {task?.message}
                            </Text>
                          </Box>
                        </Box>
                      ))}
                  </Box>
                )}
              </Box>
            </PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
};

export default NotificationPopover;
