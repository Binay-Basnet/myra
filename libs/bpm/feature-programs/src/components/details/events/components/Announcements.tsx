import { GrAnnounce } from 'react-icons/gr';

import { Box, DetailsCard, Icon, Text } from '@myra-ui';

import { useEventsDetailsHook } from '../hooks/useEventsDetails';

export const Announcements = () => {
  const { detailData } = useEventsDetailsHook();
  const announcements = detailData?.announcements;

  return (
    <DetailsCard title="Announcements" bg="white" hasTable>
      <Box display="flex" flexDir="column">
        {announcements?.map((item, index) => (
          <Box
            display="flex"
            justifyContent="flex-start"
            key={`${item?.title}-${item?.description}`}
            maxH="fit-content"
            gap="s16"
            p="s16"
            pt="s8"
            borderBottom="1px solid"
            borderBottomColor="border.layout"
          >
            <Icon as={GrAnnounce} color={index % 2 === 0 ? 'aqua' : 'purple'} />
            <Box display="flex" flexDirection="column" gap="s4">
              <Text fontSize="r1" fontWeight="500">
                {item?.title}
              </Text>
              <Text fontSize="r1" fontWeight="500">
                {item?.description}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>
    </DetailsCard>
  );
};
