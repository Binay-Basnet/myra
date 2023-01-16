import { Box, DetailPageHeader } from '@myra-ui';

import { useLoanDetails } from '../../hooks/useLoanDetails';

interface ILoanDetailsHeaderProps {
  title: string;
}

export const LoanDetailsHeader = ({ title }: ILoanDetailsHeaderProps) => {
  const { loanPreview } = useLoanDetails();

  return (
    <Box position="sticky" top="0">
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
