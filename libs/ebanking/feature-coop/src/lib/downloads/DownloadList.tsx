import { BsDownload } from 'react-icons/bs';

import { InfoCard } from '@coop/ebanking/cards';
import { EmptyState } from '@coop/ebanking/components';
import { useGetDownloadCoopListQuery } from '@coop/ebanking/data-access';
import { Box, Button, Divider, Icon, PathBar, Text, VStack } from '@coop/shared/ui';

interface IDownloadListProps {
  category: string;
}

export const DownloadsList = ({ category }: IDownloadListProps) => {
  const { data } = useGetDownloadCoopListQuery({ filter: { category } });

  const downloads = data?.eBanking?.cooperativeServices?.downloads?.files;

  return (
    <Box display="flex" flexDirection="column" gap="s16">
      <PathBar
        paths={[
          { label: 'COOP', link: '/coop' },
          { label: 'Downloads', link: '/coop' },
          { label: category, link: `/coop/downloads/${category.toLowerCase()}` },
        ]}
      />
      <InfoCard title={category}>
        <Box p="s16" display="flex" flexDirection="column" gap="s16">
          <VStack
            width="100%"
            bg="white"
            spacing="0"
            alignItems="start"
            gap="s16"
            divider={<Divider borderBottom="1px" borderBottomColor="border.layout" />}
          >
            {downloads && downloads.length !== 0 ? (
              downloads.map((download) => (
                <Box
                  key={download.id}
                  display="flex"
                  alignItems="center"
                  w="100%"
                  justifyContent="space-between"
                >
                  <Box display="flex" flexDir="column" gap="s4">
                    <Text fontSize="r1" color="gray.900">
                      {download.name}
                    </Text>
                    <Text fontSize="r1" color="gray.500">
                      {download.extension.toUpperCase()} | {download.size}
                    </Text>
                  </Box>

                  <a href={download.url} download>
                    <Button variant="ghost">
                      <Icon as={BsDownload} color="primary.500" />
                    </Button>
                  </a>
                </Box>
              ))
            ) : (
              <Box w="100%" display="flex" justifyContent="center" py="s32">
                <EmptyState title="No Form Downloads" />
              </Box>
            )}
          </VStack>
        </Box>
      </InfoCard>
    </Box>
  );
};
