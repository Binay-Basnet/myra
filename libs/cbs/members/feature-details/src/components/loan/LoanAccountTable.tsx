import React from 'react';

import { Column, Table } from '@myra-ui/table';

import { RedirectButton, ROUTES } from '@coop/cbs/utils';

interface ILoanPaymentScheduleTableProps {
  data:
    | {
        sn: number;
        id: string | null | undefined;
        accountType: string | null | undefined;
        accountName: string | null | undefined;
        totalBalance: string | 0;
        interestRate: string | null | undefined;
        accountNumber: string | null | undefined;
      }[];
  // memberName?: string;
  // accountNumber?: string;
  // contactNo?: string;
  accountName?: string;
  //   data: MemberPaymentView[] | null | undefined;
}

export const LoanTable = ({
  data,
}: // memberName,
// accountNumber,
// contactNo,
// accountName,
ILoanPaymentScheduleTableProps) => {
  // const { onClose: modalOnClose, isOpen, onToggle } = useDisclosure();
  // const [qrData, setQrData] = useState();
  // console.log({ qrData });
  const columns = React.useMemo<Column<typeof data[0]>[]>(
    () => [
      {
        header: 'S.N.',
        accessorKey: 'sn',
      },
      {
        header: 'Account Type',
        accessorKey: 'accountType',
      },
      {
        header: 'Account Name',
        accessorKey: 'accountName',
        cell: (props) => (
          <RedirectButton
            label={props?.row?.original?.accountName as string}
            link={`${ROUTES.CBS_LOAN_ACCOUNT_DETAILS}?id=${props?.row?.original?.id}`}
          />
        ),
      },
      {
        header: 'Balance',
        accessorKey: 'totalBalance',
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Interest',
        accessorKey: 'interestRate',
        meta: {
          isNumeric: true,
        },
      },
      // {
      //   header: 'QR',
      //   accessorKey: 'interestRate',
      //   cell: (props) => (
      //     <IconButton
      //       aria-label="qr-button"
      //       cursor="pointer"
      //       as={IoQrCode}
      //       size="xs"
      //       colorScheme="gray"
      //       onClick={() => {
      //         onToggle();
      //         setQrData({ name: props?.row?.original?.accountName });
      //       }}
      //     />
      //   ),
      // },
    ],
    []
  );

  return (
    <>
      {/* <AccountQRModal
        account={{
          name: memberName,
          accountNo: accountNumber,
          phoneNo: contactNo ?? 'N/A',
          accountName,
        }}
        open={isOpen}
        onClose={modalOnClose}
      /> */}
      <Table<typeof data[0]> isDetailPageTable isStatic data={data ?? []} columns={columns} />
    </>
  );
};
