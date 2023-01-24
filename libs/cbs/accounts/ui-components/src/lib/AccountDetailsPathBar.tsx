import { Box, DetailPageHeader } from '@myra-ui';

import { useAccountDetails } from '@coop/cbs/data-access';

export interface PathBarProps {
  title: string;
}

export const AccountDetailsPathBar = ({ title }: PathBarProps) => {
  const { accountDetails } = useAccountDetails();

  return (
    <Box position="sticky" top="0" zIndex={10}>
      <DetailPageHeader
        title={title}
        member={{
          name: accountDetails?.member?.name?.local as string,
        }}
      />
    </Box>
  );
};
