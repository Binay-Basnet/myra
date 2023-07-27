import { useRouter } from 'next/router';

import { Avatar, Box, Button, Text } from '@myra-ui/foundations';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Share_Transaction_Direction, useGetShareHistoryQuery } from '@coop/cbs/data-access';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import { amountConverter, useTranslation } from '@coop/shared/utils';

type MemberType = {
  name?: string | undefined | null;
  code?: string | null;
  id?: string | undefined | null;
  gender?: string | undefined | null;
  age?: string | number | undefined | null;
  maritalStatus?: string | null;
  dateJoined?: string | undefined | null | Record<'en' | 'local' | 'np', string>;
  branch?: string;
  phoneNo?: string | undefined | null;
  email?: string | undefined | null;
  address?: string;
  profilePicUrl?: string | undefined | null;
};

/* eslint-disable-next-line */
export interface ShareMemberCardProps {
  memberDetailData: MemberType;
  totalAmount: number;
  memberId: string;
  mode: string;
}

export const ShareMemberCard = ({
  totalAmount,
  memberId,
  mode,
  memberDetailData,
}: ShareMemberCardProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  const { data } = useGetShareHistoryQuery(
    {
      memberId,
    },
    {
      staleTime: 0,
    }
  );
  const shareHistoryTableData = data?.share?.history;
  const shareHistoryData =
    shareHistoryTableData?.history && shareHistoryTableData?.history?.slice(0, 5);

  return (
    <Box bg="gray.0" h="100%">
      <Box px="s12" py="s8">
        <Text fontWeight="Medium" fontSize="s3" color="neutralColorLight.Gray-60">
          {t['memberInfo']}
        </Text>
      </Box>

      <Box p="s16" gap="s8" display="flex">
        <Avatar
          name={memberDetailData?.name ?? 'Member'}
          size="lg"
          src={memberDetailData?.profilePicUrl ?? ''}
          cursor="pointer"
        />
        <Box display="flex" flexDirection="column">
          <Text fontWeight="Medium" fontSize="r1" color="primary.500">
            {memberDetailData?.name}
          </Text>
          <Text fontWeight="Regular" fontSize="r1" color="neutralColorLight.Gray-80">
            {memberDetailData?.code}
          </Text>
          <Text fontWeight="Regular" fontSize="r1" color="neutralColorLight.Gray-80">
            {memberDetailData?.gender} | {memberDetailData?.age}
          </Text>
        </Box>
      </Box>

      <Box p="s16">
        <Box
          bg="gray.100"
          display="flex"
          flexDirection="column"
          gap="s8"
          p="s16"
          border="1px solid"
          borderColor="border.layout"
          borderTopLeftRadius="br2"
          borderTopRightRadius="br2"
        >
          <Box display="flex" justifyContent="space-between">
            <Text fontWeight="Medium" fontSize="s3" color="neutralColorLight.Gray-60">
              {t['memberShareCardTotalShareCount']}
            </Text>
            <Text as="span" fontWeight="Medium" fontSize="s3" color="neutralColorLight.Gray-60">
              {shareHistoryTableData && shareHistoryTableData?.balance?.count}
            </Text>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Text fontWeight="Medium" fontSize="s3" color="neutralColorLight.Gray-60">
              {t['memberShareCardTotalShareBalance']}
            </Text>
            <Text as="span" fontWeight="Medium" fontSize="s3" color="neutralColorLight.Gray-60">
              {shareHistoryTableData &&
                amountConverter(shareHistoryTableData?.balance?.amount as number)}
            </Text>
          </Box>
        </Box>

        <Box border="1px solid" borderTop="none" borderColor="border.layout">
          {shareHistoryData &&
            shareHistoryData?.map((item) => (
              <Box
                key={item?.id}
                px="s12"
                py="s8"
                borderBottom="1px solid"
                borderBottomColor="border.layout"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Text fontWeight="Medium" fontSize="s3" color="neutralColorLight.Gray-80">
                    {item?.transactionDirection === Share_Transaction_Direction.Purchase &&
                      t['sharePurchaseTableShareCr']}
                    {item?.transactionDirection === Share_Transaction_Direction.Return &&
                      t['sharePurchaseTableShareDr']}
                  </Text>
                  <Text fontWeight="Medium" fontSize="s3" color="neutralColorLight.Gray-60">
                    {localizedDate(item?.transactionDate)}
                  </Text>
                </Box>
                <Text as="span" fontWeight="Medium" fontSize="s3" color="neutralColorLight.Gray-80">
                  {item?.debit ?? item?.credit}
                </Text>
              </Box>
            ))}

          <Box px="s12" py="s8" display="flex" justifyContent="space-between">
            <Button
              onClick={() => router.push(`${ROUTES?.CBS_MEMBER_DETAILS}?id=${memberId}&tab=share`)}
              variant="ghost"
            >
              {t['viewAll']}
            </Button>
          </Box>
        </Box>

        {mode === 'sharePayment' && (
          <Box
            bg="gray.100"
            display="flex"
            gap="s8"
            p="s16"
            mt="s32"
            border="1px solid"
            borderColor="border.layout"
            borderRadius="br2"
            justifyContent="space-between"
          >
            <Text fontWeight="Medium" fontSize="s3" color="neutralColorLight.Gray-60">
              {t['payableAmount']}
            </Text>
            <Text as="span" fontWeight="SemiBold" fontSize="s3" color="neutralColorLight.Gray-80">
              {totalAmount || 0}
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ShareMemberCard;
