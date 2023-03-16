import { Fragment, useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { AiOutlinePrinter } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';
import { IoChevronForward, IoSaveOutline } from 'react-icons/io5';
import ReactToPrint from 'react-to-print';
import { useRouter } from 'next/router';
import { IconButton, Popover, PopoverBody, PopoverContent, PopoverTrigger } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import {
  asyncToast,
  Box,
  Button,
  Grid,
  GridItem,
  Icon,
  Input,
  Modal,
  OptionsIcon,
  Text,
} from '@myra-ui';

import {
  ShareStatementReportSettings,
  useGetNewIdMutation,
  useSaveNewReportMutation,
} from '@coop/cbs/data-access';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { useReport } from '@coop/cbs/reports';
import { exportVisibleTableToExcel } from '@coop/cbs/utils';

type Path = {
  link?: string;
  label: string;
};

export interface PathBarProps {
  paths: Path[];
  hasSave?: boolean;
}

export const ReportHeader = ({ paths, hasSave = false }: PathBarProps) => {
  const router = useRouter();
  const { printRef, data, report } = useReport();

  const { getValues: filters } = useFormContext<ShareStatementReportSettings>();

  const { register, getValues } = useForm<{ name: string }>();
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
      h="3.125rem"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px="s16"
      borderBottom="1px"
      borderColor="border.layout"
    >
      <Box display="flex" alignItems="center" gap="s24">
        <Box display="flex" alignItems="center" gap="s8">
          {paths.map((path, index) => (
            <Fragment key={path?.label}>
              <Text
                variant={router.pathname === path.link ? 'pageHeader' : 'bodyLarge'}
                cursor="pointer"
                onClick={() => {
                  if (path.link) {
                    router.push(path.link);
                  }
                }}
              >
                {path.label}
              </Text>
              {paths.length !== index + 1 && (
                <Icon
                  as={IoChevronForward}
                  size="lg"
                  color="gray.600"
                  onClick={() => {
                    router.back();
                  }}
                />
              )}
            </Fragment>
          ))}
        </Box>
        {/* <Icon as={BsPinAngle} color="gray.700" pr="" /> */}
      </Box>
      <Box display="flex" alignItems="center" gap="s16">
        {/* <Button variant="ghost" shade="neutral" gap="s8"> */}
        {/*   <Icon as={ExportIcon} /> */}
        {/*   Export */}
        {/* </Button> */}

        <ReactToPrint
          trigger={() => (
            <Button
              isDisabled={!data?.length}
              variant="ghost"
              shade="neutral"
              leftIcon={<Icon as={AiOutlinePrinter} />}
            >
              Print
            </Button>
          )}
          content={() => printRef.current}
        />

        <Button
          variant="ghost"
          shade="neutral"
          gap="s8"
          onClick={onOpenModal}
          isDisabled={router.query['action'] !== 'new' || !hasSave}
        >
          <Icon as={IoSaveOutline} />
          Save Report
        </Button>

        <Popover placement="bottom-end">
          <PopoverTrigger>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Button
                variant="ghost"
                colorScheme="gray"
                color="gray.600"
                fontSize="r1"
                display="flex"
                alignItems="center"
                gap="s8"
              >
                <Icon as={OptionsIcon} size="sm" />
                <span>Options</span>
              </Button>
            </Box>
          </PopoverTrigger>
          <PopoverContent minWidth="180px" w="180px" color="white" boxShadow="E2">
            <PopoverBody px="0" py="0">
              <Grid>
                <GridItem
                  px="s16"
                  py="s8"
                  _hover={{ bg: 'gray.100' }}
                  cursor="pointer"
                  onClick={() => exportVisibleTableToExcel(report)}
                >
                  <Text variant="bodyRegular" color="neutralColorLight.Gray-80">
                    Export Visible
                  </Text>
                </GridItem>
              </Grid>
            </PopoverBody>
          </PopoverContent>
        </Popover>

        <IconButton
          variant="ghost"
          aria-label="close"
          color="gray.700"
          height="40px"
          icon={<Icon as={GrClose} size="md" />}
          onClick={() => {
            router.back();
          }}
        />
      </Box>
      <Modal open={openModal} isCentered onClose={onCloseModal} title="Save Report">
        <Box pb="s12" borderBottom="1px" borderBottomColor="border.layout">
          <Input label="Give your untitled report a name" {...register('name')} />
        </Box>
        <Box pt="s12" pb="s8">
          <Button
            onClick={async () => {
              const callApi = async () => {
                const idResponse = await getNewId({});
                if (filters) {
                  return saveReport({
                    data: {
                      id: idResponse.newId,
                      data: filters(),
                      name: getValues()['name'],
                      reportType: 'Share Report',
                    },
                  });
                }
                return {};
              };

              await asyncToast({
                id: 'save-report-toast',
                onSuccess: () => {
                  queryClient.invalidateQueries(['getAllSavedReports']);
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

// const ExportIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
//     <path
//       d="M13.125 6.875H14.6875C15.1019 6.875 15.4993 7.03962 15.7924 7.33265C16.0854 7.62567 16.25 8.0231 16.25 8.4375V16.5625C16.25 16.9769 16.0854 17.3743 15.7924 17.6674C15.4993 17.9604 15.1019 18.125 14.6875 18.125H5.3125C4.8981 18.125 4.50067 17.9604 4.20765 17.6674C3.91462 17.3743 3.75 16.9769 3.75 16.5625V8.4375C3.75 8.0231 3.91462 7.62567 4.20765 7.33265C4.50067 7.03962 4.8981 6.875 5.3125 6.875H6.875"
//       stroke="#343C46"
//       strokeWidth="1.25"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M6.875 10.625L10 13.75L13.125 10.625M10 1.875V13.125"
//       stroke="#343C46"
//       strokeWidth="1.25"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );
