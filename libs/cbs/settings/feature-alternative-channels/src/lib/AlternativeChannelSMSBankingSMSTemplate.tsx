import { useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { AddIcon } from '@chakra-ui/icons';
import { useDisclosure } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, Button, Icon, Text, Tooltip } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import {
  AlternativeChannelServiceType,
  useDeleteSmsTemplateMutation,
  useListSmsTemplateQuery,
} from '@coop/cbs/data-access';
import { SettingsCard } from '@coop/cbs/settings/ui-components';
import { localizedDate } from '@coop/cbs/utils';
import { ConfirmationDialog } from '@coop/shared/components';
import { getPaginationQuery } from '@coop/shared/utils';

import { AddSMSTemplateModal } from '../components';

type ChargesEditTable = {
  id?: string;
  serviceType: AlternativeChannelServiceType;
  ledgerId: string;
  amount: string;
  restrictTransaction: boolean;
};

export const AlternativeChannelSMSBankingSMSTemplate = () => {
  const methods = useForm<{ charges: ChargesEditTable[] }>();

  const queryClient = useQueryClient();

  const [selectedId, setSelectedId] = useState('');

  const deleteConfirmCancelRef = useRef<HTMLButtonElement | null>(null);

  const {
    isOpen: isAddModalOpen,
    onClose: onAddModalClose,
    onToggle: onAddModalToggle,
  } = useDisclosure();

  const {
    isOpen: isConfirmModalOpen,
    onClose: onConfirmModalClose,
    onToggle: onConfirmModalToggle,
  } = useDisclosure();

  const { data: smsTemplateListData } = useListSmsTemplateQuery({
    paginate: { ...getPaginationQuery(), first: -1 },
  });

  const smsTemplates = smsTemplateListData?.settings?.sms?.listSmsTemplate?.edges ?? [];

  const { mutateAsync: deleteSMSTemplate } = useDeleteSmsTemplateMutation();

  const handleDelete = () => {
    asyncToast({
      id: 'delete-sms-template',
      msgs: { loading: 'Deleting Template', success: 'Template Deleted' },
      promise: deleteSMSTemplate({ id: selectedId }),
      onSuccess: () => {
        queryClient?.invalidateQueries(['listSmsTemplate']);
      },
    });
  };

  const columns: Column<typeof smsTemplates[0]>[] = [
    {
      header: 'Title',
      accessorFn: (row) => row?.node?.name,
    },
    {
      header: 'SMS Content',
      accessorFn: (row) => row?.node?.content,
      cell: (cell) => (
        <Box width="20rem">
          <Tooltip title={cell?.row?.original?.node?.content as string} />
        </Box>
      ),
      meta: {
        width: '30%',
      },
    },
    {
      header: 'SMS Type',
      accessorFn: (row) => row?.node?.smsType,
    },
    {
      header: 'Last Modified Date',
      accessorFn: (row) => localizedDate(row?.node?.modifiedDate),
      // meta: {
      //   width: '10%',
      // },
    },
    {
      id: '_actions',
      header: '',
      cell: (cell) => (
        <Box>
          <Button
            leftIcon={<Icon as={BiEdit} />}
            onClick={() => {
              setSelectedId(cell?.row?.original?.node?.id as string);
              onAddModalToggle();
            }}
            variant="ghost"
            shade="neutral"
          >
            Edit
          </Button>
          <Button
            leftIcon={<Icon as={AiOutlineDelete} />}
            variant="ghost"
            shade="danger"
            onClick={() => {
              setSelectedId(cell?.row?.original?.node?.id as string);
              onConfirmModalToggle();
            }}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <>
      <FormProvider {...methods}>
        <Box p="s16" display="flex" flexDir="column" gap="s16">
          <Box display="flex" flexDir="column" gap="s16">
            <Box h="60px" display="flex" flexDir="column" gap="s4" justifyContent="center">
              <Text fontSize="r1" fontWeight="600" color="gray.800">
                SMS Template
              </Text>
              {/* <Text fontSize="s3" fontWeight={500} color="gray.600">
                {t['acBasicCharge']}
              </Text> */}
            </Box>
          </Box>

          <SettingsCard
            title="SMS Template"
            headerButton={
              <Button
                leftIcon={<Icon as={AddIcon} h="12px" />}
                onClick={onAddModalToggle}
                variant="ghost"
              >
                New SMS Template
              </Button>
            }
          >
            <Table isStatic data={smsTemplates} columns={columns} />
          </SettingsCard>
        </Box>
      </FormProvider>

      <AddSMSTemplateModal
        isOpen={isAddModalOpen}
        onClose={() => {
          onAddModalClose();
          setSelectedId('');
        }}
        id={selectedId}
      />

      <ConfirmationDialog
        isOpen={isConfirmModalOpen}
        onClose={() => {
          setSelectedId('');
          onConfirmModalClose();
        }}
        cancelRef={deleteConfirmCancelRef}
        handleConfirm={handleDelete}
        title="SMS Template"
        description="Are you sure you want to delete this template?"
      />
    </>
  );
};

export default AlternativeChannelSMSBankingSMSTemplate;
