import { BsDot } from 'react-icons/bs';
import { FiCalendar, FiClock, FiCopy, FiMapPin, FiUsers, FiVideo } from 'react-icons/fi';
import { List, ListItem } from '@chakra-ui/react';

import { Box, Divider, Icon, Modal, Text } from '@myra-ui';

import { copyToClipboard } from '@coop/shared/utils';

export const EventDetails = ({
  isOpen,
  onClose,
  event,
}: {
  isOpen: boolean;
  onClose: () => void;
  event: any;
}) => (
  <Modal
    hidePadding
    width="2xl"
    open={isOpen}
    onClose={onClose}
    title={event?.date.start}
    primaryButtonLabel="Give Feedback"
    // linkButtonLabel="Give Feedback"
  >
    <Box display="flex" flexDirection="column">
      <Box p="s20" display="flex" justifyContent="space-between">
        <Box display="flex" gap="s8" flexDir="column">
          <Text fontSize="r2" fontWeight="600" color="gray.800">
            {event?.title ?? '-'}
          </Text>
          <Box display="flex" gap="s8" alignItems="center">
            <Icon color="gray.600" size="sm" as={FiCalendar} />
            <Text fontSize="s3" fontWeight="500" color="gray.800">
              Date
            </Text>
            <Text fontSize="r1" fontWeight="500" color="gray.600">
              {`${event?.date?.start} - ${event?.date?.end}, ${event?.date?.year}`}
            </Text>
          </Box>
          {event?.time?.start && event?.time?.end && (
            <Box display="flex" gap="s8" alignItems="center">
              <Icon color="gray.600" size="sm" as={FiClock} />
              <Text fontSize="s3" fontWeight="500" color="gray.800">
                Time
              </Text>
              <Text fontSize="r1" fontWeight="500" color="gray.600">
                {`${event?.time?.start} - ${event?.time?.end}`}
              </Text>
            </Box>
          )}
          {event?.location && (
            <Box display="flex" gap="s8" alignItems="center">
              <Icon color="gray.600" size="sm" as={FiMapPin} />
              <Text fontSize="s3" fontWeight="500" color="gray.800">
                Location
              </Text>
              <Text
                fontSize="r1"
                fontWeight="500"
                color={event?.location ? 'info.500' : 'gray.600'}
                textDecoration={event?.location ? 'underline' : 'none'}
              >
                {event?.location ?? '-'}
              </Text>
            </Box>
          )}
          {event?.link && (
            <Box display="flex" gap="s8" alignItems="center">
              <Icon color="gray.600" size="sm" as={FiVideo} />
              <Text fontSize="s3" fontWeight="500" color="gray.800">
                Link
              </Text>
              <Text
                fontSize="r1"
                fontWeight="500"
                color={event?.link ? 'info.500' : 'gray.600'}
                cursor={event?.link ? 'pointer' : 'auto'}
                textDecoration={event?.link ? 'underline' : 'none'}
              >
                <a href={event?.link} target="blank">
                  Click to join
                </a>
              </Text>
              <Icon
                color="gray.600"
                _hover={{ color: 'info.500' }}
                as={FiCopy}
                onClick={() => copyToClipboard(event?.link)}
                size="sm"
                cursor="pointer"
              />
            </Box>
          )}
        </Box>
        <Box display="flex" flexDir="column" alignItems="end" gap="s8">
          <Text fontWeight="500" fontSize="r1" color="gray.700">
            Free
          </Text>
          <Box display="flex" gap="s4">
            <Icon size="sm" as={FiUsers} />
            <Text fontWeight="400" fontSize="r1" color="gray.700">
              {event?.enrolledMember ?? 0} Enrolled
            </Text>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box display="flex" gap="s16" p="s16" flexDir="column">
        <Text fontWeight="500" fontSize="r1" color="gray.700">
          What to Expect
        </Text>
        <Box display="flex" flexDir="column" gap="s8">
          <Text fontWeight="500" fontSize="13px" color="gray.800">
            Indroduction
          </Text>
          <Text fontWeight="400" fontSize="r1" color="gray.600">
            {event?.description ?? '-'}
          </Text>
        </Box>
        <Box display="flex" flexDir="column" gap="s8">
          <Text fontWeight="500" fontSize="13px" color="gray.800">
            Course Objectives:
          </Text>

          <List>
            {event?.courseObjectives?.map((e: string) => (
              <ListItem
                fontWeight="400"
                fontSize="r1"
                color="gray.600"
                display="flex"
                alignItems="center"
              >
                <Icon size="sm" as={BsDot} />

                {e}
              </ListItem>
            ))}
          </List>
        </Box>
        <Box display="flex" flexDir="column" gap="s8">
          <Text fontWeight="500" fontSize="13px" color="gray.800">
            Course prerequisites:
          </Text>

          <Text fontWeight="400" fontSize="r1" color="gray.600">
            None
          </Text>
        </Box>
      </Box>
      <Divider />
      <Box display="flex" gap="s16" p="s16" flexDir="column">
        <Box display="flex" flexDir="column" gap="s8">
          <Text fontWeight="500" fontSize="13px" color="gray.800">
            Trainers
          </Text>
          <Text fontWeight="400" fontSize="r1" color="gray.700">
            Table comes here
          </Text>
        </Box>
      </Box>
    </Box>
  </Modal>
);
