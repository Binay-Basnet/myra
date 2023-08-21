import { Box, DetailsCard, FileViewer } from '@myra-ui';

import { useMeetingDetailsHook } from '../hooks/useMeetingDetails';

export const MimutesFiles = () => {
  const { detailData } = useMeetingDetailsHook();
  const rate = detailData?.minute?.files;

  return (
    <DetailsCard title="Minutes" bg="white" hasThreeRows>
      {rate?.map((file) => (
        <Box w="50%">
          <FileViewer fileName={file?.identifier} fileUrl={file?.url} />
        </Box>
      ))}
    </DetailsCard>
  );
};
