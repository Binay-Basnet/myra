import { FormProvider, useForm } from 'react-hook-form';
import { IoClose } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';

import {
  asyncToast,
  Box,
  Button,
  Container,
  Divider,
  FormFooter,
  Icon,
  IconButton,
  Modal,
  PathBar,
  VStack,
} from '@myra-ui';

import {
  StrTransactionActionInput,
  useSetStrTransactionActionMutation,
} from '@coop/cbs/data-access';
import { FormTextArea } from '@coop/shared/form';

import {
  DepositList,
  FamilyMemberDetails,
  LoanAccounts,
  MemberDetails,
  MemberDocuments,
  SavingAccounts,
  STRAccountDetails,
  STRReason,
  STRTopology,
  TransactionDetails,
  WithdrawList,
} from '../../components/STRDetails';
import { useSTRDetails } from '../../hooks';

export const STRDetail = () => {
  const router = useRouter();

  const { id } = router.query;

  const { strStatus, memberDetails } = useSTRDetails();

  const { isOpen, onClose, onToggle } = useDisclosure();

  const methods = useForm<StrTransactionActionInput>();

  const { getValues } = methods;

  const { mutateAsync: setStrTransactionAction } = useSetStrTransactionActionMutation();

  const handleAccept = () => {
    asyncToast({
      id: 'accepting-str-transaction',
      msgs: { loading: 'Accepting Transaction', success: 'Transaction Accepted' },
      promise: setStrTransactionAction({ data: { transactionId: id as string, isAccepted: true } }),
      onSuccess: () => router.back(),
    });
  };
  const handleDecline = () => {
    asyncToast({
      id: 'declining-str-transaction',
      msgs: { loading: 'Declining Transaction', success: 'Transaction Declined' },
      promise: setStrTransactionAction({
        data: { ...getValues(), transactionId: id as string, isAccepted: false },
      }),
      onSuccess: () => {
        onToggle();
        router.back();
      },
    });
  };

  return (
    <>
      <Container minW="container.xl" height="fit-content" bg="white" p="0">
        <Box position="sticky" bg="white" top="0" zIndex="10" width="100%">
          <PathBar
            paths={[
              { label: 'STR Report', link: '' },
              { label: memberDetails?.memberName as string, link: '' },
            ]}
            button={
              <IconButton
                variant="ghost"
                aria-label="close"
                color="gray.500"
                height="40px"
                icon={<Icon as={IoClose} size="lg" />}
                onClick={() => {
                  router.back();
                }}
              />
            }
          />
        </Box>

        <Box bg="white" minH="calc(100vh - 170px)">
          <VStack divider={<Divider />} alignItems="stretch" justifyContent="center" pb="s60">
            <MemberDetails />

            <MemberDocuments />

            <STRAccountDetails />

            <FamilyMemberDetails />

            <SavingAccounts />

            <TransactionDetails />

            <DepositList />

            <WithdrawList />

            <LoanAccounts />

            <STRReason />

            <STRTopology />
          </VStack>
        </Box>
      </Container>

      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" zIndex={10}>
          <Container minW="container.xl" height="fit-content" p="0">
            <FormFooter
              mainButtonLabel="Accept"
              mainButtonHandler={handleAccept}
              isMainButtonDisabled={strStatus !== null}
              draftButton={
                <Button
                  variant="ghost"
                  shade="danger"
                  onClick={onToggle}
                  isDisabled={strStatus !== null}
                >
                  Decline
                </Button>
              }
            />
          </Container>
        </Box>
      </Box>

      <Modal
        open={isOpen}
        onClose={onClose}
        primaryButtonHandler={handleDecline}
        secondaryButtonHandler={onToggle}
        primaryButtonLabel="Done"
        secondaryButtonLabel="Undo"
        title="Do you sure want to Decline ?"
      >
        <FormProvider {...methods}>
          <Box display="flex" flexDir="column" gap="s8">
            <FormTextArea
              rules={{ required: { value: true, message: 'This field is required' } }}
              h="100px"
              name="declineReason"
              label="Reason for Declination"
            />
          </Box>
        </FormProvider>
      </Modal>
    </>
  );
};
