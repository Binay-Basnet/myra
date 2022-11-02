import { Box, DetailPageMemberCard, DetailPageTabs, Text, TextFields } from '@coop/shared/ui';
import { useAccountDetails } from '@coop/shared/utils';

export const AccountDetailsSidebar = () => {
  const { accountDetails } = useAccountDetails();

  // const memberDetails = useGetMemberDetailsOverviewQuery({
  //   id: String(accountDetails?.id),
  // });

  // const memberInfo = memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation;

  return (
    <>
      <Box
        borderBottom="1px"
        borderBottomColor="border.layout"
        display="flex"
        p="s16"
        justifyContent="space-between"
      >
        <Box display="flex" flexDirection="column" gap="s4">
          <Text fontSize="r1" fontWeight={600} color="gray.800" lineHeight="1.5">
            {accountDetails?.accountName}
          </Text>
          <Text fontSize="s3" fontWeight={500} color="neutralColorLight.Gray-60" lineHeight="1.5">
            {accountDetails?.productName}
          </Text>
          <Text fontSize="s3" fontWeight={400} color="neutralColorLight.Gray-50" lineHeight="1.5">
            {accountDetails?.accountId}
          </Text>
        </Box>

        <TextFields variant="formHelper">{accountDetails?.accountOpenDate}</TextFields>
      </Box>

      <Box
        borderBottom="1px"
        borderBottomColor="border.layout"
        display="flex"
        flexDirection="column"
      >
        <DetailPageMemberCard
          id={accountDetails?.accountId as string}
          name={accountDetails?.member?.name?.local as string}
          profilePicUrl={accountDetails?.member?.profilePicUrl ?? ''}
        />
      </Box>

      <DetailPageTabs
        tabs={[
          'Overview',
          'Transactions',
          'Withdraw Slip',
          'ATM',
          'Activity',
          'Documents',
          'Tasks',
        ]}
      />
    </>
  );
};
