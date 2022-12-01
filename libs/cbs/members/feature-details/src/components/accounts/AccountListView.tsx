import { useState } from 'react';
import { IoList, IoLogoMicrosoft } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { Button, DetailsCard, Icon } from '@myra-ui';

import { useGetMemberDetailsOverviewQuery } from '@coop/cbs/data-access';

import { AccountCard } from './AccountCard';
import { AccountTable } from './AccountTable';
import { ClosedAccountTable } from './ClosedAccountTable';

interface IAccountListProps {
  title: string;
  accountList: {
    sn: number;
    accountType: string | null | undefined;
    accountName: string | null | undefined;
    totalBalance?: string | number | null | undefined;
    interestRate: string | number | null | undefined;
    accountNumber: string | null | undefined;
    productName: string | null | undefined;
  }[];
  isClosedAccounts?: boolean;
}

export const AccountList = ({ title, accountList, isClosedAccounts }: IAccountListProps) => {
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
          {accountList?.map((item) => (
            <AccountCard
              accountName={item?.accountName as string}
              accountNumber={item?.accountNumber as string}
              contactNo={contactNo as string}
              interestRate={item?.interestRate as string}
              memberName={memberName as string}
              productName={item?.productName as string}
              productType={item?.accountType as string}
              totalBalance={item?.totalBalance}
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
          {isClosedAccounts ? (
            <ClosedAccountTable data={accountList} />
          ) : (
            <AccountTable data={accountList} />
          )}
        </DetailsCard>
      )}
    </>
  );
};
