import { useRouter } from 'next/router';

import { Member, useGetShareHistoryQuery } from '@coop/cbs/data-access';
import { amountConverter, useTranslation } from '@coop/shared/utils';

import Avatar from '../avatar/Avatar';
import Box from '../box/Box';
import Button from '../button/Button';
import Text from '../text/Text';

/* eslint-disable-next-line */
export interface ShareMemberCardProps {
  memberDetails: Partial<Member>;
  totalAmount: number;
}

export function ShareMemberCard({
  memberDetails,
  totalAmount,
}: ShareMemberCardProps) {
  const { t } = useTranslation();
  const router = useRouter();

  const id = String(router?.query?.['id']);

  // const memberProfile =
  //   memberDetails?.profile && memberDetails?.profile?.data?.formData;

  const { data } = useGetShareHistoryQuery(
    {
      memberId: id,
    },
    {
      staleTime: 0,
    }
  );

  const shareHistoryTableData = data?.share?.history;

  return (
    <Box bg="gray.0" h="100%">
      <Box px="s12" py="s8">
        <Text
          fontWeight="Medium"
          fontSize="s3"
          color="neutralColorLight.Gray-60"
        >
          {t['memberInfo']}
        </Text>
      </Box>

      <Box p="s16" gap="s8" display="flex">
        <Avatar
          name={memberDetails?.name?.local ?? 'Member'}
          size="lg"
          src={memberDetails?.name?.local}
          cursor="pointer"
        />
        <Box display="flex" flexDirection="column">
          <Text fontWeight="Medium" fontSize="r1" color="primary.500">
            {memberDetails?.name?.local}
          </Text>
          <Text
            fontWeight="Regular"
            fontSize="r1"
            color="neutralColorLight.Gray-80"
          >
            {memberDetails?.id}
          </Text>
          <Text
            fontWeight="Regular"
            fontSize="r1"
            color="neutralColorLight.Gray-80"
          >
            {/* {memberProfile?.basicInformation?.gender?.local} |{' '}
            {memberProfile?.basicInformation?.age} */}
            Male | 19
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
          borderRadius="br2"
        >
          <Box display="flex" justifyContent="space-between">
            <Text
              fontWeight="Medium"
              fontSize="s3"
              color="neutralColorLight.Gray-60"
            >
              {t['memberShareCardTotalShareCount']}
            </Text>
            <Text
              as="span"
              fontWeight="Medium"
              fontSize="s3"
              color="neutralColorLight.Gray-60"
            >
              {shareHistoryTableData && shareHistoryTableData?.balance?.count}
            </Text>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Text
              fontWeight="Medium"
              fontSize="s3"
              color="neutralColorLight.Gray-60"
            >
              {t['memberShareCardTotalShareBalance']}
            </Text>
            <Text
              as="span"
              fontWeight="Medium"
              fontSize="s3"
              color="neutralColorLight.Gray-60"
            >
              {shareHistoryTableData &&
                amountConverter(
                  shareHistoryTableData?.balance?.amount as number
                )}
            </Text>
          </Box>
        </Box>

        <Box border="1px solid" borderColor="border.layout">
          {shareHistoryTableData &&
            shareHistoryTableData?.history?.map((item) => (
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
                  <Text
                    fontWeight="Medium"
                    fontSize="s3"
                    color="neutralColorLight.Gray-80"
                  >
                    {item?.debit
                      ? t['sharePurchaseTableShareDr']
                      : t['sharePurchaseTableShareCr']}
                  </Text>
                  <Text
                    fontWeight="Medium"
                    fontSize="s3"
                    color="neutralColorLight.Gray-60"
                  >
                    {item?.transactionDate}
                  </Text>
                </Box>
                <Text
                  as="span"
                  fontWeight="Medium"
                  fontSize="s3"
                  color="neutralColorLight.Gray-80"
                >
                  {item?.debit ?? item?.credit}
                </Text>
              </Box>
            ))}

          <Box px="s12" py="s8" display="flex" justifyContent="space-between">
            <Button variant="ghost">{t['viewAll']}</Button>
          </Box>
        </Box>

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
          <Text
            fontWeight="Medium"
            fontSize="s3"
            color="neutralColorLight.Gray-60"
          >
            {t['payableAmount']}
          </Text>
          <Text
            as="span"
            fontWeight="SemiBold"
            fontSize="s3"
            color="neutralColorLight.Gray-80"
          >
            {totalAmount ?? 0}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

export default ShareMemberCard;
