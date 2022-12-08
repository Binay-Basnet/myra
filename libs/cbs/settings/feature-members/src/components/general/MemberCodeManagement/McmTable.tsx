import { useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { asyncToast, Box, Button, Modal, Text } from '@myra-ui';
import { Table } from '@myra-ui/table';

import {
  GeneralMemberInput,
  useAddGeneralMemberMutation,
  useGetGeneralMemberSettingsDataQuery,
} from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface DepositListProps {}

export const McmTable = () => {
  const { t } = useTranslation();
  const methods = useFormContext();
  const { watch } = methods;
  const { getValues } = methods;
  const { mutateAsync } = useAddGeneralMemberMutation();
  const [openModal, setOpenModal] = useState(false);
  const [corePrev, setCorePrev] = useState('1');

  const pref = watch('memberCode.prefix');
  const numOfDig = watch('memberCode.noOfDigits');
  const initialNum = watch('memberCode.initialNo');

  const values = getValues();

  const onOpenModal = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const { data: editValues, isLoading, refetch } = useGetGeneralMemberSettingsDataQuery();
  const rowData = useMemo(
    () => editValues?.settings?.general?.KYM?.general?.generalMember?.record?.memberCode,
    [editValues]
  );

  const memberSetData = editValues?.settings?.general?.KYM?.general?.generalMember?.record;

  const tableData = [
    {
      name: 'Member ID',
      prefix: rowData?.prefix,
      noOfDigits: rowData?.noOfDigits,
      initialNo: rowData?.initialNo,
    },
  ];

  const staticTableData = [
    {
      name: 'Member ID',
      prefix: '-',
      noOfDigits: 0,
      initialNo: '-',
    },
  ];

  const saveMcm = () => {
    const updatedValues = {
      ...values,
      memberCode: {
        prefix: values?.['memberCode']?.prefix,
        noOfDigits: Number(values?.['memberCode']?.noOfDigits),
        initialNo: values?.['memberCode']?.initialNo,
      },
    };

    asyncToast({
      id: 'general-settings-member-id',
      msgs: {
        success: 'General Member Settings Saved',
        loading: 'Saving General Member Settings',
      },
      onSuccess: () => {
        onCloseModal();
        refetch();
      },
      promise: mutateAsync({ data: updatedValues as GeneralMemberInput }),
    });
  };

  useEffect(() => {
    setCorePrev(values['memberCode']?.initialNo?.padStart(values['memberCode']?.noOfDigits, 0));
  }, [values, initialNum, numOfDig, pref]);

  return (
    <>
      <Modal
        open={openModal}
        onClose={onCloseModal}
        isCentered
        title="memberSettingsMemberID"
        primaryButtonLabel="save"
        primaryButtonHandler={saveMcm}
        width="container.lg"
      >
        <Box display="flex" flexDirection="column" gap="s16">
          <Box display="flex" gap="s20">
            <FormInput name="memberCode.prefix" label={t['memberSettingsPrefix']} />
            <FormInput name="memberCode.noOfDigits" label={t['memberSettingsNoofDigit']} />
            <FormInput name="memberCode.initialNo" label={t['memberSettingsInitialNumber']} />
          </Box>

          <Box borderRadius="br2" px="s16" py="s8" bg="background.500" w="250px">
            <Text fontSize="s2" fontWeight="Regular" color="neutralColorLight.Gray-70">
              {t['memberSettingssCorePreview']}
            </Text>
            <Text fontSize="r1" fontWeight="SemiBold" color="neutralColorLight.Gray-70">
              {values['memberCode']?.prefix as string}
              {corePrev?.toString()}
            </Text>
          </Box>
        </Box>
      </Modal>
      <Table
        data={memberSetData ? tableData : staticTableData}
        isStatic
        isLoading={isLoading}
        columns={[
          {
            header: t['memberSettingsName'],
            accessorKey: 'name',
          },
          {
            header: t['memberSettingsPrefix'],
            accessorKey: 'prefix',
          },
          {
            header: t['memberSettingsNoofDigit'],
            accessorKey: 'noOfDigits',
          },
          {
            header: t['memberSettingsInitialNumber'],
            accessorKey: 'initialNo',
          },
          {
            id: '_actions',
            header: '',
            cell: () =>
              (!memberSetData || !memberSetData?.memberCode?.prefix) && (
                <Button variant="ghost" onClick={onOpenModal}>
                  {t['memberSettingsSetup']}
                </Button>
              ),
          },
        ]}
      />
    </>
  );
};

export default McmTable;
