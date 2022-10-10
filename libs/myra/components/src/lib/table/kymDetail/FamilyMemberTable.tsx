import { Table } from '@coop/shared/table';

// interface IData {
//   [key: string]: string | number;
//   id: number;
//   relationship: string;
//   fullName: string;
// }

const data = [
  {
    id: 1,
    relationship: 'Grandfather',
    fullName: 'Bal Bahadur Nepal',
  },
  {
    id: 2,
    relationship: 'Grandmother',
    fullName: 'Hari maya Nepal',
  },
  {
    id: 3,
    relationship: 'Father',
    fullName: 'Shyam Nepal',
  },
  {
    id: 4,
    relationship: 'mother',
    fullName: 'Parbati Nepal',
  },
];

export const FamilyMemberTable = () => (
  <Table
    isLoading={false}
    data={data}
    columns={[
      {
        header: 'SN',
        accessorFn: (row: any) => row?.id,
        // disableSortBy: false,
      },
      {
        header: 'Relationship',
        accessorFn: (row: any) => row?.relationship,
      },
      {
        header: 'Full Name',
        accessorFn: (row: any) => row?.fullName,
        meta: {
          width: '80%',
        },
      },
    ]}
    isStatic
    size="compact"
  />
);
