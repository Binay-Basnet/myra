import React, { useState } from 'react';
import { IoQrCode } from 'react-icons/io5';
import { useDisclosure } from '@chakra-ui/react';

import { AccountQRModal, IconButton } from '@myra-ui';
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
  memberName: string;
  contactNo?: string;
}

export const LoanTable = ({ data, memberName, contactNo }: ILoanPaymentScheduleTableProps) => {
  const { onClose: modalOnClose, isOpen, onToggle } = useDisclosure();
  const [qrData, setQrData] = useState({
    name: memberName ?? 'N/A',
    accountNo: 'N/A',
    phoneNo: contactNo ?? 'N/A',
    accountName: 'N/A',
  });

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
      {
        header: 'QR',
        accessorKey: 'interestRate',
        cell: (props) => (
          <IconButton
            aria-label="qr-button"
            cursor="pointer"
            as={IoQrCode}
            size="xs"
            colorScheme="gray"
            onClick={() => {
              onToggle();
              setQrData({
                name: memberName ?? 'N/A',
                accountNo: props?.row?.original?.accountNumber ?? 'N/A',
                phoneNo: contactNo ?? 'N/A',
                accountName: props?.row?.original?.accountName ?? 'N/A',
              });
            }}
          />
        ),
      },
    ],
    [memberName, contactNo]
  );

  return (
    <>
      <Table<typeof data[0]> isDetailPageTable isStatic data={data ?? []} columns={columns} />
      <AccountQRModal
        account={{
          name: qrData?.name,
          accountNo: qrData?.accountNo,
          phoneNo: qrData?.phoneNo ?? 'N/A',
          accountName: qrData?.accountName,
        }}
        open={isOpen}
        onClose={modalOnClose}
      />
    </>
  );
};
