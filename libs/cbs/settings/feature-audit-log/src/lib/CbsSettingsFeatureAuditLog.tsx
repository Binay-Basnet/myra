import { FormProvider, useForm } from 'react-hook-form';
import { VscTriangleDown } from 'react-icons/vsc';
import dayjs from 'dayjs';

import { Box, Icon, Text } from '@myra-ui';

import {
  AuditLogActions,
  LocalizedDateFilter,
  useGetAuditLogListQuery,
  useGetSettingsUserListDataQuery,
} from '@coop/cbs/data-access';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { SettingsPageHeader } from '@coop/cbs/settings/ui-layout';
import { FormSelectPopout } from '@coop/shared/form';
import { featureCode, getRouterQuery } from '@coop/shared/utils';

import { AUDIT_LOG_ICONS } from '../../constants/AUDIT_LOG_ICONS';

export const CBSSettingsAuditLog = () => {
  const methods = useForm<{
    memberId: { id: string }[];
    actions: { value: AuditLogActions }[];
    period: LocalizedDateFilter;
  }>();
  const { watch } = methods;
  const memberId = watch('memberId');
  const actions = watch('actions');
  const time = watch('period');

  const arrayId = memberId && memberId?.map((item) => item?.id);
  const actionEnums = actions && actions?.map((item) => item?.value);

  const { data } = useGetAuditLogListQuery(
    {
      filter: {
        users: arrayId,
        action: actionEnums,
        time,
      },
    },
    { staleTime: 0 }
  );

  const humanizedAuditLog =
    data?.auditLog?.humanize?.__typename === 'AuditLogHumanizeResult' &&
    data?.auditLog?.humanize.data;

  const { data: userListQueryData } = useGetSettingsUserListDataQuery(
    {
      paginate: getRouterQuery({ type: ['PAGINATION'] }),
    },
    { staleTime: 0 }
  );

  const userListArray = userListQueryData?.settings?.myraUser?.list?.edges;

  const userList =
    (userListArray &&
      userListArray?.map((item) => ({
        id: item?.node?.id as string,
        url: item?.node?.profilePicUrl as string,
        name: item?.node?.name as string,
      }))) ??
    [];

  const actionList = [
    {
      label: 'All',
      value: AuditLogActions.All,
    },
    {
      label: 'Create',
      value: AuditLogActions.Create,
    },
    {
      label: 'Update',
      value: AuditLogActions.Update,
    },
    {
      label: 'Read',
      value: AuditLogActions.Read,
    },
    {
      label: 'Delete',
      value: AuditLogActions.Delete,
    },
  ];

  return (
    <FormProvider {...methods}>
      <SettingsPageHeader heading={`Audit Log - ${featureCode.auditLogList}`} />
      <Box p="s16">
        <Box display="flex" flexDir="column" gap="s16">
          <Text fontSize="s2" color="gray.600">
            An audit trail is a security-relevant chronological record, set of records, and/or
            destination and source of records that provide documentary evidence of the sequence of
            activities that have affected at any time a specific operation, procedure, event, or
            device.
          </Text>
          <Box display="flex" alignItems="center" gap="s32">
            <Box display="flex" alignItems="center" gap="s8">
              <Text fontSize="s3" color="gray.800">
                Filter by user:
              </Text>

              <FormSelectPopout
                popoverBtn={(value) => (
                  <Box display="flex" alignItems="center" gap="s4" cursor="pointer">
                    <Text fontSize="r1" color="gray.800">
                      {value && Array.isArray(value)
                        ? `${value?.length} selected`
                        : 'None Selected'}
                    </Text>

                    <Icon as={VscTriangleDown} />
                  </Box>
                )}
                name="memberId"
                optionType="member"
                options={userList}
              />
            </Box>

            <Box display="flex" alignItems="center" gap="s8">
              <Text fontSize="s3" color="gray.800">
                Filter by action:
              </Text>
              <FormSelectPopout
                popoverBtn={(value) => (
                  <Box display="flex" alignItems="center" gap="s4" cursor="pointer">
                    <Text fontSize="r1" color="gray.800">
                      {value && Array.isArray(value)
                        ? `${value?.length} selected`
                        : 'None Selected'}
                    </Text>

                    <Icon as={VscTriangleDown} />
                  </Box>
                )}
                name="actions"
                options={actionList}
              />
            </Box>

            <Box>
              <ReportDateRange label=" Filter by Time:" />
            </Box>
          </Box>
          <Box display="flex" flexDir="column" gap="s8">
            <Text fontSize="s2" color="gray.600">
              All
            </Text>
            <Box display="flex" flexDir="column" gap="s16">
              {humanizedAuditLog &&
                humanizedAuditLog?.map((audit) => (
                  <Box
                    p="s8"
                    display="flex"
                    borderRadius="br2"
                    border="1px"
                    borderColor="border.layout"
                    justifyContent="space-between"
                  >
                    <Box display="flex" gap="s16">
                      <Icon as={AUDIT_LOG_ICONS['ADD']} size="xl" />
                      <Text color="gray.700" fontSize="r1" fontWeight="500">
                        {audit?.narration}
                      </Text>
                    </Box>
                    <Text fontSize="s3" color="gray.500">
                      {dayjs(audit?.timestamp).format('DD MMM YYYY [at] hh:mm A')}
                    </Text>
                  </Box>
                ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </FormProvider>
  );
};

export default CBSSettingsAuditLog;
