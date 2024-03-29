import { FiArrowRight, FiPlay } from 'react-icons/fi';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { useRouter } from 'next/router';

import { asyncToast, Box, Button, Divider, Drawer, Grid, Icon, Text } from '@myra-ui';

import { NepaliMonths, PayrollStatus, useCompletePayrollRunMutation } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';

interface PayrollRunDrawerProps {
  isDrawerOpen?: boolean;
  onCloseDrawer?: () => void;
  selectedPayroll?: {
    cursor?: string;
    node?: {
      id?: string;
      payMonth?: NepaliMonths;
      payYear?: number;
      paygroup?: string;
      employees?: number;
      payableCost?: number;
      status?: PayrollStatus;
    };
  };
}

export const PayrollRunDrawer = (props: PayrollRunDrawerProps) => {
  const router = useRouter();
  const { isDrawerOpen, onCloseDrawer, selectedPayroll } = props;

  const { mutateAsync } = useCompletePayrollRunMutation();

  const completePayroll = () => {
    asyncToast({
      id: 'complete-payroll-run',
      msgs: {
        success: 'Payroll run completed',
        loading: 'completing payroll run',
      },
      onSuccess: () => {
        onCloseDrawer();
      },
      promise: mutateAsync({
        payrollRunId: selectedPayroll?.node?.id,
      }),
    });
  };

  return (
    <Drawer
      title={`Payroll - ${selectedPayroll?.node?.paygroup} (${selectedPayroll?.node?.payYear} ${selectedPayroll?.node?.payMonth})`}
      open={isDrawerOpen}
      onClose={onCloseDrawer}
    >
      <Text fontSize="r1" fontWeight="medium" mb="s8">
        Payroll Summary
      </Text>
      <Grid
        p="s8"
        templateColumns="repeat(3, 1fr)"
        gap="s16"
        border="1px"
        borderColor="border.layout"
        borderRadius={5}
        bg="background.500"
      >
        <Box display="flex" flexDir="column">
          <Text fontSize="r1">Payroll Group</Text>
          <Text fontSize="r1" fontWeight="semibold">
            {selectedPayroll?.node?.paygroup}
          </Text>
        </Box>
        <Box display="flex" flexDir="column">
          <Text fontSize="r1">Payroll Month</Text>
          <Text fontSize="r1" fontWeight="semibold">
            {selectedPayroll?.node?.payMonth}
          </Text>
        </Box>
      </Grid>
      <Divider my="s16" />
      <Text fontSize="r1" fontWeight="medium" mb="s8">
        Payroll Process
      </Text>

      <Box border="1px" borderColor="border.layout" borderRadius={5}>
        <Text p="s8" fontSize="r1" bg="background.500">
          Payroll Approval
        </Text>
        <Divider />
        <Box p="s8" display="flex" flexDir="column" gap="s8">
          {' '}
          {selectedPayroll?.node?.status === PayrollStatus?.Approved && (
            <Box display="flex" alignItems="center" gap="s4">
              <Icon as={IoIosCheckmarkCircle} color="red" />
              <Text fontSize="r1" fontWeight="medium">
                Approved by Employee
              </Text>
            </Box>
          )}
          {(selectedPayroll?.node?.status === PayrollStatus?.Pending ||
            selectedPayroll?.node?.status === PayrollStatus?.Approved) && (
            <Box display="flex" alignItems="center" gap="s4">
              <Icon as={IoIosCheckmarkCircle} color="red" />
              <Text fontSize="r1" fontWeight="medium">
                Submitted for approval by Employee
              </Text>
            </Box>
          )}
          <Button
            rightIcon={<Icon as={FiArrowRight} />}
            variant="outline"
            width="-webkit-fit-content"
            onClick={() =>
              router.push(
                `${ROUTES?.HR_PAYROLL_ENTRY_EDIT}?id=${selectedPayroll?.node?.id}&&type=approve`
              )
            }
            disabled={!!(selectedPayroll?.node?.status === PayrollStatus?.Rejected)}
          >
            View Payroll Run
          </Button>
        </Box>
      </Box>
      {selectedPayroll?.node?.status === PayrollStatus?.Approved && (
        <Box border="1px" borderColor="border.layout" borderRadius={5} mt="s24">
          <Text p="s8" fontSize="r1" bg="background.500">
            Payroll Dispatch
          </Text>
          <Divider />
          <Box p="s8" display="flex" flexDir="column" gap="s8">
            <Box display="flex" alignItems="center" gap="s4">
              <Icon as={IoIosCheckmarkCircle} color="yellow.400" />
              <Text fontSize="r1" fontWeight="medium">
                Ready for Payroll Dispatch
              </Text>
            </Box>
            <Button
              leftIcon={<Icon as={FiPlay} />}
              width="-webkit-fit-content"
              onClick={completePayroll}
            >
              Dispatch Payroll
            </Button>
          </Box>
        </Box>
      )}
    </Drawer>
  );
};

export default PayrollRunDrawer;
