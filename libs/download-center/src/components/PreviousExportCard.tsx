import { HiOutlineDocumentReport, HiOutlineDownload } from 'react-icons/hi';
import { IoMdPrint } from 'react-icons/io';

import { Box, Divider, Icon, Text } from '@myra-ui';

interface PreviousExportCardProps {
  item?: {
    title: string;
    date: string;
    initiatedBy: string;
  };
}

const PreviousExportCard = (props: PreviousExportCardProps) => {
  const { item } = props;
  return (
    <Box
      display="flex"
      flexDir="column"
      gap="s16"
      p="s16"
      borderRadius={6}
      border="1px"
      borderColor="border.layout"
      w="300px"
    >
      <Box display="flex" alignItems="center" gap="s16">
        <Icon as={HiOutlineDocumentReport} color="gray.500" size="xl" />
        <Box>
          <Text fontSize="r1" fontWeight="medium">
            {item?.title}
          </Text>
          <Text fontSize="s2" color="gray.600">
            {item?.date}
          </Text>
        </Box>
      </Box>
      <Text fontSize="s2" color="gray.600">
        Initiated By {item?.initiatedBy}
      </Text>
      <Divider />
      <Box display="flex" gap="s12">
        <Box display="flex" gap="s8">
          {' '}
          <Icon as={HiOutlineDownload} color="primary.500" size="sm" />
          <Text fontSize="s2">Download</Text>
        </Box>
        <Box display="flex" gap="s8">
          {' '}
          <Icon as={IoMdPrint} color="primary.500" size="sm" />
          <Text fontSize="s2">Print</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default PreviousExportCard;
