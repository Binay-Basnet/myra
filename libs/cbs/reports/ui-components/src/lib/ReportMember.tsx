import { Box, Grid, GridItem, Text } from '@myra-ui';

import { Member, SavingStatementMeta } from '@coop/cbs/data-access';
import { formatAddress, localizedDate } from '@coop/cbs/utils';
import { useTranslation } from '@coop/shared/utils';

interface ReportMemberProps {
  member: Partial<Member> | undefined | null;
  accountCloseDate?: string;
  savingData?: {
    meta?: SavingStatementMeta;
  };
}

export const ReportMember = ({ member, accountCloseDate, savingData }: ReportMemberProps) => {
  const { t } = useTranslation();

  return (
    // const branch = useAppSelector((state) => state?.auth?.user?.currentBranch);

    <Box px="s16" pt="s16" display="flex" justifyContent="space-between">
      <Box w="50%">
        <Box w="70%">
          <Grid templateColumns="repeat(2, 1fr)">
            <GridItem>
              <Box display="flex" flexDir="column">
                <Text fontSize="r1" color="gray.700">
                  {t['reportsMemberName']}:
                </Text>
                <Text fontSize="r1" color="gray.700">
                  {t['reportsMemberAddress']}:
                </Text>
                <Text fontSize="r1" color="gray.700">
                  {t['reportsMemberServiceCenterName']}:
                </Text>

                <Text fontSize="r1" color="gray.700">
                  {t['reportsMemberPanNo']}:
                </Text>

                {!!savingData?.meta?.accountNo && (
                  <Text fontSize="r1" color="gray.700">
                    {t['reportsMemberAccountNo']}:
                  </Text>
                )}

                {!!savingData?.meta?.accountName && (
                  <Text fontSize="r1" color="gray.700">
                    {t['reportsMemberAccountName']}:
                  </Text>
                )}

                {!!savingData?.meta?.currentInterestRate && (
                  <Text fontSize="r1" color="gray.700">
                    {t['reportsMemberCurrentInterestRate']}:
                  </Text>
                )}
                {!!savingData?.meta?.savingType && (
                  <Text fontSize="r1" color="gray.700">
                    {t['reportsMemberSavingType']}:
                  </Text>
                )}
                {!!savingData?.meta?.productName && (
                  <Text fontSize="r1" color="gray.700">
                    {t['reportsMemberProductName']}:
                  </Text>
                )}
              </Box>
            </GridItem>

            <GridItem>
              <Box display="flex" flexDir="column">
                <Text
                  noOfLines={1}
                  fontSize="r1"
                  color="gray.700"
                  textTransform="capitalize"
                  fontWeight="500"
                >
                  {member?.name?.local === '' ? '-' : member?.name?.local}
                </Text>
                <Text noOfLines={1} fontSize="r1" color="gray.700" fontWeight="500">
                  {formatAddress(member?.address)}
                </Text>
                <Text
                  noOfLines={1}
                  fontSize="r1"
                  color="gray.700"
                  fontWeight="500"
                  textTransform="capitalize"
                >
                  {member?.branch || '-'}
                </Text>

                <Text
                  noOfLines={1}
                  fontSize="r1"
                  color="gray.700"
                  fontWeight="500"
                  textTransform="capitalize"
                >
                  {member?.panVatNo || '-'}
                </Text>

                {!!savingData?.meta?.accountNo && (
                  <Text
                    noOfLines={1}
                    fontSize="r1"
                    color="gray.700"
                    fontWeight="500"
                    textTransform="capitalize"
                  >
                    {savingData?.meta?.accountNo}
                  </Text>
                )}
                {!!savingData?.meta?.accountName && (
                  <Text
                    noOfLines={1}
                    fontSize="r1"
                    color="gray.700"
                    fontWeight="500"
                    textTransform="capitalize"
                  >
                    {savingData?.meta?.accountName}
                  </Text>
                )}
                {!!savingData?.meta?.currentInterestRate && (
                  <Text
                    noOfLines={1}
                    fontSize="r1"
                    color="gray.700"
                    fontWeight="500"
                    textTransform="capitalize"
                  >
                    {`${savingData?.meta?.currentInterestRate} %`}
                  </Text>
                )}
                {savingData?.meta?.savingType && (
                  <Text
                    noOfLines={1}
                    fontSize="r1"
                    color="gray.700"
                    fontWeight="500"
                    textTransform="capitalize"
                  >
                    {savingData?.meta?.savingType?.replace(/_/g, ' ').toLowerCase()}
                  </Text>
                )}
                {!!savingData?.meta?.savingType && (
                  <Text
                    noOfLines={1}
                    fontSize="r1"
                    color="gray.700"
                    fontWeight="500"
                    textTransform="capitalize"
                  >
                    {savingData?.meta?.productName}
                  </Text>
                )}
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Box>

      <Box w="50%">
        <Box w="70%">
          <Grid templateColumns="repeat(2, 1fr)">
            <GridItem>
              <Box display="flex" flexDir="column">
                <Text fontSize="r1" color="gray.700">
                  {t['reportsMemberMembershipNo']}:
                </Text>
                <Text fontSize="r1" color="gray.700">
                  {t['reportsMemberMembershipDate']}:
                </Text>
                {accountCloseDate && (
                  <Text fontSize="r1" color="gray.700">
                    {t['reportsMemberAccountCloseDate']}:
                  </Text>
                )}
              </Box>
            </GridItem>

            <GridItem>
              <Box display="flex" flexDir="column">
                <Text noOfLines={1} fontSize="r1" color="gray.700" fontWeight="500">
                  {member?.code ?? '-'}
                </Text>
                <Text noOfLines={1} fontSize="r1" color="gray.700" fontWeight="500">
                  {localizedDate(member?.activeDate)}
                </Text>
                {accountCloseDate && (
                  <Text noOfLines={1} fontSize="r1" color="gray.700" fontWeight="500">
                    {accountCloseDate}
                  </Text>
                )}
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
