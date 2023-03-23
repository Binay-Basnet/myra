import { Box, FileViewer, Grid, Modal, Text } from '@myra-ui';

import { InterestRateSetup } from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';

interface IInterestRateDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  rate: InterestRateSetup | null | undefined;
}

export const InterestRateDetailModal = ({
  isOpen,
  onClose,
  rate,
}: IInterestRateDetailModalProps) => (
  <Modal title="Interest Update Schedule" open={isOpen} onClose={onClose}>
    <Box display="flex" flexDirection="column" gap="s20">
      <Grid templateColumns="repeat(3,1fr)">
        <Box display="flex" flexDirection="column" gap="s4">
          <Text variant="formLabel" color="gray.700">
            Created At
          </Text>
          <Text fontSize="r1" fontWeight={600} color="gray.800">
            {localizedDate(rate?.createdAt)}
          </Text>
        </Box>
        <Box display="flex" flexDirection="column" gap="s4">
          <Text variant="formLabel" color="gray.700">
            Effective From
          </Text>
          <Text fontSize="r1" fontWeight={600} color="gray.800">
            {localizedDate(rate?.effectiveDate)}
          </Text>
        </Box>
        <Box display="flex" flexDirection="column" gap="s4">
          <Text variant="formLabel" color="gray.700">
            New Product Premium
          </Text>
          <Text fontSize="r1" fontWeight={600} color="gray.800">
            {`${rate?.rate} %`}
          </Text>
        </Box>
      </Grid>

      {rate?.fileUploads?.length ? (
        <Box display="flex" flexDirection="column" gap="s4">
          <Text variant="formLabel" color="gray.700">
            File
          </Text>
          {rate?.fileUploads?.map((file) => (
            <Box w="50%">
              <FileViewer fileName={file?.identifier} fileUrl={file?.url} />
            </Box>
          ))}
        </Box>
      ) : null}
      <Box display="flex" flexDirection="column" gap="s4">
        <Text variant="formLabel" color="gray.700">
          Note
        </Text>
        <Text fontSize="r1" fontWeight={500} color="gray.700">
          {rate?.note ?? '-'}
        </Text>
      </Box>
    </Box>
  </Modal>
);
