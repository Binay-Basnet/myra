import { useState } from 'react';
import { AiOutlineDelete, AiOutlineSetting } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { IoAdd } from 'react-icons/io5';
import Link from 'next/link';
import { useDisclosure } from '@chakra-ui/react';

import { ActionMenu } from '@myra-ui/components';
import { Box } from '@myra-ui/foundations';
import { Column, ExpandedCell, ExpandedHeader, Table } from '@myra-ui/table';

import { CoaView } from '@coop/cbs/data-access';
import { localizedText, ROUTES } from '@coop/cbs/utils';

import { AddAccountModal, AddGroupModal, ConfigureGroupModal } from '../modals';
import { arrayToTreeCOA } from '../../utils/arrayToTree';

interface ICoaTreeTableProps {
  type: string;
  data: CoaView[];
}

type CoaTree = CoaView & {
  children: CoaTree[];
};

export const CoaTreeTable = ({ data, type }: ICoaTreeTableProps) => {
  const groupModalProps = useDisclosure();
  const configureModalProps = useDisclosure();
  const addAccountModalProps = useDisclosure();

  const tree = arrayToTreeCOA(sortCoa(data), '');
  const [clickedAccount, setClickedAccount] = useState<CoaTree | null>(null);

  const columns: Column<CoaTree>[] = [
    {
      header: ({ table }) => <ExpandedHeader table={table} value={type} />,
      accessorKey: 'accountType',
      cell: (props) => (
        <ExpandedCell
          row={props.row}
          value={
            !props.row?.getCanExpand() ? (
              <Link
                target="_blank"
                href={`${ROUTES.SETTINGS_GENERAL_COA_DETAILS}?id=${props.row?.original?.id}`}
              >
                <Box
                  color={props.row?.original?.category === 'USER_DEFINED' ? 'info.500' : 'inherit'}
                  _hover={{ textDecoration: 'underline' }}
                >
                  {props.row.original.accountCode} - {localizedText(props.row.original.name)}
                </Box>
              </Link>
            ) : (
              <Box
                color={props.row?.original?.category === 'USER_DEFINED' ? 'info.500' : 'inherit'}
              >
                {props.row.original.accountCode} - {localizedText(props.row.original.name)}
              </Box>
            )
          }
        />
      ),
      meta: {
        width: '80%',
      },
    },
    {
      header: 'Allowed Transactions',
      accessorKey: 'transactionAllowed',
      cell: (props) => (
        <Box textTransform="capitalize">{props.row.original.transactionAllowed?.toLowerCase()}</Box>
      ),
    },

    {
      header: 'Allowed Balance',
      accessorKey: 'allowedBalance',
      cell: (props) => (
        <Box textTransform="capitalize">{props.row.original.allowedBalance?.toLowerCase()}</Box>
      ),
    },
    {
      header: () => (
        <Box whiteSpace="initial" py="s8">
          Allow Multiple Ledger Per Service Center
        </Box>
      ),
      accessorKey: 'allowMultipleLedger',
      cell: (props) => (props.getValue() ? 'Yes' : 'No'),
      meta: {
        width: '200px',
      },
    },
    {
      header: () => (
        <Box whiteSpace="initial" py="s8">
          Allow posting through Journal Voucher
        </Box>
      ),
      accessorKey: 'allowDirectPostingFromJV',
      cell: (props) => (props.getValue() ? 'Yes' : 'No'),

      meta: {
        width: '200px',
      },
    },
    {
      header: '',
      accessorKey: 'actions',
      cell: ({ row }) => (
        <ActionMenu
          menuTrigger={<BsThreeDots />}
          options={[
            {
              label: 'Add Group',
              icon: IoAdd,
              onClick: (node) => {
                groupModalProps.onToggle();
                setClickedAccount(node);
              },
            },
            {
              label: 'Create Ledger',
              icon: IoAdd,
              onClick: (node) => {
                addAccountModalProps.onToggle();
                setClickedAccount(node);
              },
            },
            {
              label: 'Configure Group',
              icon: AiOutlineSetting,
              onClick: (node) => {
                configureModalProps.onToggle();
                setClickedAccount(node);
              },
            },
            {
              label: 'Delete Account',
              icon: AiOutlineDelete,
              variant: 'danger',
              isShown: row?.original?.category === 'USER_DEFINED',
              onClick: (node) => {
                configureModalProps.onToggle();
                setClickedAccount(node);
              },
            },
          ]}
          node={row.original}
        />
      ),

      meta: {
        width: '60px',
      },
    },
  ];

  return (
    <>
      <Table
        getSubRows={(row) => row.children}
        variant="report"
        size="report"
        isStatic
        data={tree as CoaTree[]}
        columns={columns}
      />

      <AddGroupModal modalProps={groupModalProps} clickedAccount={clickedAccount} />
      <ConfigureGroupModal modalProps={configureModalProps} clickedAccount={clickedAccount} />
      <AddAccountModal modalProps={addAccountModalProps} clickedAccount={clickedAccount} />
    </>
  );
};

export const sortCoa = (data: CoaView[]) =>
  data?.sort((a, b) =>
    Number(
      a?.accountCode?.localeCompare(b?.accountCode as string, undefined, {
        numeric: true,
        sensitivity: 'base',
      })
    )
  );
