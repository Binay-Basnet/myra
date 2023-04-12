import { Box, FileViewer, Grid, Modal, Text } from '@myra-ui';

import { ProductPenaltyData } from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

interface IPenaltyDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  penalty: ProductPenaltyData | null | undefined;
}

export const PenaltyDetailModal = ({ isOpen, onClose, penalty }: IPenaltyDetailModalProps) => (
  <Modal title="Interest Update Schedule" open={isOpen} onClose={onClose}>
    <Box display="flex" flexDirection="column" gap="s20">
      <Grid templateColumns="repeat(3,1fr)">
        <Box display="flex" flexDirection="column" gap="s4">
          <Text variant="formLabel" color="gray.700">
            Created At
          </Text>
          <Text fontSize="r1" fontWeight={600} color="gray.800">
            {localizedDate(penalty?.additionalData?.createdAt)}
          </Text>
        </Box>
        <Box display="flex" flexDirection="column" gap="s4">
          <Text variant="formLabel" color="gray.700">
            Effective From
          </Text>
          <Text fontSize="r1" fontWeight={600} color="gray.800">
            {localizedDate(penalty?.additionalData?.effectiveDate)}
          </Text>
        </Box>
        <Box display="flex" flexDirection="column" gap="s4">
          <Text variant="formLabel" color="gray.700">
            Day from end date
          </Text>
          <Text fontSize="r1" fontWeight={600} color="gray.800">
            {`${penalty?.payload?.penaltyRate} %`}
          </Text>
        </Box>
        <Box display="flex" flexDirection="column" gap="s4">
          <Text variant="formLabel" color="gray.700">
            New Penalty Rate
          </Text>
          <Text fontSize="r1" fontWeight={600} color="gray.800">
            {`${penalty?.payload?.penaltyRate} %`}
          </Text>
        </Box>
        <Box display="flex" flexDirection="column" gap="s4">
          <Text variant="formLabel" color="gray.700">
            New Penalty Amount
          </Text>
          <Text fontSize="r1" fontWeight={600} color="gray.800">
            {amountConverter(penalty?.payload?.penaltyAmount)}
          </Text>
        </Box>
      </Grid>

      {penalty?.additionalData?.fileUploads?.length ? (
        <Box display="flex" flexDirection="column" gap="s4">
          <Text variant="formLabel" color="gray.700">
            File
          </Text>
          {penalty?.additionalData?.fileUploads?.map((file) => (
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
          {penalty?.additionalData?.notes ?? '-'}
        </Text>
      </Box>
    </Box>
  </Modal>
);
