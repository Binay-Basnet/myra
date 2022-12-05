import { Box, DetailPageHeader } from '@myra-ui';
import { useTransactionDetailHooks } from 'libs/cbs/transactions/feature-detail-page/src/hooks/useTransactionDetailHooks';

export interface PathBarProps {
  title: string;
}

export const DetailPathBar = ({ title }: PathBarProps) => {
  const { memberDetail } = useTransactionDetailHooks();

  return (
    <Box position="sticky" top="110px" zIndex={10}>
      <DetailPageHeader
        title={title}
        member={{
          name: memberDetail?.name ?? '',
        }}
      />
    </Box>
  );
};
