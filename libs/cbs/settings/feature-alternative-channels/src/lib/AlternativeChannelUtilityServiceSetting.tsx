import { useMemo, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';

import { Box, Button, Icon } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useListUtilitiesQuery, useListUtilityServiceTypeQuery } from '@coop/cbs/data-access';
import { SettingsCard } from '@coop/cbs/settings/ui-components';
import { getPaginationQuery } from '@coop/shared/utils';

import { ChargeSetupModal } from '../components';

export const AlternativeChannelUtilityServiceSetting = () => {
  const [selectedSlug, setSelectedSlug] = useState('');
  const [selectedSlugTitle, setSelectedSlugTitle] = useState('');

  const router = useRouter();

  const service = router?.query?.['service'];

  const {
    isOpen: isSetupModalOpen,
    onClose: onSetupModalClose,
    onToggle: onSetupModalToggle,
  } = useDisclosure();

  const { data: utilityServicesData } = useListUtilityServiceTypeQuery({
    filter: { isActive: true },
  });

  const services = utilityServicesData?.settings?.ebanking?.utility?.listServiceType?.data;

  const serviceDetail = services?.find((ser) => ser?.slug === service);

  const { data: utilityListData, isFetching } = useListUtilitiesQuery({
    pagination: { ...getPaginationQuery(), first: -1 },
    filter: {
      orConditions: [
        { andConditions: [{ column: 'servicename', comparator: 'EqualTo', value: service }] },
      ],
    },
  });

  const utilityList = utilityListData?.settings?.ebanking?.utility?.listUtilities?.edges;

  const columns = useMemo<Column<any>[]>(
    () => [
      {
        header: 'Service Provider',
        accessorKey: 'serviceProvider',
        meta: {
          width: 'auto',
        },
      },
      {
        id: '_actions',
        header: 'Actions',
        cell: (props) => (
          <Box display="flex" gap="s16">
            <Button
              variant="ghost"
              leftIcon={<Icon as={FiEdit} color="black" />}
              onClick={() => {
                setSelectedSlug(props?.row?.original?.slug);
                setSelectedSlugTitle(props?.row?.original?.serviceProvider);
                onSetupModalToggle();
              }}
            >
              Edit
            </Button>

            {/* <Button
              variant="ghost"
              leftIcon={<Icon as={AiOutlineDelete} color="danger.500" />}
              shade="danger"
            >
              Delete
            </Button> */}
          </Box>
        ),
      },
    ],
    []
  );

  return (
    <>
      <Box p="s16" display="flex" flexDir="column" gap="s16">
        <SettingsCard
          title={serviceDetail?.name as string}
          subtitle="Extend Fields that can be added to forms for additional input Fields."
        >
          <Table
            columns={columns}
            data={
              utilityList?.map((utility) => ({
                serviceProvider: utility?.node?.name,
                slug: utility?.node?.slug,
              })) ?? []
            }
            isStatic
            isLoading={isFetching}
          />
        </SettingsCard>
      </Box>

      <ChargeSetupModal
        isOpen={isSetupModalOpen}
        onClose={onSetupModalClose}
        title={selectedSlugTitle}
        slug={selectedSlug}
      />
    </>
  );
};

export default AlternativeChannelUtilityServiceSetting;
