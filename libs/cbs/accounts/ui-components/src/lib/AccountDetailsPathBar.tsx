import { Box, DetailPageHeader } from '@coop/shared/ui';
import { useAccountDetails } from '@coop/shared/utils';

export interface PathBarProps {
  title: string;
}

export const AccountDetailsPathBar = ({ title }: PathBarProps) => {
  const { accountDetails } = useAccountDetails();

  return (
    <Box position="sticky" top="110px" zIndex={10}>
      <DetailPageHeader
        title={title}
        member={{
          name: accountDetails?.member?.name?.local as string,
          profilePicUrl: accountDetails?.member?.profilePicUrl as string,
        }}
      />
    </Box>
  );
};
