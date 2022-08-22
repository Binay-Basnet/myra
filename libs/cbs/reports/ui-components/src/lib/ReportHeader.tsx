import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsThreeDots } from 'react-icons/bs';
import { IoSaveOutline, IoStarOutline } from 'react-icons/io5';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Popover } from '@chakra-ui/react';

import {
  ReportPeriodType,
  ShareTransactionType,
  useGetNewIdMutation,
  useSaveNewReportMutation,
} from '@coop/cbs/data-access';
import {
  asyncToast,
  Box,
  Button,
  Grid,
  GridItem,
  Icon,
  Input,
  Modal,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  TextFields,
} from '@coop/shared/ui';

type Path = {
  link?: string;
  label: string;
};

interface ReportFilterType {
  memberId: string;
  predefinedPeriod: ReportPeriodType;
  period: {
    from: string;
    to: string;
  };
  type: ShareTransactionType;
}

export interface PathBarProps {
  paths: Path[];
  filters: ReportFilterType;
}

export const ReportHeader = ({ paths, filters }: PathBarProps) => {
  const router = useRouter();
  const { register, getValues } = useForm();
  const { mutateAsync: saveReport } = useSaveNewReportMutation();
  const { mutateAsync: getNewId } = useGetNewIdMutation();
  const queryClient = useQueryClient();

  const [openModal, setOpenModal] = useState(false);

  const onOpenModal = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box
      h="50px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px="s32"
      borderBottom="1px"
      borderColor="border.layout"
    >
      <Box display="flex" alignItems="center" gap="s8">
        <Button variant="ghost" color="gray.800" p="0">
          <Icon
            as={ChevronLeftIcon}
            size="xl"
            onClick={() => {
              router.back();
            }}
          />
        </Button>

        <Box display="flex" alignItems="center" gap="s8">
          {paths.map((path, index) => (
            <Fragment key={index}>
              <TextFields
                variant={
                  router.pathname === path.link ? 'pageHeader' : 'bodyLarge'
                }
                cursor="pointer"
                onClick={() => {
                  if (path.link) {
                    router.push(path.link);
                  }
                }}
              >
                {path.label}
              </TextFields>
              {paths.length !== index + 1 && (
                <Text fontSize="r3" mt="-3px" color="gray.800" fontWeight="500">
                  /
                </Text>
              )}
            </Fragment>
          ))}
          <Icon as={IoStarOutline} color="gray.700" pr="" />
        </Box>
      </Box>

      <Box display="flex" alignItems="center" gap="s16">
        <Button
          variant="ghost"
          gap="s8"
          onClick={onOpenModal}
          isDisabled={
            router.query['action'] !== 'new' ||
            !filters?.memberId ||
            !filters?.predefinedPeriod
          }
        >
          <Icon as={IoSaveOutline} />
          Save Report
        </Button>

        <ReportOptions />
      </Box>

      <Modal
        open={openModal}
        isCentered
        onClose={onCloseModal}
        title="Save Report"
      >
        <Box pb="s12" borderBottom="1px" borderBottomColor="border.layout">
          <Input
            placeholder="Untitled Report"
            label="Give your untitled report a name"
            {...register('name')}
          />
        </Box>
        <Box pt="s12" pb="s8">
          <Button
            onClick={async () => {
              const callApi = async () => {
                const idResponse = await getNewId({});
                return await saveReport({
                  data: {
                    id: idResponse.newId,
                    data: {
                      memberId: filters.memberId,
                      periodType: filters.predefinedPeriod,
                      filter: filters.type,
                    },
                    name: getValues()['name'],
                    reportType: 'Share Report',
                  },
                });
              };

              await asyncToast({
                id: 'save-report-toast',
                onSuccess: () => {
                  queryClient.invalidateQueries('getAllSavedReports');
                  router.push('/reports/saved');
                },
                msgs: {
                  loading: 'Saving New Report',
                  success: 'Saved Report',
                  error: 'Error while saving',
                },
                promise: callApi(),
              });
            }}
          >
            Save Report{' '}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

const ExportIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M13.125 6.875H14.6875C15.1019 6.875 15.4993 7.03962 15.7924 7.33265C16.0854 7.62567 16.25 8.0231 16.25 8.4375V16.5625C16.25 16.9769 16.0854 17.3743 15.7924 17.6674C15.4993 17.9604 15.1019 18.125 14.6875 18.125H5.3125C4.8981 18.125 4.50067 17.9604 4.20765 17.6674C3.91462 17.3743 3.75 16.9769 3.75 16.5625V8.4375C3.75 8.0231 3.91462 7.62567 4.20765 7.33265C4.50067 7.03962 4.8981 6.875 5.3125 6.875H6.875"
        stroke="#343C46"
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.875 10.625L10 13.75L13.125 10.625M10 1.875V13.125"
        stroke="#343C46"
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const ReportOptions = () => {
  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <Button variant="ghost" gap="s8">
          <Icon as={BsThreeDots} />
          Options
        </Button>
      </PopoverTrigger>
      <PopoverContent
        minWidth="180px"
        w="180px"
        color="white"
        _focus={{ boxShadow: 'none' }}
      >
        <PopoverBody px="0" py="0">
          <Grid>
            <GridItem
              px="s16"
              py="s12"
              _hover={{ bg: 'gray.100' }}
              cursor="pointer"
            >
              <Box
                display="flex"
                alignItems="center"
                gap="s8"
                color="neutralColorLight.Gray-80"
              >
                <Icon as={ExportIcon} size="md" transform="rotate(180deg)" />
                <TextFields variant="bodyRegular">Export</TextFields>
              </Box>
            </GridItem>
            <GridItem
              px="s16"
              py="s12"
              _hover={{ bg: 'gray.100' }}
              cursor="pointer"
            >
              <Box
                display="flex"
                alignItems="center"
                gap="s8"
                color="neutralColorLight.Gray-80"
              >
                <Icon as={IoStarOutline} size="md" transform="rotate(180deg)" />
                <TextFields variant="bodyRegular">Bookmark</TextFields>
              </Box>
            </GridItem>
          </Grid>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
