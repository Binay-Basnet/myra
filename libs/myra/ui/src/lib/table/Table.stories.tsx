import { Meta, Story } from '@storybook/react';
import { Column, Table } from './Table';
import { TableProps } from './react-table-config';
import { Avatar, Flex } from '@chakra-ui/react';

export default {
  component: Table,
  title: 'Table',
} as Meta;

type TableDummyDataType = {
  member_id: number;
  name: string;
  src?: string;
  address: string;
  contact_number: string;
  date_joined: string;
};

const columns = [
  {
    Header: 'Member #',
    accessor: 'member_id',
    width: 0,
  },
  {
    Header: 'First Name',
    accessor: 'name',
    width: '50%',
    imgSrc: 'src',
    paddingX: 8,

    Cell: ({ cell }) => {
      return (
        <Flex alignItems="center" gap={3}>
          <Avatar src={cell.row.original?.src} name={cell.value} size="sm" />
          <span>{cell.value} </span>
        </Flex>
      );
    },
  },
  {
    Header: 'Address',
    accessor: 'address',
    maxWidth: 24,
  },
  {
    Header: 'Contact Number',
    accessor: 'contact_number',
    isNumeric: true,
  },
  {
    Header: 'Date Joined',
    accessor: 'date_joined',
    isNumeric: true,
  },
] as Column<TableDummyDataType>[];

const data = [
  {
    member_id: 131221,
    name: 'Test User',
    src: 'https://images.unsplash.com/photo-1614204424926-196a80bf0be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    address:
      'Lalitpur, Nepal, NepalLalitpur, Nepal, NepalLalitpur, Nepal, NepalLalitpur, Nepal, NepalLalitpur, Nepal, NepalLalitpur, Nepal, Nepal ',
    contact_number: '+977-9830189301',
    date_joined: '2020-01-12',
  },
  {
    member_id: 22139,
    name: 'John Doe',
    address: 'Kathmandu, Nepal',
    contact_number: '+977-9833919301',
    date_joined: '2010-01-12',
  },
];

const Template: Story<TableProps<TableDummyDataType>> = (args) => (
  <Table<TableDummyDataType> {...args} />
);

export const Default = Template.bind({});
Default.args = {
  columns,
  data,
};

export const Compact = Template.bind({});
Compact.args = {
  columns,
  data,
  size: 'compact',
};
