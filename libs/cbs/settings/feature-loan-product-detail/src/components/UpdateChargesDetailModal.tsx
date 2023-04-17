import { Box, FileViewer, Grid, Modal, Text } from '@myra-ui';

import { useGetLoanProductProcessingChargeDetailQuery } from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';

interface IUpdateChargesDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId: string;
}

export const UpdateChargesDetailModal = ({
  isOpen,
  onClose,
  serviceId,
}: IUpdateChargesDetailModalProps) => {
  const { data } = useGetLoanProductProcessingChargeDetailQuery(
    { chargeId: serviceId },
    { enabled: !!serviceId }
  );
  const chargeDetailData = data?.settings?.general?.loanProducts?.getProcessingCharge?.data;
  return (
    <Modal title="Loan Processing Charge Update" open={isOpen} onClose={onClose}>
      <Box display="flex" flexDirection="column" gap="s20">
        <Grid templateColumns="repeat(3,1fr)">
          <Box display="flex" flexDirection="column" gap="s4">
            <Text variant="formLabel" color="gray.700">
              Created At
            </Text>
            <Text fontSize="r1" fontWeight={600} color="gray.800">
              {localizedDate(chargeDetailData?.additionalData?.createdAt)}
            </Text>
          </Box>
          <Box display="flex" flexDirection="column" gap="s4">
            <Text variant="formLabel" color="gray.700">
              Effective From
            </Text>
            <Text fontSize="r1" fontWeight={600} color="gray.800">
              {localizedDate(chargeDetailData?.additionalData?.effectiveDate)}
            </Text>
          </Box>
        </Grid>
        <Grid templateColumns="repeat(3,1fr)">
          {chargeDetailData?.payload?.map((item) => (
            <>
              <Box display="flex" flexDirection="column" gap="s4">
                <Text variant="formLabel" color="gray.700">
                  Service Name
                </Text>
                <Text fontSize="r1" fontWeight={600} color="gray.800">
                  {item?.serviceName}
                </Text>
              </Box>
              <Box display="flex" flexDirection="column" gap="s4">
                <Text variant="formLabel" color="gray.700">
                  Ledger Name
                </Text>
                <Text fontSize="r1" fontWeight={600} color="gray.800">
                  {item?.ledgerName}
                </Text>
              </Box>
              <Box display="flex" flexDirection="column" gap="s4">
                <Text variant="formLabel" color="gray.700">
                  Amount
                </Text>
                <Text fontSize="r1" fontWeight={600} color="gray.800">
                  {item?.amount}
                </Text>
              </Box>
            </>
          ))}
        </Grid>

        {chargeDetailData?.additionalData?.fileUploads?.length ? (
          <Box display="flex" flexDirection="column" gap="s4">
            <Text variant="formLabel" color="gray.700">
              File
            </Text>
            {chargeDetailData?.additionalData?.fileUploads?.map((file) => (
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
            {chargeDetailData?.additionalData?.notes ?? '-'}
          </Text>
        </Box>
      </Box>
    </Modal>
  );
};
