import { Box, FileViewer, Grid, Modal, Text } from '@myra-ui';

import { ProductRebateData } from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

interface IRebateDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  rebate: ProductRebateData | null | undefined;
}

export const RebateDetailModal = ({ isOpen, onClose, rebate }: IRebateDetailModalProps) => (
  <Modal title="Rebate Detail" open={isOpen} onClose={onClose}>
    <Box display="flex" flexDirection="column" gap="s20">
      <Grid templateColumns="repeat(3,1fr)" gap="s16">
        <Box display="flex" flexDirection="column" gap="s4">
          <Text variant="formLabel" color="gray.700">
            Created At
          </Text>
          <Text fontSize="r1" fontWeight={600} color="gray.800">
            {localizedDate(rebate?.additionalData?.createdAt)}
          </Text>
        </Box>
        <Box display="flex" flexDirection="column" gap="s4">
          <Text variant="formLabel" color="gray.700">
            Effective From
          </Text>
          <Text fontSize="r1" fontWeight={600} color="gray.800">
            {localizedDate(rebate?.additionalData?.effectiveDate)}
          </Text>
        </Box>
        <Box display="flex" flexDirection="column" gap="s4">
          <Text variant="formLabel" color="gray.700">
            Day before end date
          </Text>
          <Text fontSize="r1" fontWeight={600} color="gray.800">
            {rebate?.payload?.dayBeforeInstallmentDate ?? '-'}
          </Text>
        </Box>
        <Box display="flex" flexDirection="column" gap="s4">
          <Text variant="formLabel" color="gray.700">
            New Rebate Rate
          </Text>
          <Text fontSize="r1" fontWeight={600} color="gray.800">
            {rebate?.payload?.rebateRate ? `${rebate?.payload?.rebateRate} %` : '-'}
          </Text>
        </Box>
        <Box display="flex" flexDirection="column" gap="s4">
          <Text variant="formLabel" color="gray.700">
            New Penalty Amount
          </Text>
          <Text fontSize="r1" fontWeight={600} color="gray.800">
            {amountConverter(rebate?.payload?.rebateAmount)}
          </Text>
        </Box>
      </Grid>

      {rebate?.additionalData?.fileUploads?.length ? (
        <Box display="flex" flexDirection="column" gap="s4">
          <Text variant="formLabel" color="gray.700">
            File
          </Text>
          {rebate?.additionalData?.fileUploads?.map((file) => (
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
          {rebate?.additionalData?.notes || '-'}
        </Text>
      </Box>
    </Box>
  </Modal>
);
