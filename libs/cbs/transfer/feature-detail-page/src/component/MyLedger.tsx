// import { amountConverter } from "@coop/shared/utils";
// import { DetailsCard, Table } from "@myra-ui";
// import { useMemo } from "react";

// export const MyLedger = () => {

//   const columns = useMemo<Column<typeof rowData[0]>[]>(
//     () => [
//       {
//         header: 'Service Center',
//         accessorFn: (row) => row?.serviceCenter,
//       },
//       {
//         header: 'Account',
//         footer: totalDebit,
//         accessorFn: (row) => amountConverter(row?.debit ?? 0),
//         meta: {
//           isNumeric: true,
//         },
//       },
//       {
//         header: 'Ledger',
//         accessorFn: (row) => amountConverter(row?.credit ?? 0),
//         meta: {
//           isNumeric: true,
//         },
//       },
//       {
//         header: 'Debit',
//         accessorFn: (row) => amountConverter(row?.debit ?? 0),
//         meta: {
//           isNumeric: true,
//         },
//       },
//       {
//         header: 'Credit',
//         accessorFn: (row) => amountConverter(row?.credit ?? 0),
//         meta: {
//           isNumeric: true,
//         },
//       },
//     ],
//     [totalDebit, totalCredit]
//   );

//   if (data?.length === 0) return null;
//    return (
//      <DetailsCard
//        title={t['transDetailGLTransactions']}
//        hasTable
//      >
//        <Table
//          isDetailPageTable
//          showFooter
//          isStatic
//          isLoading={false}
//          data={rowData ?? []}
//          columns={columns}
//        />
//      </DetailsCard>
//    );
// }
