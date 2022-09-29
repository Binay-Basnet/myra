import { VscTriangleDown } from 'react-icons/vsc';
import dayjs from 'dayjs';

import { useGetAuditLogListQuery } from '@coop/cbs/data-access';
import { SettingsPageHeader } from '@coop/cbs/settings/ui-layout';
import { Box, Icon, SelectPopout, Text } from '@coop/shared/ui';

import { AUDIT_LOG_ICONS } from '../../constants/AUDIT_LOG_ICONS';

export const CBSSettingsAuditLog = () => {
  const { data } = useGetAuditLogListQuery({}, { staleTime: 0 });

  const humanizedAuditLog =
    data?.auditLog?.humanize?.__typename === 'AuditLogHumanizeResult' &&
    data?.auditLog?.humanize.data;

  return (
    <>
      <SettingsPageHeader heading="Audit Log" />
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

              <SelectPopout
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
                optionType="member"
                options={[
                  {
                    id: '235243644561',
                    url: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                    name: 'Akash Dangol',
                  },

                  {
                    id: '235243644562',
                    url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                    name: 'Akash Dangol 1',
                  },
                  {
                    id: '235243644563',
                    url: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                    name: 'Akash Dangol 2',
                  },

                  {
                    id: '235243644564',
                    url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                    name: 'Akash Dangol 3',
                  },
                  {
                    id: '235243644565',
                    url: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                    name: 'Akash Dangol 4',
                  },

                  {
                    id: '235243644566',
                    url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                    name: 'Akash Dangol 5',
                  },
                  {
                    id: '235243644567',
                    url: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                    name: 'Akash Dangol 6',
                  },

                  {
                    id: '235243644568',
                    url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                    name: 'Akash Dangol 7',
                  },
                ]}
              />
            </Box>

            <Box display="flex" alignItems="center" gap="s8">
              <Text fontSize="s3" color="gray.800">
                Filter by action:
              </Text>
              <SelectPopout
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
                options={[
                  { label: 'All Actions', value: '1' },
                  { label: 'Created', value: '2' },
                  { label: 'Updated', value: '3' },
                  { label: 'Deleted', value: '4' },
                  { label: 'File Upload', value: '5' },
                  { label: 'Task Created', value: '6' },
                  { label: 'Task Edit', value: '7' },
                  { label: 'Task Completed', value: '8' },
                  { label: 'File Attached', value: '9' },
                  { label: 'File Removed', value: '10' },
                ]}
              />

              {/* <Box display="flex" alignItems="center" gap="s4">
              <Text fontSize="r1" color="gray.800">
                All
              </Text>
              <Icon as={VscTriangleDown} />
            </Box> */}
            </Box>

            <Box display="flex" alignItems="center" gap="s8">
              <Text fontSize="s3" color="gray.800">
                Filter by Time:
              </Text>
              <Box display="flex" alignItems="center" gap="s4">
                <Text fontSize="r1" color="gray.800">
                  All
                </Text>
                <Icon as={VscTriangleDown} />
              </Box>
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
    </>
  );
};

export default CBSSettingsAuditLog;
