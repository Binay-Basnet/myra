import { HiOutlineDocumentReport, HiOutlineDownload } from 'react-icons/hi';
import { IoIosList } from 'react-icons/io';

import { Box, Divider, Icon, Text } from '@myra-ui';

import { DownloadCenterNode } from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';

export interface CardInfoProps {
  node?: DownloadCenterNode;
}
interface PreviousExportCardProps {
  item?: CardInfoProps;
  onClick: () => void;
}

const PreviousExportCard = (props: PreviousExportCardProps) => {
  const { item, onClick } = props;

  return (
    <Box
      display="flex"
      flexDir="column"
      gap="s16"
      p="s16"
      borderRadius={6}
      border="1px"
      borderColor="border.layout"
      // flexWrap="wrap"
    >
      <Box display="flex" alignItems="center" gap="s16">
        {item?.node?.downloadType === 'REPORT' ? (
          <Icon as={HiOutlineDocumentReport} color="gray.500" size="xl" />
        ) : (
          <Icon as={IoIosList} color="gray.500" size="xl" />
        )}

        <Box>
          <Text fontSize="r1" fontWeight="medium" wordBreak="break-all">
            {item?.node?.title}
          </Text>
          <Text fontSize="s2" color="gray.600">
            {localizedDate(item?.node?.createdAtLocalized)}
          </Text>
        </Box>
      </Box>
      <Text fontSize="s2" color="gray.600">
        Initiated By {item?.node?.userName}
      </Text>
      <Divider />
      <Box display="flex" gap="s12">
        <Box display="flex" gap="s8" cursor="pointer" onClick={onClick}>
          {' '}
          <Icon as={HiOutlineDownload} color="primary.500" size="sm" />
          <Text fontSize="s2">Download</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default PreviousExportCard;
