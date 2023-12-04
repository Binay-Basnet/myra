import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { IoCheckmarkDoneOutline, IoSettingsOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';

import {
  asyncToast,
  Box,
  Checkbox,
  DetailCardContent,
  Divider,
  Grid,
  Icon,
  Modal,
  SwitchTabs,
  Text,
} from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import {
  AlternativeChannelServiceType,
  AlternativeChannelStatus,
  useAccountServiceActivationMutation,
  useGetAlternativeChannelListQuery,
  useGetUserDetailsQuery,
} from '@coop/cbs/data-access';
import { getPaginationQuery, useTranslation } from '@coop/shared/utils';

interface ACTableProps {
  serviceType: AlternativeChannelServiceType;
}

interface AccountCardType {
  accountName?: string;
  accountId?: string;
  productName?: string;
  accountNature?: string;
  status?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const AccountCard = (props: AccountCardType) => {
  const { accountName, accountId, productName, accountNature, status, onChange } = props;
  return (
    <Box
      m="s4"
      mt="s16"
      p="s12"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      border="1px"
      borderColor="border.layout"
      borderRadius={5}
    >
      <Box>
        <Text fontSize="r1">{accountName}</Text>
        <Text fontSize="s3">{accountId}</Text>
        <Text fontSize="s3">
          {productName}[{accountNature}]
        </Text>
      </Box>
      <Box display="flex" alignItems="center" gap="s8">
        <Checkbox defaultChecked={status} onChange={onChange} />
        <Text fontSize="r1">Enable Transaction</Text>
      </Box>
    </Box>
  );
};

export const ACTable = ({ serviceType }: ACTableProps) => {
  const { t } = useTranslation();
  const { isOpen, onClose, onToggle } = useDisclosure();
  const [isUpdateAccountState, setIsUpdateAccountState] = useState(false);
  const [isServiceActive, setIsServiceActive] = useState('ACTIVE' || 'INACTIVE');
  const [isAutoRenew, setIsAutoRenew] = useState<'true' | 'false'>('false');

  const [accounts, setAccounts] = useState([]);

  const router = useRouter();

  const { mutateAsync } = useAccountServiceActivationMutation();

  const { data, isLoading } = useGetAlternativeChannelListQuery({
    filter: {
      serviceType,
    },
    paginate: getPaginationQuery(),
  });

  const alternativeList = data?.alternativeChannel?.list?.edges ?? [];

  const {
    data: userDetails,
    isFetching,
    refetch,
  } = useGetUserDetailsQuery({
    input: { id: router?.query?.['id'] as string, serviceType },
  });

  const userData = userDetails?.alternativeChannel?.userDetails?.data;
  const accountsList = userDetails?.alternativeChannel?.userDetails?.data?.accounts || [];

  useEffect(() => {
    setIsServiceActive(userData?.serviceStatus);
    setIsAutoRenew(userData?.autoRenew ? 'true' : 'false');
    setAccounts(accountsList);
  }, [JSON.stringify(userData), JSON.stringify(accountsList)]);

  // let accounts = [...accountsList];

  const accountListRowData = useMemo(
    () => accounts?.filter((item) => item?.status) ?? [],
    [JSON.stringify(accounts)]
  );

  const accountListColumns = useMemo<Column<typeof accountListRowData[0]>[]>(
    () => [
      {
        header: 'SN',
        accessorFn: (row, index) => index + 1,
        meta: {
          width: '5%',
        },
      },
      {
        header: 'Account',
        accessorFn: (row) => row?.accountName,
      },
      {
        header: 'Status',
        cell: () => (
          <Box display="flex" gap="s4" alignItems="center">
            <Icon as={IoCheckmarkDoneOutline} /> <Text>Transaction Enabled</Text>
          </Box>
        ),
      },
    ],
    []
  );

  const columns = useMemo<Column<typeof alternativeList[0]>[]>(
    () => [
      {
        accessorFn: (row) => row?.data?.name?.local,
        header: t['acName'],
        meta: {
          width: '80%',
        },
      },

      {
        header: t['acStatus'],
        accessorFn: (row) => row?.data?.serviceStatus,
        cell: ({ getValue }) => (
          <Box display="flex" alignItems="center" gap="s8">
            {getValue() === AlternativeChannelStatus.Active ? (
              <Box w="8px" h="8px" bg="primary.500" borderRadius="100%" />
            ) : (
              <Box w="8px" h="8px" bg="danger.500" borderRadius="100%" />
            )}
            <Box>
              {getValue() === AlternativeChannelStatus.Active ? t['acActive'] : t['acInactive']}
            </Box>
          </Box>
        ),
      },
      {
        id: 'phoneNumber',
        header: t['acPhoneNumber'],

        accessorFn: (row) => row?.data?.phoneNumber,
        meta: {
          width: '150px',
        },
      },
      {
        id: 'status',
        header: t['acCoopConnection'],
        meta: {
          width: '200px',
        },
        accessorFn: (row) => row?.data?.coopConnection,
        cell: ({ getValue }) => (getValue() ? t['yes'] : t['no']),
      },
    ],
    [t]
  );

  const updateUser = async () => {
    await asyncToast({
      id: 'update-user',
      promise: mutateAsync({
        input: {
          service: serviceType,
          serviceStatus: isServiceActive as AlternativeChannelStatus,
          autoRenew: isAutoRenew === 'true',
          accountList: accounts?.filter((item) => item?.status)?.map((item) => item?.accountId),
          id: router?.query?.['id'] as string,
        },
      }),
      msgs: {
        loading: 'Updating user',
        success: 'User Updated',
      },
      onSuccess: () => {
        onClose();
        setIsUpdateAccountState(false);
        refetch();
      },
    });
  };

  const updateStatus = (accountId: string, newStatus: boolean) => {
    const newArray = accounts.map((item) => {
      if (item.accountId === accountId) {
        return { ...item, status: newStatus };
      }
      return item;
    });
    return newArray;
  };

  return (
    <Box>
      <Table
        isLoading={isLoading}
        columns={columns}
        rowOnClick={(row) => {
          router.push(
            {
              query: {
                id: row?.data?.id,
              },
            },
            undefined,
            { shallow: true }
          );
          onToggle();
        }}
        data={alternativeList}
        pagination={{
          total: data?.alternativeChannel?.list?.totalCount ?? 'Many',
          pageInfo: data?.alternativeChannel?.list?.pageInfo,
        }}
      />

      <Modal
        width="2xl"
        primaryButtonLabel={isUpdateAccountState ? '' : t['saveChanges']}
        secondaryButtonLabel={isUpdateAccountState ? '' : t['discardChanges']}
        primaryButtonHandler={updateUser}
        secondaryButtonHandler={onClose}
        isSecondaryDanger
        onClose={onClose}
        title={
          isUpdateAccountState ? (
            <Box display="flex" gap="s4" alignItems="center">
              <Icon
                as={IoMdArrowBack}
                cursor="pointer"
                onClick={() => setIsUpdateAccountState(false)}
              />
              Update Account
            </Box>
          ) : (
            'Update User'
          )
        }
        open={isOpen}
      >
        {isUpdateAccountState ? (
          accounts?.map((item) => (
            <AccountCard
              accountName={item?.accountName}
              accountId={item?.accountId}
              productName={item?.productName}
              accountNature={item?.accountNature}
              status={item?.status}
              onChange={(e) => {
                const newArray = updateStatus(item?.accountId, e.target.checked);
                setAccounts(newArray);
              }}
            />
          ))
        ) : (
          <>
            <Grid templateColumns="repeat(2, 1fr)" gap="s32">
              <DetailCardContent title={t['acName']} subtitle={userData?.memberName} />
              <DetailCardContent title={t['acPhoneNumber']} subtitle={userData?.phoneNumber} />
              <DetailCardContent
                title={t['acCoopConnection']}
                subtitle={userData?.coopConnection ? t['yes'] : t['no']}
              />
              <DetailCardContent title={t['acLastActive']} subtitle={userData?.lastActive} />
            </Grid>
            <Divider my="s16" />
            {!(serviceType === 'SMS_BANKING') && (
              <Box display="flex" flexDir="column" gap="s8">
                <Box display="flex">
                  <Box>
                    <Text fontSize="r1" fontWeight="medium">
                      Accounts
                    </Text>
                    <Text fontSize="s3">
                      Enabled Transactions are listed below, by default all accounts persists Read
                      Only property. Press “Edit” to update accounts.
                    </Text>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    gap="s8"
                    color="primary.500"
                    cursor="pointer"
                    onClick={() => setIsUpdateAccountState(true)}
                  >
                    <Icon as={IoSettingsOutline} size="sm" />
                    <Text fontSize="s3" fontWeight="medium">
                      Edit
                    </Text>
                  </Box>
                </Box>
                <Table
                  data={accountListRowData}
                  columns={accountListColumns}
                  variant="report"
                  size="report"
                  isStatic
                  isLoading={isFetching}
                />
              </Box>
            )}

            <Divider my="s16" />
            <SwitchTabs
              value={
                userDetails?.alternativeChannel?.userDetails?.data
                  ?.serviceStatus as unknown as string
              }
              options={[
                { label: 'Active', value: AlternativeChannelStatus?.Active },
                { label: 'Inactive', value: AlternativeChannelStatus?.Inactive },
              ]}
              label={t['acServiceStatus']}
              onChange={(e) => setIsServiceActive(e as AlternativeChannelStatus)}
            />
            <Box mt="s16">
              <SwitchTabs
                value={
                  userDetails?.alternativeChannel?.userDetails?.data?.autoRenew ? 'true' : 'false'
                }
                options={[
                  { label: 'Yes', value: true },
                  { label: 'No', value: false },
                ]}
                label="Auto Renew"
                onChange={(e) => setIsAutoRenew(e as 'true' | 'false')}
              />
            </Box>
          </>
        )}
      </Modal>
    </Box>
  );
};
