import { KymMemberTypesEnum, useGetLedgerMapingShareQuery } from '@coop/cbs/data-access';
import { FormEditableTable } from '@coop/shared/form';
import { Box, Divider, GridItem, Text, VStack } from '@coop/shared/ui';
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

  const { data: ledgerQuery } = useGetLedgerMapingShareQuery();
  const ledgerData = ledgerQuery?.settings?.general?.chartsOfAccount?.accountsUnder?.data;

  const ledgerOptions = ledgerData?.map((data) => ({
    label: data?.name?.local as string,
    value: data?.id as string,
  }));

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

          <Text fontSize="s3" color="gray.600" fontWeight="SemiBold" lineHeight="16.25px">
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
                },
                {
                  accessor: 'ledgerId',
                  header: t['memberSettingsLedgerMapping'],
                  fieldType: 'select',
                  selectOptions: ledgerOptions,
                },
                {
                  accessor: 'charge',
                  header: t['memberSettingsCharge'],
                  isNumeric: true,
                },
              ]}
            />
          </Box>
        </GridItem>
      </Box>
    </VStack>
  );
};
