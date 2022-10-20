import { Table } from '@coop/shared/table';

interface ILoanPaymentScheduleTableProps {
  data:
    | ({
        sn: number;
        date?: string | null | undefined;
        accountName?: string | null | undefined;
        paymentType?: string | null | undefined;
        amount?: string | null | undefined;
      } | null)[]
    | null
    | undefined;
  //   data: MemberPaymentView[] | null | undefined;
}

export const UpcomingPaymentTable = ({ data }: ILoanPaymentScheduleTableProps) => (
  <Table
    size="report"
    isStatic
    data={data ?? []}
    columns={[
      {
        header: 'S.N.',
        accessorKey: 'sn',
      },
      {
        header: 'Date',
        accessorKey: 'date',
      },
      {
        header: 'Account Name',
        accessorKey: 'accountName',
        meta: {
          width: '50%',
        },
      },
      {
        header: 'Payment Type',
        accessorKey: 'paymentType',
        meta: {
          width: '30%',
        },
      },
      {
        header: 'Amount',
        accessorKey: 'amount',
        meta: {
          isNumeric: true,
        },
      },
    ]}
  />
);
