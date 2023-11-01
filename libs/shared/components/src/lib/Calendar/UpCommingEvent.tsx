import { BiCalendar, BiTime, BiUser } from 'react-icons/bi';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { EventSourceInput } from '@fullcalendar/core';
import dayjs from 'dayjs';

import { Box, Collapse, Icon, Text } from '@myra-ui';

export const UpCommingEvent = ({
  isOpen,
  onToggle,
  upcommingEvents,
}: {
  isOpen: boolean;
  onToggle: () => void;
  upcommingEvents: EventSourceInput[];
}) => (
  <Box h="fit-content">
    <Box
      onClick={onToggle}
      display="flex"
      gap="s4"
      alignItems="center"
      padding="s16"
      cursor="pointer"
      w="100%"
    >
      <Box>
        <Icon as={isOpen ? ChevronUpIcon : ChevronDownIcon} size="lg" color="gray.800" />
      </Box>
      <Text fontSize="r1" fontWeight="500" color="gray.700">
        Upcoming Events
      </Text>
    </Box>
    <Collapse in={isOpen}>
      <Box
        display="flex"
        flexWrap="nowrap"
        overflowX="auto"
        paddingX="s16"
        paddingBottom="s16"
        gap="s16"
        sx={{
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {upcommingEvents?.map((e: any) => (
          <Box
            borderRadius="br3"
            w="379px"
            minH="100px"
            p="s16"
            border="1px"
            borderColor="border.layout"
          >
            <Box display="flex" flexDir="column" gap="s16">
              <Box>
                <Text fontSize="r3" fontWeight="500" color="gray.800">
                  {e?.title}
                </Text>
                <Text fontSize="s2" fontWeight="400" color="gray.500">
                  Coop event
                </Text>
              </Box>
              <Box display="flex" gap="s24">
                <Box display="flex" gap="s8">
                  <Icon as={BiCalendar} size="sm" color="gray.600" />
                  <Text whiteSpace="pre" fontSize="s2" fontWeight="500" color="gray.800">
                    {dayjs(e?.startDate).format('D MMMM, dddd')}
                  </Text>
                </Box>
                {e?.meta?.time?.end && e?.meta?.time?.start && (
                  <Box display="flex" gap="s8">
                    <Icon as={BiTime} size="sm" color="gray.600" />

                    <Text whiteSpace="pre" fontSize="s2" fontWeight="500" color="gray.800">
                      {`${e?.meta?.time?.start} - ${e?.meta?.time?.end}`}
                    </Text>
                  </Box>
                )}
                <Box display="flex" gap="s8">
                  <Icon as={BiUser} size="sm" color="gray.600" />

                  <Text fontSize="s2" fontWeight="500" color="gray.800">
                    {e?.meta?.enrolledMember}
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Collapse>
  </Box>
);
