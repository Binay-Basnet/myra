import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import { DetailPageTopCard } from '@coop/accounting/ui-components';
import { ObjState, useGetMemberListQuery } from '@coop/cbs/data-access';
import { PopoverComponent } from '@coop/myra/components';
import { FormInput, FormSelect } from '@coop/shared/form';
import { Column, Table } from '@myra-ui/table';
import { Alert, Box, Button, Divider, Text } from '@myra-ui';
import { getPaginationQuery, useTranslation } from '@coop/shared/utils';

export const ChequeDetailPage = () => {
  const { t } = useTranslation();
  const methods = useForm({});

  const router = useRouter();

  const [openModal, setOpenModal] = useState(false);

  // const onOpenModal = () => {
  //   setOpenModal(true);
  // };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const { data, isFetching } = useGetMemberListQuery({
    pagination: getPaginationQuery(),
  });

  const rowData = useMemo(() => data?.members?.list?.edges ?? [], [data]);

  const popoverTitle = [
    {
      title: 'memberListTableViewMemberProfile',
    },
    {
      title: 'memberListTableEditMember',
    },
    {
      title: 'memberListTableMakeInactive',
    },
  ];

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: t['bankAccountChequeChequeNumber'],
        accessorFn: (row) => row?.node?.id,
        // meta: {
        //   width: '20%',
        // },
      },
      {
        accessorFn: (row) => row?.node?.name?.local,
        header: t['bankAccountChequePartyName'],

        meta: {
          width: '30%',
          color: 'primary.500',
        },
      },
      {
        header: t['bankAccountChequeStatus'],
        accessorFn: (row) => row?.node?.code,
        meta: {
          width: '30%',
        },
      },
      {
        header: t['bankAccountChequeIssueDate'],
        accessorFn: (row) => row?.node?.contact,
        meta: {
          width: '20%',
        },
      },
      {
        header: t['bankAccountChequeIssueDate'],
        accessorFn: (row) => row?.node?.createdAt,
        meta: {
          width: '20%',
        },
      },
      {
        id: '_actions',
        header: '',
        accessorKey: 'actions',
        cell: (cell) => (
          <PopoverComponent items={popoverTitle} member={cell?.row?.original?.node} />
        ),
        meta: {
          width: '60px',
        },
      },
    ],
    [t]
  );

  const ChequeBookModal = () => (
    <Modal isOpen={openModal} onClose={onCloseModal} isCentered trapFocus={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize="r2" color="neutralColorLight.Gray-80" fontWeight="SemiBold">
            {t['bankAccountChequeCreateChequeBook']}
          </Text>
        </ModalHeader>
        <Divider />
        <ModalCloseButton />
        <ModalBody>
          <FormProvider {...methods}>
            <form>
              <Box display="flex" flexDirection="column" gap="s24">
                <FormSelect
                  name="bank"
                  label={t['bankAccountChequeBank']}
                  __placeholder={t['bankAccountChequeSelectBank']}
                  options={[
                    {
                      label: '1',
                      value: '1',
                    },
                    {
                      label: '2',
                      value: '2',
                    },
                    {
                      label: '3',
                      value: '3',
                    },
                  ]}
                />
                <FormInput
                  type="text"
                  name="micr"
                  label={t['bankAccountChequeEnterMICR']}
                  __placeholder={t['bankAccountChequeEnterMICR']}
                />
                <Box display="grid" gridTemplateColumns="repeat(2,1fr)" gap="s24">
                  <FormInput
                    type="text"
                    name="chequeStart"
                    label={t['bankAccountChequeChequeStart']}
                    __placeholder={t['bankAccountChequeEg00005']}
                  />
                  <FormInput
                    type="text"
                    name="chequeEnd"
                    label={t['bankAccountChequeChequeEnd']}
                    __placeholder={t['bankAccountChequeEg00050']}
                  />
                  <FormInput
                    type="text"
                    name="totalLeafs"
                    label={t['bankAccountChequeTotalLeafs']}
                    __placeholder={t['bankAccountChequeTotalLeafs']}
                  />
                </Box>
              </Box>
            </form>
          </FormProvider>
        </ModalBody>

        <ModalFooter>
          <Button>{t['save']}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return (
    <Box display="flex" flexDirection="column" p="s16" gap="s16">
      <Alert
        status="success"
        title="bankAccountNewChequeBook"
        subtitle="It looks like you are run out of cheque leafs. Consider Creating new cheque book"
      />

      <DetailPageTopCard>
        <Box display="flex" flexDirection="column" gap="s4">
          <Text fontSize="r1" color="neutralColorLight.Gray-90" fontWeight="Regular">
            {t['bankAccountChequeChequeFrom']}
          </Text>

          <Text fontSize="r1" color="neutralColorLight.Gray-70" fontWeight="SemiBold">
            000001
          </Text>
        </Box>

        <Box display="flex" flexDirection="column" gap="s4">
          <Text fontSize="r1" color="neutralColorLight.Gray-90" fontWeight="Regular">
            {t['bankAccountChequeChequeTo']}
          </Text>
          <Text fontSize="r1" color="neutralColorLight.Gray-70" fontWeight="SemiBold">
            34,000
          </Text>
        </Box>

        <Box display="flex" flexDirection="column" gap="s4">
          <Text fontSize="r1" color="neutralColorLight.Gray-90" fontWeight="Regular">
            {t['bankAccountChequeTotalCheques']}
          </Text>
          <Text fontSize="r1" color="neutralColorLight.Gray-70" fontWeight="SemiBold">
            125,000
          </Text>
        </Box>

        <Box display="flex" flexDirection="column" gap="s4">
          <Text fontSize="r1" color="neutralColorLight.Gray-90" fontWeight="Regular">
            {t['bankAccountChequeAvailableCheques']}
          </Text>

          <Text fontSize="r1" color="neutralColorLight.Gray-70" fontWeight="SemiBold">
            47
          </Text>
        </Box>

        <Box display="flex" flexDirection="column" gap="s4">
          <Text fontSize="r1" color="neutralColorLight.Gray-90" fontWeight="Regular">
            {t['bankAccountChequeIssuedCheques']}
          </Text>
          <Text fontSize="r1" color="neutralColorLight.Gray-70" fontWeight="SemiBold">
            3
          </Text>
        </Box>

        <Box display="flex" flexDirection="column" gap="s4">
          <Text fontSize="r1" color="neutralColorLight.Gray-90" fontWeight="Regular">
            {t['bankAccountChequeCancelledCheques']}
          </Text>
          <Text fontSize="r1" color="neutralColorLight.Gray-70" fontWeight="SemiBold">
            0
          </Text>
        </Box>
      </DetailPageTopCard>

      <ChequeBookModal />

      <Table
        data={rowData}
        isStatic
        getRowId={(row) => String(row?.node?.id)}
        isLoading={isFetching}
        columns={columns}
      />
    </Box>
  );
};

export default ChequeDetailPage;
