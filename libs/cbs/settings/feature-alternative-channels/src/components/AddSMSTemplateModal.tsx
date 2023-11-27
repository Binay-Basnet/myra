import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IoWarning } from 'react-icons/io5';
import { useQueryClient } from '@tanstack/react-query';

import {
  Alert,
  asyncToast,
  Box,
  FormSection,
  GridItem,
  Icon,
  Loader,
  Modal,
  Text,
  Tooltip,
} from '@myra-ui';

import {
  SmsTemplateInput,
  useAddSmsTemplateMutation,
  useListSmsSettingQuery,
  useListSmsTemplateDetailQuery,
  useListSmsTemplateDynamicFieldForSmsTypeQuery,
} from '@coop/cbs/data-access';
import { FormCheckbox, FormInput, FormSelect, FormTextAreaWithMentions } from '@coop/shared/form';

interface IAddSMSTemplateModal {
  isOpen: boolean;
  onClose: () => void;
  id?: string;
}

export const AddSMSTemplateModal = ({ isOpen, onClose, id }: IAddSMSTemplateModal) => {
  const methods = useForm<SmsTemplateInput>({
    defaultValues: {
      activeStatus: false,
    },
  });

  const queryClient = useQueryClient();

  const { data: statusListData } = useListSmsSettingQuery();
  const statusList = statusListData?.settings?.sms?.listSmsSetting?.data ?? [];

  const smsTypeOptions =
    statusList?.map((s) => ({ label: s?.name as string, value: s?.id as string })) ?? [];

  const { mutateAsync: addSMSTemplate } = useAddSmsTemplateMutation();

  const handleSave = () => {
    const values = methods.getValues();

    if (id) {
      asyncToast({
        id: 'update-sms-template',
        msgs: {
          loading: 'Updating Template',
          success: 'Template Updated',
        },
        promise: addSMSTemplate({
          input: { id, ...values },
        }),
        onSuccess: () => {
          queryClient?.invalidateQueries(['listSmsTemplate']);
          handleClose();
        },
      });
    } else {
      asyncToast({
        id: 'add-sms-template',
        msgs: {
          loading: 'Adding Template',
          success: 'Template Added',
        },
        promise: addSMSTemplate({
          input: values,
        }),
        onSuccess: () => {
          queryClient?.invalidateQueries(['listSmsTemplate']);
          handleClose();
        },
      });
    }
  };

  // const { data: smsTemplateFieldData } = useListSmsTemplateFieldQuery();

  const smsType = methods.watch('smsType');

  useEffect(() => {
    methods.resetField('content');
  }, [smsType]);

  const { data: smsTemplateFieldData } = useListSmsTemplateDynamicFieldForSmsTypeQuery({ smsType });

  const smsTemplateFields = useMemo(
    () =>
      smsTemplateFieldData?.settings?.sms?.listSmsTemplateDynamicFieldForSmsType?.data?.map(
        (field) => ({
          id: field?.id,
          display: field?.name,
        })
      ) ?? [],
    [smsTemplateFieldData]
  );

  const { data: smsTemplateDetailData, isFetching } = useListSmsTemplateDetailQuery(
    { id: id as string },
    { enabled: !!id }
  );

  const smsTemplateDetail = smsTemplateDetailData?.settings?.sms?.smsTemplateDetail?.data;

  useEffect(() => {
    if (smsTemplateDetail) {
      methods.reset({
        name: smsTemplateDetail?.name,
        content: smsTemplateDetail?.content,
        smsType: smsTemplateDetail?.smsTypeId,
        activeStatus: smsTemplateDetail?.activeStatus,
      });
    }
  }, [smsTemplateDetail]);

  const handleClose = () => {
    methods.reset({ name: '', smsType: '', content: '', activeStatus: false });
    onClose();
  };

  const content = methods.watch('content');

  return (
    <Modal
      title="SMS Template"
      open={isOpen}
      onClose={handleClose}
      primaryButtonLabel={id ? 'Update SMS Template' : 'Create SMS Template'}
      width="3xl"
      primaryButtonHandler={handleSave}
      hidePadding
    >
      <FormProvider {...methods}>
        {isFetching ? (
          <Loader />
        ) : (
          <>
            <FormSection>
              <GridItem colSpan={2}>
                <FormInput name="name" label="Title" />
              </GridItem>

              <FormSelect
                name="smsType"
                label="SMS Type"
                options={smsTypeOptions}
                isDisabled={!!id}
              />
            </FormSection>

            <Box display="flex" flexDirection="column" gap="s16" p="s20">
              <Text fontSize="r1" fontWeight="SemiBold" color="neutralColorLight.Gray-80">
                SMS Details
              </Text>

              <Box display="flex" flexDirection="column" gap="s4">
                <FormTextAreaWithMentions
                  name="content"
                  label="SMS Content"
                  list={smsTemplateFields}
                />

                <Box display="flex" justifyContent="flex-end" alignItems="center" gap="s4">
                  <Text>Characters: ~{content?.length}</Text>

                  <Tooltip title="Total characters may vary because of dynamic fields.">
                    <Box cursor="pointer">
                      <Icon as={IoWarning} color="info.500" />
                    </Box>
                  </Tooltip>
                </Box>
              </Box>

              <Alert
                title="Note:"
                subtitle='Type "@" to get list of dynamic fields to add in SMS Content.'
                status="info"
                hideCloseIcon
              />

              <FormCheckbox name="activeStatus" label="Make this Active" />
            </Box>
          </>
        )}
      </FormProvider>
    </Modal>
  );
};
