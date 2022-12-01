import { Box, Divider, GridItem, Text, VStack } from '@myra-ui';

import { KymMemberTypesEnum } from '@coop/cbs/data-access';
import { COASelectModal } from '@coop/shared/components';
import { FormEditableTable } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

type NewChangeTable = {
  memberType: KymMemberTypesEnum;
  ledgerId: number;
  charge: number;
};

export const NewMemberCharge = () => {
  const { t } = useTranslation();

  const MemberTypeList = [
    {
      label: t['memberSettingsIndividual'],
      value: KymMemberTypesEnum.Individual,
    },
    {
      label: t['memberSettingsInstitution'],
      value: KymMemberTypesEnum.Institution,
    },
    {
      label: t['memberSettingsCooperative'],
      value: KymMemberTypesEnum.Cooperative,
    },
    {
      label: t['memberSettingsCooperativeUnion'],
      value: KymMemberTypesEnum.CooperativeUnion,
    },
  ];

  return (
    <VStack
      width="100%"
      border="1px"
      spacing="0"
      alignItems="start"
      divider={<Divider border="1px" borderColor="border.layout" />}
      borderColor="border.layout"
      borderRadius="br2"
      pb="180px"
    >
      <Box display="flex" alignItems="center" px="s12" height="s60">
        <Box display="flex" flexDir="column" gap="s4">
          <Text fontSize="r1" color="gray.800" fontWeight="SemiBold" lineHeight="16.25px">
            {t['memberSettingsNewMemberCharges']}
          </Text>

          <Text fontSize="s2" color="gray.600" fontWeight="Regular" lineHeight="16.25px">
            {t['memberSettingsDifferentCharges']}
          </Text>
        </Box>
      </Box>
      <Box p="s16" width="100%">
        <GridItem colSpan={3}>
          <Box display="flex" flexDirection="column" gap="s20">
            <FormEditableTable<NewChangeTable>
              name="charge"
              columns={[
                {
                  accessor: 'memberType',
                  header: t['memberSettingsMemberType'],
                  fieldType: 'select',
                  selectOptions: MemberTypeList,
                  cellWidth: 'auto',
                },
                {
                  accessor: 'ledgerId',
                  header: t['memberSettingsLedgerMapping'],
                  fieldType: 'modal',
                  modal: COASelectModal,
                  cellWidth: 'auto',
                },
                {
                  accessor: 'charge',
                  header: t['memberSettingsCharge'],
                  isNumeric: true,
                  cellWidth: 'auto',
                },
              ]}
            />
          </Box>
        </GridItem>
      </Box>
    </VStack>
  );
};
