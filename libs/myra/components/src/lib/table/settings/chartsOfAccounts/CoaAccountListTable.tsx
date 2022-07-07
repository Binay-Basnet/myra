import { useMemo } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IconButton } from '@chakra-ui/react';

import { Column, Table } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

type MemberData = {
  id: string;
  firstName: string;
  middleName?: string | null;
  lastName?: string;
  gender: string;
  title?: string | null;
  dateOfBirth?: string | null;
};

export const CoaAccountListTable = () => {
  const { t } = useTranslation();
  const columns: Column<MemberData>[] = useMemo(
    () => [
      {
        Header: t['settingsCoaTableAccountCode'],
        accessor: 'id',
        maxWidth: 4,
      },
      {
        Header: t['settingsCoaTableAccountName'],
        accessor: 'firstName',
        width: '80%',
      },
      {
        Header: t['settingsCoaTableAccountClass'],
        accessor: 'title',
        width: '40%',
      },

      {
        Header: t['settingsCoaTableAccountParentGroup'],
        accessor: 'gender',
        width: '40%',
      },

      {
        accessor: 'actions',
        Cell: () => (
          <IconButton
            variant="ghost"
            aria-label="Search database"
            icon={<BsThreeDots />}
          />
        ),
      },
    ],
    [t]
  );

  return (
    <Table
      data={[
        {
          id: '0012',
          firstName: '123',
          title: 'Account Test',
          gender: 'Account Group',
        },
      ]}
      columns={columns}
      sort={true}
    />
  );
};
