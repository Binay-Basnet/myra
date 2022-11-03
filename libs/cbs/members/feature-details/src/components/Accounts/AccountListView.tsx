import { useState } from 'react';
import { IoList, IoLogoMicrosoft } from 'react-icons/io5';
import { useRouter } from 'next/router';

import { useGetMemberDetailsOverviewQuery } from '@coop/cbs/data-access';
import { Box, Button, DetailsCard, Icon, Text } from '@coop/shared/ui';

import { UpcomingPaymentTable } from './AccountTable';

export const AccountList = () => {
  const router = useRouter();
  const [showGrid, setShowGrid] = useState(true);
  const handleClick = () => {
    setShowGrid(!showGrid);
  };
  const memberDetails = useGetMemberDetailsOverviewQuery({
    id: router.query['id'] as string,
  });
  const memberAccountDetails =
    memberDetails?.data?.members?.memberOverview?.data?.accounts?.accounts;
  const memberLength = memberAccountDetails?.length;
  const title = `Accounts(${memberLength})`;
  const memberListData =
    memberAccountDetails?.map((data, index) => ({
      sn: Number(index) + 1,
      accountType: data?.productType,
      accountName: data?.accountName,
      totalBalance: data?.totalBalance,
      interestRate: data?.interestRate,
    })) || [];
  return (
    <>
      {' '}
      {showGrid && (
        <DetailsCard
          bg="white"
          title={memberLength ? title : 'Accounts (0)'}
          leftBtn={
            <Button
              variant="ghost"
              onClick={handleClick}
              leftIcon={!showGrid ? <Icon as={IoLogoMicrosoft} /> : <Icon as={IoList} />}
            >
              {showGrid ? 'List' : 'Grid'}
            </Button>
          }
        >
          {memberAccountDetails?.map((item) => (
            <Box
              bg="white"
              display="flex"
              justifyContent="space-between"
              p="s16"
              border="1px solid"
              borderRadius="br2"
              borderColor="border.layout"
            >
              <Box display="flex" flexDirection="column" gap="s16">
                <Box display="flex" flexDirection="column" gap="s4">
                  <Box>
                    <Text fontWeight="600" fontSize="r1" color="primary.500">
                      {item?.accountName}{' '}
                    </Text>
                    <Text fontWeight="400" fontSize="s3">
                      {item?.accountNumber}{' '}
                    </Text>
                  </Box>
                  <Text fontWeight="400" fontSize="s3" color="gray.500">
                    {item?.productName}
                  </Text>
                </Box>
                <Text fontWeight="500" fontSize="s3">
                  {item?.productType}
                </Text>
              </Box>
              <Box pt="s8" display="flex" flexDirection="column" gap="s4">
                <Text fontWeight="500" fontSize="r2" textAlign="right">
                  {item?.totalBalance ?? '0'}
                </Text>
                <Text fontWeight="400" fontSize="s3">
                  Interest Rate : {item?.interestRate} %
                </Text>
              </Box>
            </Box>
          ))}
        </DetailsCard>
      )}
      {!showGrid && (
        <DetailsCard
          hasTable
          bg="white"
          title={memberLength ? title : 'Accounts (0)'}
          leftBtn={
            <Button
              variant="ghost"
              onClick={handleClick}
              leftIcon={!showGrid ? <Icon as={IoLogoMicrosoft} /> : <Icon as={IoList} />}
            >
              {showGrid ? 'List' : 'Grid'}
            </Button>
          }
        >
          <UpcomingPaymentTable data={memberListData} />
        </DetailsCard>
      )}
    </>
  );
};
