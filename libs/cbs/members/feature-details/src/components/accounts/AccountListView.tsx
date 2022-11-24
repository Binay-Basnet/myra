import { useState } from 'react';
import { IoList, IoLogoMicrosoft } from 'react-icons/io5';
import { useRouter } from 'next/router';

import { useGetMemberDetailsOverviewQuery } from '@coop/cbs/data-access';
import { Button, DetailsCard, Icon } from '@coop/shared/ui';
import { amountConverter } from '@coop/shared/utils';

import { AccountCard } from './AccountCard';
import { AccountTable } from './AccountTable';

export const AccountList = () => {
  const router = useRouter();
  const [showGrid, setShowGrid] = useState(true);

  const handleClick = () => {
    setShowGrid(!showGrid);
  };
  const memberDetails = useGetMemberDetailsOverviewQuery({
    id: router.query['id'] as string,
  });

  const memberBasicDetails =
    memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation;
  const contactNo = memberBasicDetails?.contactNumber;
  const memberName = memberBasicDetails?.memberName;
  const memberAccountDetails =
    memberDetails?.data?.members?.memberOverview?.data?.accounts?.accounts;
  const memberLength = memberAccountDetails?.length;
  const title = `Saving Accounts List(${memberLength})`;
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
          title={memberLength ? title : 'Saving Accounts List (0)'}
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
            <AccountCard
              accountName={item?.accountName as string}
              accountNumber={item?.accountNumber as string}
              contactNo={contactNo as string}
              interestRate={item?.interestRate as string}
              memberName={memberName as string}
              productName={item?.productName as string}
              productType={item?.productType as string}
              totalBalance={amountConverter(item?.totalBalance as string) as string}
            />
          ))}
        </DetailsCard>
      )}
      {!showGrid && (
        <DetailsCard
          hasTable
          bg="white"
          title={memberLength ? title : 'Saving Accounts List (0)'}
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
          <AccountTable data={memberListData} />
        </DetailsCard>
      )}
    </>
  );
};
