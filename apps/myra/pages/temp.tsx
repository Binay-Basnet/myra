import { Table } from '@coop/shared/table';
import { Box } from '@coop/shared/ui';

const data = [
  {
    member_id: '131221',
    name: 'Test User',
    age: 12,
    src: 'https://images.unsplash.com/photo-1614204424926-196a80bf0be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    address:
      'Lalitpur, Nepal, Nepal Lalitpur, Nepal, Nepal Lalitpur, Nepal, NepalLalitpur, Nepal, NepalLalitpur, Nepal, NepalLalitpur, Nepal, Nepal ',
    contact_number: '+977-9830189301',
    date_joined: '2020-01-12',
  },
  {
    member_id: '22139',
    age: 43,
    name: 'John Test',
    address: 'Kathmandu, Nepal',
    contact_number: '+977-9833919301',
    date_joined: '2010-01-12',
  },
  {
    member_id: '224',
    age: 94,
    name: 'John Doe',
    address: 'Kathmandu, Nepal',
    contact_number: '+977-9833919301',
    date_joined: '2010-01-12',
  },
  {
    member_id: '2139',
    name: 'Anup Shrestha',
    age: 20,
    address: 'Kathmandu, Nepal',
    contact_number: '+977-9833919301',
    date_joined: '2010-01-12',
  },
  {
    member_id: '12',
    age: 18,
    name: 'Test User',
    address: 'Kathmandu, Nepal',
    contact_number: '+977-9833919301',
    date_joined: '2010-01-12',
  },
  {
    member_id: '24',
    name: 'Anup Shrestha',
    age: 20,
    address: 'Kathmandu, Nepal',
    contact_number: '+977-9833919301',
    date_joined: '2010-01-12',
  },
  {
    member_id: '2234',
    name: 'Anup Shrestha',
    age: 43,
    address: 'Kathmandu, Nepal',
    contact_number: '+977-9833919301',
    date_joined: '2010-01-12',
  },
];

const Temp = () => {
  return (
    <Box bg="white" p="s8" minH="100vh">
      <Box border="1px" borderColor="border.layout">
        <Table
          data={data}
          columns={[
            {
              accessorKey: 'member_id',
              header: 'Member Id',
              meta: {
                width: '50px',
              },
            },
            {
              accessorKey: 'name',
              header: 'Name',
              meta: {
                width: '80%',
              },
            },
            {
              accessorKey: 'age',
              header: 'Age',
            },
            {
              accessorKey: 'contact_number',
              header: 'Contact Number',
              meta: {
                isNumeric: true,
              },
            },
            {
              accessorKey: 'address',
              header: 'Address',
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default Temp;
