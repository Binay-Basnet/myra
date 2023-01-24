import { Box, DetailPageHeader } from '@myra-ui';

import { useTransferDetailHooks } from '../../hooks/useTransferDetailHooks';

interface ITransferDetailsHeaderProps {
  title: string;
}

export const TransferDetailsHeader = ({ title }: ITransferDetailsHeaderProps) => {
  const { transferDetailData } = useTransferDetailHooks();

  return (
    <Box position="sticky" top="0">
      <DetailPageHeader
        title={title}
        member={{
          name: transferDetailData?.srcBranch?.local as string,
        }}
      />
    </Box>
  );
};
