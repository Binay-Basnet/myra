import { useMemo } from 'react';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  const columns: Column<MemberData>[] = useMemo(
    () => [
      {
        Header: t['settingsCoaAccountCode'],
        accessor: 'id',
        maxWidth: 4,
      },
      {
        Header: t['settingsCoaAccountGroup'],
        accessor: 'firstName',
        width: '80%',
      },
      {
        Header: t['settingsCoaAccountType'],
        accessor: 'title',
        width: '40%',
      },

      {
        Header: t['settingsCoaAccountParentGroup'],
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
    [router.locale]
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
