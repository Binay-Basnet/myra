import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, Modal, Text } from '@myra-ui';

import { CbsCodeType, CodeManagementInput, useSetCbsCodeMutation } from '@coop/cbs/data-access';
import { InputGroupContainer } from '@coop/cbs/settings/ui-containers';
import { FormInput } from '@coop/shared/form';

interface IEditCodeModalProps {
  open: boolean;
  onClose: () => void;
  codeType: CbsCodeType | undefined | null;
  queryKey: string;
}

export const EditCodeModal = ({ open, onClose, codeType, queryKey }: IEditCodeModalProps) => {
  const queryClient = useQueryClient();

  const [codePreview, setCodePreview] = useState<string>('');

  const methods = useForm<CodeManagementInput>();

  const { getValues, watch, resetField } = methods;

  const { mutateAsync: setCBSCode } = useSetCbsCodeMutation();

  const prefix = watch('prefix');

  const noOfDigit = watch('noOfDigit');

  const initialNo = watch('initialNo');

  useEffect(() => {
    if (prefix && noOfDigit && initialNo) {
      setCodePreview(`${prefix}${String(initialNo)?.padStart(noOfDigit, '0')}`);
    } else {
      setCodePreview('');
    }
  }, [prefix, noOfDigit, initialNo]);

  const handleSave = () => {
    asyncToast({
      id: 'set-cbs-code',
      msgs: {
        loading: 'Setting up CBS code',
        success: 'CBS code setup completed',
      },
      promise: setCBSCode({ data: { ...getValues(), codeType: codeType as CbsCodeType } }),
      onSuccess: () => {
        queryClient.invalidateQueries([queryKey]);
        resetField('prefix');
        resetField('noOfDigit');
        resetField('initialNo');
        onClose();
      },
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Setup Code"
      primaryButtonLabel="Save"
      primaryButtonHandler={handleSave}
      isDisabled={!(prefix && noOfDigit && initialNo)}
      width="container.lg"
    >
      <FormProvider {...methods}>
        <form>
          <InputGroupContainer>
            <FormInput name="prefix" label="Prefix" />

            <FormInput name="noOfDigit" label="No of Digit" />

            <FormInput name="initialNo" label="Initial Number" />

            {codePreview && (
              <Box borderRadius="br2" px="s16" py="s8" bg="background.500" w="250px">
                <Text fontSize="s2" fontWeight={400} color="gary.700">
                  Code Preview
                </Text>
                <Text fontSize="r1" fontWeight={600} color="gray.700">
                  {codePreview}
                </Text>
              </Box>
            )}
          </InputGroupContainer>
        </form>
      </FormProvider>
    </Modal>
  );
};
