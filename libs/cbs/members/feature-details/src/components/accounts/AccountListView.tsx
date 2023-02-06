import { DetailsCard } from '@myra-ui';

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

export const AccountList = ({
  title,
  accountList,
  isClosedAccounts = false,
}: IAccountListProps) => (
  // const router = useRouter();
  // const [showGrid, setShowGrid] = useState(true);

  // const handleClick = () => {
  //   setShowGrid(!showGrid);
  // };

  // const memberDetailsData = useGetMemberKymDetailsOverviewQuery({
  //   id: router.query['id'] as string,
  // });

  // // const memberIndividual =
  // //   memberDetailsData?.data?.members?.memberOverviewV2?.overview?.data?.basicInformation
  // //     ?.__typename === 'IndividualBasicMinInfo'
  // //     ? (memberDetailsData?.data?.members?.memberOverviewV2?.overview?.data
  // //         ?.basicInformation as IndividualBasicMinInfo)
  // //     : null;
  // // const memberBasicInstitution =
  // //   memberDetailsData?.data?.members?.memberOverviewV2?.overview?.data?.basicInformation
  // //     ?.__typename === 'InstitutionBasicMinInfo'
  // //     ? (memberDetailsData?.data?.members?.memberOverviewV2?.overview?.data
  // //         ?.basicInformation as InstitutionBasicMinInfo)
  // //     : null;

  // // const memberBasicCooperative =
  // //   memberDetailsData?.data?.members?.memberOverviewV2?.overview?.data?.basicInformation
  // //     ?.__typename === 'CooperativeBasicMinInfo'
  // //     ? (memberDetailsData?.data?.members?.memberOverviewV2?.overview?.data
  // //         ?.basicInformation as CooperativeBasicMinInfo)
  // //     : null;
  // // const memberBasicCooperativeUnion =
  // //   memberDetailsData?.data?.members?.memberOverviewV2?.overview?.data?.basicInformation
  // //     ?.__typename === 'CooperativeUnionBasicMinInfo'
  // //     ? (memberDetailsData?.data?.members?.memberOverviewV2?.overview?.data
  // //         ?.basicInformation as CooperativeUnionBasicMinInfo)
  // //     : null;

  // const memberBasicDetails =
  //   memberIndividual ??
  //   memberBasicInstitution ??
  //   memberBasicCooperative ??
  //   memberBasicCooperativeUnion;
  // const contactNo = memberIndividual ? memberIndividual?.contactNumber : '-';
  // const memberName = memberBasicDetails?.memberName;

  <>
    <DetailsCard
      hasTable
      bg="white"
      title={title}
      // leftBtn={
      //   <Button
      //     variant="ghost"
      //     onClick={handleClick}
      //     leftIcon={!showGrid ? <Icon as={IoLogoMicrosoft} /> : <Icon as={IoList} />}
      //   >
      //     {showGrid ? 'List' : 'Grid'}
      //   </Button>
      // }
    >
      {isClosedAccounts ? (
        <ClosedAccountTable data={accountList} />
      ) : (
        <AccountTable data={accountList} />
      )}
    </DetailsCard>
    {/* {showGrid && (
        <DetailsCard
          bg="white"
          title={title}
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
      )} */}
  </>
);
