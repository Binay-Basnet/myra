import React, { useState } from 'react';
import { FiZap } from 'react-icons/fi';
import { IoQrCode } from 'react-icons/io5';
import { useDisclosure } from '@chakra-ui/react';

import {
  AccountQRModal,
  AssociatedGuaranteeAccounts,
  Box,
  GuaranteeAccountsHoverCard,
  Icon,
  IconButton,
  Text,
  Tooltip,
} from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { NatureOfDepositProduct } from '@coop/cbs/data-access';
import { RedirectButton, ROUTES } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

interface ILoanPaymentScheduleTableProps {
  data:
    | {
        sn: number;
        accountType: string | null | undefined;
        accountName: string | null | undefined;
        totalBalance?: string | number | null | undefined;
        interestRate: string | number | null | undefined;
        accountNumber?: string | null | undefined;
        guaranteeAccounts?:
          | ({
              loanId?: string | null;
              loanAccountName?: string | null;
            } | null)[];
      }[];
  memberName: string;
  contactNo?: string;
}

const accountTypes = {
  [NatureOfDepositProduct.Saving]: 'Saving Account',
  [NatureOfDepositProduct.RecurringSaving]: 'Recurring Saving Account',
  [NatureOfDepositProduct.TermSavingOrFd]: 'Term Saving Account',
  [NatureOfDepositProduct.Current]: 'Current Account',
};

export const AccountTable = ({ data, memberName, contactNo }: ILoanPaymentScheduleTableProps) => {
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
        accessorFn: (row) => accountTypes[row?.accountType as NatureOfDepositProduct],
      },
      {
        header: 'Account Name',
        accessorKey: 'accountName',
        cell: (props) => (
          <Box display="flex" alignItems="center" gap="s4">
            <RedirectButton
              label={<Tooltip title={props?.row?.original?.accountName as string} />}
              link={`${ROUTES.CBS_ACCOUNT_SAVING_DETAILS}?id=${props?.row?.original?.accountNumber}`}
            />

            {props?.row?.original?.guaranteeAccounts?.length ? (
              <GuaranteeAccountsHoverCard
                trigger={<Icon as={FiZap} color="warning.500" />}
                associatedGuaranteeAccounts={
                  props?.row?.original?.guaranteeAccounts as AssociatedGuaranteeAccounts
                }
              />
            ) : null}
          </Box>
        ),
      },
      {
        header: 'Balance',
        accessorKey: 'totalBalance',
        meta: {
          isNumeric: true,
        },
        accessorFn: (row) => (row?.totalBalance ? amountConverter(row?.totalBalance ?? 0) : null),
      },
      {
        header: 'Interest',
        accessorKey: 'interestRate',
        cell: (props) => (
          <Box>
            {props.getValue() !== '-' && (
              <Text
                fontSize="s3"
                textTransform="capitalize"
                textOverflow="ellipsis"
                overflow="hidden"
              >
                {props.getValue() as string} %
              </Text>
            )}
            {props.getValue() === '-' && (
              <Text
                fontSize="s3"
                textTransform="capitalize"
                textOverflow="ellipsis"
                overflow="hidden"
              >
                {props.getValue() as string}
              </Text>
            )}
          </Box>
        ),
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
      <Table<typeof data[0]> isStatic data={data ?? []} columns={columns} />{' '}
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
