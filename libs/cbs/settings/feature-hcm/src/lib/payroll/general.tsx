import { Box, Divider, Switch, Text } from '@myra-ui';

import {
  useGetPayrollGeneralQuery,
  useUpdatePayrollGeneralSettingsDisableRoundedTotalMutation,
  useUpdatePayrollGeneralSettingsEmailSalarySlipToEmployeeMutation,
  useUpdatePayrollGeneralSettingsIncludeHolidaysMutation,
} from '@coop/cbs/data-access';
import { SettingsCard } from '@coop/cbs/settings/ui-components';

export const GeneralSettings = () => {
  const { data, refetch } = useGetPayrollGeneralQuery();
  const includeHoliday =
    data?.settings?.general?.HCM?.payroll?.general?.getPayrollGeneral?.data
      ?.includeHolidaysInTotalNumberOfWorkingDays || false;

  const emailSalarySlipToEmployee =
    data?.settings?.general?.HCM?.payroll?.general?.getPayrollGeneral?.data
      ?.emailSalarySlipToEmployee || false;

  const disableRoundedTotal =
    data?.settings?.general?.HCM?.payroll?.general?.getPayrollGeneral?.data?.disableRoundedTotal ||
    false;

  const { mutateAsync: includeHolidayMutateAsync } =
    useUpdatePayrollGeneralSettingsIncludeHolidaysMutation();

  const { mutateAsync: emailSalarySlipToEmployeeMutateAsync } =
    useUpdatePayrollGeneralSettingsEmailSalarySlipToEmployeeMutation();

  const { mutateAsync: disableRoundedTotalMutateAsync } =
    useUpdatePayrollGeneralSettingsDisableRoundedTotalMutation();

  return (
    <Box p="s16" display="flex" flexDir="column" gap="s16">
      <SettingsCard title="General Settings" subtitle="It will be reoccurring for a whole year.">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb="s16">
          <Box>
            <Text fontSize="r1" fontWeight="semibold">
              Include Holidays in total no. of working days
            </Text>
            <Text fontSize="s3" color="gray.600" lineHeight="none">
              If checked, total no of working day will include holidays. e.g. 30 days
            </Text>
          </Box>
          <Switch
            isChecked={includeHoliday}
            onChange={(e) =>
              includeHolidayMutateAsync({ input: e.target.checked }).then(() => refetch())
            }
          />
        </Box>
        <Divider />
        <Box display="flex" justifyContent="space-between" alignItems="center" mt="s16" mb="s16">
          <Box>
            <Text fontSize="r1" fontWeight="semibold">
              Email Salary Slip to Employee
            </Text>
            <Text fontSize="s3" color="gray.600" lineHeight="none">
              Emails salary slip to their respective email.
            </Text>
          </Box>
          <Switch
            isChecked={emailSalarySlipToEmployee}
            onChange={(e) =>
              emailSalarySlipToEmployeeMutateAsync({ input: e.target.checked }).then(() =>
                refetch()
              )
            }
          />
        </Box>
        <Divider />
        <Box display="flex" justifyContent="space-between" alignItems="center" mt="s16">
          <Box>
            <Text fontSize="r1" fontWeight="semibold">
              Disable Rounded Total
            </Text>
            <Text fontSize="s3" color="gray.600" lineHeight="none">
              If checked, hides and disables rounded amount field throughout the Payroll System.
            </Text>
          </Box>
          <Switch
            isChecked={disableRoundedTotal}
            onChange={(e) =>
              disableRoundedTotalMutateAsync({ input: e.target.checked }).then(() => refetch())
            }
          />
        </Box>
      </SettingsCard>
    </Box>
  );
};

export default GeneralSettings;
