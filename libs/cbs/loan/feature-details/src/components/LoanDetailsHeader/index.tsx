import { Box, DetailPageHeader } from '@myra-ui';

import { useLoanDetails } from '../../hooks/useLoanDetails';

interface ILoanDetailsHeaderProps {
  title: string;
  options?: { label: string; handler: () => void }[];
}

export const LoanDetailsHeader = ({ title, options }: ILoanDetailsHeaderProps) => {
  const { loanPreview } = useLoanDetails();

  return (
    <Box position="sticky" zIndex={10} top="0">
      <DetailPageHeader
        title={title}
        member={{
          name: loanPreview?.member?.name?.local as string,
        }}
        options={options}
      />
    </Box>
  );
};
