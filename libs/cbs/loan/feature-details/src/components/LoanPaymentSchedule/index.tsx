import { useDisclosure } from '@chakra-ui/react';

import { Button, DetailsCard, Modal } from '@myra-ui';

import { amountConverter } from '@coop/shared/utils';

import { LoanPaymentScheduleTable } from '../LoanPaymentScheduleTable';
import { useLoanDetails } from '../../hooks/useLoanDetails';

export const LoanPaymentSchedule = () => {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const { loanPreview } = useLoanDetails();

  if (
    !loanPreview?.idealSchedule?.installments ||
    loanPreview?.idealSchedule?.installments?.length === 0
  ) {
    return null;
  }

  return (
    <DetailsCard
      title="Payment Schedule"
      hasTable
      leftBtn={
        <Button variant="ghost" onClick={onToggle}>
          View full schedule
        </Button>
      }
    >
      <LoanPaymentScheduleTable
        data={loanPreview?.idealSchedule.installments?.slice(0, 11)}
        total={String(amountConverter(loanPreview?.idealSchedule?.total ?? 0))}
        totalInterest={loanPreview?.idealSchedule?.totalInterest ?? 0}
        totalPrincipal={loanPreview?.idealSchedule?.totalPrincipal ?? 0}
      />

      <Modal
        onClose={onClose}
        open={isOpen}
        title="Payment Schedule"
        scrollBehavior="inside"
        blockScrollOnMount
        width="3xl"
      >
        <LoanPaymentScheduleTable
          data={loanPreview?.idealSchedule.installments}
          total={String(amountConverter(loanPreview?.idealSchedule?.total ?? 0))}
          totalInterest={loanPreview?.idealSchedule?.totalInterest ?? 0}
          totalPrincipal={loanPreview?.idealSchedule?.totalPrincipal ?? 0}
        />
      </Modal>
    </DetailsCard>
  );
};
