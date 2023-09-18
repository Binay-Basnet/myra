import { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';

import { Box, Button } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import {
  CbsCodeManagement,
  CbsCodeType,
  useListCbsCertificatesCodesQuery,
  useListCbsTransfersCodesQuery,
  useListCbsWithdrawSlipCodesQuery,
} from '@coop/cbs/data-access';
import { SettingsCard } from '@coop/cbs/settings/ui-components';

import { EditCodeModal } from '../components';

export const CoreBankingSystemCodeManagement = () => {
  const [selectedCode, setSelectedCode] = useState<{ codeType: CbsCodeType; queryKey: string }>();

  const { onClose, isOpen, onToggle } = useDisclosure();

  const { data: cbsCertificatesCodesListQueryData } = useListCbsCertificatesCodesQuery();

  const { data: cbsTransfersCodesListQueryData } = useListCbsTransfersCodesQuery();

  const { data: cbsWithdrawSlipCodesListQueryData } = useListCbsWithdrawSlipCodesQuery();

  const getColumns = (queryKey: string): Column<CbsCodeManagement>[] => [
    {
      header: 'Name',
      accessorFn: (row) => row?.codeType?.replace(/_/gi, ' '),
    },
    {
      header: 'Prefix',
      accessorFn: (row) => row?.prefix ?? '-',
    },
    {
      header: 'No of Digit',
      accessorFn: (row) => row?.noOfDigit ?? '-',
    },
    {
      header: 'Initial Number',
      accessorFn: (row) => row?.initialNo ?? '-',
    },
    {
      id: '_actions',
      header: '',
      cell: (props) =>
        props?.row?.original?.prefix ||
        props?.row?.original?.noOfDigit ||
        props?.row?.original?.initialNo ? null : (
          <Button
            variant="ghost"
            onClick={() => {
              setSelectedCode({
                codeType: props?.row?.original?.codeType as CbsCodeType,
                queryKey,
              });
              onToggle();
            }}
          >
            Setup
          </Button>
        ),
    },
  ];

  return (
    <>
      <Box display="flex" flexDirection="column" gap="s16">
        <SettingsCard title="Certificates" subtitle="Change how certificates code are generated">
          <Table
            isStatic
            data={
              cbsCertificatesCodesListQueryData?.settings?.general?.codes?.cbs?.allCbsCodes?.data
                ?.certificates ?? []
            }
            columns={getColumns('listCBSCertificatesCodes') as Column<CbsCodeManagement | null>[]}
          />
        </SettingsCard>

        <SettingsCard title="Transfers" subtitle="Change how transfers code are generated">
          <Table
            isStatic
            data={
              cbsTransfersCodesListQueryData?.settings?.general?.codes?.cbs?.allCbsCodes?.data
                ?.transfers ?? []
            }
            columns={getColumns('listCBSTransfersCodes') as Column<CbsCodeManagement | null>[]}
          />
        </SettingsCard>

        <SettingsCard title="Withdraw Slip" subtitle="Change how withdraw slip code are generated">
          <Table
            isStatic
            data={
              cbsWithdrawSlipCodesListQueryData?.settings?.general?.codes?.cbs?.allCbsCodes?.data
                ?.withdrawSlip ?? []
            }
            columns={getColumns('listCBSWithdrawSlipCodes') as Column<CbsCodeManagement | null>[]}
          />
        </SettingsCard>
      </Box>

      <EditCodeModal
        open={isOpen}
        onClose={onClose}
        codeType={selectedCode?.codeType}
        queryKey={selectedCode?.queryKey as string}
      />
    </>
  );
};

export default CoreBankingSystemCodeManagement;
