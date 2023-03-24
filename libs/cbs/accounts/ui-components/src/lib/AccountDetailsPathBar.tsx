import { Box, DetailPageHeader } from '@myra-ui';

import { useAccountDetails } from '@coop/cbs/data-access';

export interface PathBarProps {
  title: string;
  options?: { label: string; handler: () => void }[];
}

export const AccountDetailsPathBar = ({ title, options }: PathBarProps) => {
  const { accountDetails } = useAccountDetails();

  return (
    <Box position="sticky" top="0" zIndex={10}>
      <DetailPageHeader
        title={title}
        member={{
          name: accountDetails?.member?.name?.local as string,
        }}
        options={options}
      />
    </Box>
  );
};
