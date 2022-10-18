import { Box, DetailPageHeader } from '@coop/shared/ui';

import { useLoanDetails } from '../../hooks/useLoanDetails';

interface ILoanDetailsHeaderProps {
  title: string;
}

export const LoanDetailsHeader = ({ title }: ILoanDetailsHeaderProps) => {
  const { loanPreview } = useLoanDetails();

  return (
    <Box position="sticky" top="110px">
      <DetailPageHeader
        title={title}
        member={{
          name: loanPreview?.member?.name?.local as string,
          profilePicUrl: loanPreview?.member?.profilePicUrl as string,
        }}
      />
    </Box>
  );
};
