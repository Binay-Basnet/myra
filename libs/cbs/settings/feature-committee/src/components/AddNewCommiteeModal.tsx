import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import { omit } from 'lodash';

import { asyncToast, Box, Grid, GridItem, Modal, Text } from '@myra-ui';

import {
  CommitteeInput,
  useGetCommitteeListQuery,
  useSetCommitteeAddMutation,
} from '@coop/cbs/data-access';
import { FormFileInput, FormInput, FormSwitchTab, FormTextArea } from '@coop/shared/form';

interface IUpdateBalanceProps {
  isOpen: boolean;
  onClose: () => void;
}

type CustomCommitteeInput = {
  unit?: string | null;
} & CommitteeInput;

export const EditCommitteeModal = ({ isOpen, onClose }: IUpdateBalanceProps) => {
  const router = useRouter();
  const methods = useForm<CustomCommitteeInput>({
    defaultValues: {
      unit: 'Month',
    },
  });
  const { reset, watch } = methods;
  const queryClient = useQueryClient();
  const { data: taxData } = useGetCommitteeListQuery();

  const handleUpdateModalClose = () => {
    methods.reset({
      code: null,
      description: undefined,
      file: null,
      memberIds: null,
      name: undefined,
      tenure: undefined,
      unit: null,
    });
  };

  const { mutateAsync: setTax } = useSetCommitteeAddMutation();

  const id = router?.query['id'];

  const handleSave = () => {
    const values = methods.getValues();

    const filteredValues = {
      ...omit({ ...values }, ['unit', 'file', 'tenure']),
      file: values['file']?.length > 0 ? values['file'][0] : null,
      tenure: values?.unit === 'Year' ? Number(values?.tenure) * 12 : values?.tenure,
    };

    asyncToast({
      id: 'add-committee',

      promise: setTax({
        id: id as string,

        data: {
          ...(filteredValues as CommitteeInput),
        },
      }),
      msgs: {
        loading: 'Adding Committee',
        success: 'Committee Added',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getCommitteeList']);
        handleUpdateModalClose();
        onClose();
        // router.push('/accounting/investment/investment-transaction/list');
      },
    });
  };

  useEffect(() => {
    if (taxData && id) {
      const editValueData = taxData?.settings?.general?.organization?.committee?.find(
        (d) => d?.id === id
      );

      if (editValueData) {
        const fileData = [
          {
            identifier: editValueData?.file?.identifier,
            url: editValueData?.file?.url,
          },
        ];

        const newData = {
          name: editValueData?.name,
          file: fileData,
          description: editValueData?.description,
          tenure: editValueData?.tenure,
        };
        reset({
          ...(newData as unknown as CommitteeInput),
          unit: 'Month',
        });
      }
    }
  }, [taxData, id, reset]);

  const addonText = watch('unit');

  return (
    <Modal
      title="Add Committee"
      open={isOpen}
      onClose={onClose}
      primaryButtonLabel="Save"
      primaryButtonHandler={handleSave}
      onCloseComplete={handleUpdateModalClose}
    >
      <FormProvider {...methods}>
        <Box display="flex" flexDirection="column" gap="s24">
          <Grid templateColumns="repeat(2, 1fr)" rowGap="s16">
            <GridItem colSpan={2}>
              <FormInput type="text" name="name" label="Committee Name" />
            </GridItem>
          </Grid>
          <Box display="flex" flexDirection="column" gap="s8">
            <Text fontSize="s3" fontWeight="500">
              Tenure{' '}
            </Text>

            <Box
              display="flex"
              flexDirection="column"
              gap="s16"
              p="s16"
              border="1px solid"
              borderColor="border.layout"
              borderRadius="br2"
            >
              <FormSwitchTab
                name="unit"
                options={[
                  {
                    label: 'Month',
                    value: 'Month',
                  },
                  {
                    label: 'Year',
                    value: 'Year',
                  },
                ]}
              />
              <Box w="50%">
                <FormInput
                  isRequired
                  type="number"
                  name="tenure"
                  textAlign="right"
                  rightAddonText={addonText as string}
                />
              </Box>
            </Box>
          </Box>
          <Box w="100%">
            <FormFileInput name="file" label="File Upload" />
          </Box>
          <FormTextArea name="description" label="Notes" />
        </Box>
      </FormProvider>
    </Modal>
  );
};
