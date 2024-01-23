import { HiOutlineDocumentReport, HiOutlineDownload } from 'react-icons/hi';
import { IoIosList } from 'react-icons/io';

import { Box, Divider, Icon, Text } from '@myra-ui';

import { readableTimeParser } from '@coop/cbs/utils';

export interface CardInfoProps {
  node?: {
    id: string;
    title: string;
    downloadType: string;
    createdAt: string;
    userId: string;
  };
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
    >
      <Box display="flex" alignItems="center" gap="s16">
        {item?.node?.downloadType === 'REPORT' ? (
          <Icon as={HiOutlineDocumentReport} color="gray.500" size="xl" />
        ) : (
          <Icon as={IoIosList} color="gray.500" size="xl" />
        )}

        <Box>
          <Text fontSize="r1" fontWeight="medium">
            {item?.node?.title}
          </Text>
          <Text fontSize="s2" color="gray.600">
            {readableTimeParser(item?.node?.createdAt as string, true)}
          </Text>
        </Box>
      </Box>
      <Text fontSize="s2" color="gray.600">
        Initiated By {item?.node?.userId}
      </Text>
      <Divider />
      <Box display="flex" gap="s12">
        <Box display="flex" gap="s8" cursor="pointer" onClick={onClick}>
          {' '}
          <Icon as={HiOutlineDownload} color="primary.500" size="sm" />
          <Text fontSize="s2">Download</Text>
        </Box>
        {/* <Box display="flex" gap="s8">
          {' '}
          <Icon as={IoMdPrint} color="primary.500" size="sm" />
          <Text fontSize="s2">Print</Text>
        </Box> */}
      </Box>
    </Box>
  );
};

export default PreviousExportCard;
