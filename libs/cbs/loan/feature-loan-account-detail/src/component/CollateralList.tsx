import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { HiOutlineSwitchHorizontal } from 'react-icons/hi';
import { IoSendOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  asyncToast,
  Box,
  Button,
  Chips,
  Grid,
  Modal,
  Text,
} from '@myra-ui';

import {
  GuaranteeStatus,
  LoanAccountCollateral,
  LoanCollateralReleaseInput,
  useReleaseCollateralMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormFileInput, FormTextArea } from '@coop/shared/form';

import { AccordianListCardComponent } from './AccordianCard';
import { DocumentComponent } from './DocumentsCard';
import { useLoanAccountDetailHooks } from '../hooks/useLoanAccountDetailHooks';

type CollateralProps = {
  collatDataList: LoanAccountCollateral | null;
};

export const CollateralList = ({ collatDataList }: CollateralProps) => {
  const methods = useForm();
  const router = useRouter();
  const accountId = router?.query['id'];
  const { getValues } = methods;
  const [openModal, setOpenModal] = useState(false);
  const [openReleaseFormModal, setOpenReleaseFormModal] = useState(false);
  const [openSwitchModal, setOpenSwitchModal] = useState(false);
  const { refetch } = useLoanAccountDetailHooks();

  const onCloseReleaseModal = () => {
    setOpenModal(false);
  };

  const onOpenReleaseModal = () => {
    setOpenModal(true);
  };

  const onCloseReleaseFormModal = () => {
    setOpenReleaseFormModal(false);
  };

  const onOpenReleaseFormModal = () => {
    setOpenReleaseFormModal(true);
  };

  const onCloseSwitchModal = () => {
    setOpenSwitchModal(false);
  };

  const onOpenSwitchModal = () => {
    setOpenSwitchModal(true);
  };

  const { mutateAsync: releaseCollateralMutation } = useReleaseCollateralMutation();

  const handelReleaseCollateral = () => {
    const values = getValues();

    const updatedValues = {
      ...values,
      loanAccountID: accountId,
      collateralID: collatDataList?.collateralID,
    };

    asyncToast({
      id: 'collat-release',
      msgs: {
        success: 'Collateral released succesfully',
        loading: 'Releasing Collateral',
      },
      onSuccess: () => {
        refetch();
        onCloseReleaseModal();
        onCloseReleaseFormModal();
      },
      promise: releaseCollateralMutation({
        data: updatedValues as LoanCollateralReleaseInput,
      }),
    });
  };

  const landCollatList = [
    {
      label: 'Owner Name',
      value: collatDataList?.ownerName,
    },
    {
      label: 'Relation with Owner',
      value: collatDataList?.relation,
    },
    {
      label: 'Sheet No.',
      value: collatDataList?.sheetNo,
    },
    {
      label: 'Kitta No.',
      value: collatDataList?.kittaNo,
    },
    {
      label: 'Area',
      value: collatDataList?.area,
    },
    {
      label: 'Valuation Method',
      value: collatDataList?.valuationMethod,
    },
    {
      label: 'Valuation Percent',
      value: collatDataList?.valuationPercent,
    },
    {
      label: 'Valuator',
      value: collatDataList?.valuatorId,
    },
    {
      label: 'FMV (Mximum Amount)',
      value: collatDataList?.fmvMaxAmount,
    },
    {
      label: 'DV (Minimum Amount)',
      value: collatDataList?.dvMinAmount,
    },
    {
      label: 'Collateral Valuation',
      value: collatDataList?.collaterallValuation,
    },
  ];

  const landAndBuildingCollatList = [
    {
      label: 'Owner Name',
      value: collatDataList?.ownerName,
    },
    {
      label: 'Relation with Owner',
      value: collatDataList?.relation,
    },
    {
      label: 'Sheet No.',
      value: collatDataList?.sheetNo,
    },
    {
      label: 'Kitta No.',
      value: collatDataList?.kittaNo,
    },
    {
      label: 'Area',
      value: collatDataList?.area,
    },
    {
      label: 'Plot No.',
      value: collatDataList?.plotNo,
    },
    {
      label: 'Valuation Method',
      value: collatDataList?.valuationMethod,
    },
    {
      label: 'Valuation Percent',
      value: collatDataList?.valuationPercent,
    },
    {
      label: 'Valuator',
      value: collatDataList?.valuatorId,
    },
    {
      label: 'FMV (Mximum Amount)',
      value: collatDataList?.fmvMaxAmount,
    },
    {
      label: 'DV (Minimum Amount)',
      value: collatDataList?.dvMinAmount,
    },
    {
      label: 'Collateral Valuation',
      value: collatDataList?.collaterallValuation,
    },
    {
      label: 'Building Type',
      value: collatDataList?.buildingType,
    },
    {
      label: 'Construction Type',
      value: collatDataList?.constructionType,
    },
    {
      label: 'No. of Storey',
      value: collatDataList?.noOfStorey,
    },
  ];

  const vehicleCollatList = [
    {
      label: 'Owner Name',
      value: collatDataList?.ownerName,
    },
    {
      label: 'Relation with Owner',
      value: collatDataList?.relation,
    },
    {
      label: 'Vehicle Name',
      value: collatDataList?.vehicleName,
    },
    {
      label: 'Model No.',
      value: collatDataList?.vehicleModelNo,
    },
    {
      label: 'Registration No.',
      value: collatDataList?.vehicleRegistrationNo,
    },
    {
      label: 'Vehicle No.',
      value: collatDataList?.vehicleNo,
    },
    {
      label: 'Seat Capacity',
      value: collatDataList?.vehicleSeatCapacity,
    },
    {
      label: 'Engine Capacity',
      value: collatDataList?.vehicleCapacity,
    },
    {
      label: 'Vehicle Type',
      value: collatDataList?.vehicleType,
    },
    // {
    //   label: 'Fund Type',
    //   value: collatDataList?.vehicleFuelType,
    // },
    {
      label: 'Depriciated Value',
      value: collatDataList?.allDocuments,
    },
    {
      label: 'Collateral Valuation',
      value: collatDataList?.collaterallValuation,
    },
    {
      label: 'Valuator',
      value: collatDataList?.valuatorId,
    },
    {
      label: 'Valuation Method',
      value: collatDataList?.valuationMethod,
    },
    {
      label: 'Valuation Percent',
      value: collatDataList?.valuationPercent,
    },
    {
      label: 'Collateral Valuation',
      value: collatDataList?.collaterallValuation,
    },
  ];

  const docCollatList = [
    {
      label: 'Document Name',
      value: collatDataList?.documentName,
    },
    {
      label: 'Valuator',
      value: collatDataList?.valuatorId,
    },
    {
      label: 'Valuation amount',
      value: collatDataList?.valuationAmount,
    },
    {
      label: 'Valuation Percent',
      value: collatDataList?.valuationPercent,
    },
    {
      label: 'Collateral Valuation',
      value: collatDataList?.collaterallValuation,
    },
  ];

  const othersCollatList = [
    {
      label: 'Collateral Name',
      value: collatDataList?.collateralType,
    },
    {
      label: 'Valuator',
      value: collatDataList?.valuatorId,
    },
    {
      label: 'Valuation amount',
      value: collatDataList?.valuationAmount,
    },
    {
      label: 'Valuation Percent',
      value: collatDataList?.valuationPercent,
    },
    {
      label: 'Collateral Valuation',
      value: collatDataList?.collaterallValuation,
    },
  ];

  return (
    <Box mb="s16">
      <Accordion defaultIndex={[0]} display="flex" flexDirection="column" gap="s16" allowToggle>
        <AccordionItem key={1}>
          <AccordionButton>
            <Box
              flex="1"
              display="flex"
              height="60px"
              px="s16"
              justifyContent="flex-start"
              gap="s8"
              alignItems="center"
            >
              <Box display="flex" flexDirection="column" gap="s4" textAlign="left">
                <Box display="flex" gap="s8" alignItems="center">
                  <Text fontSize="r1" color="gray.800" lineHeight="150%" fontWeight="SemiBold">
                    {collatDataList?.collateralType === 'Land' ||
                    collatDataList?.collateralType === 'Land and Building'
                      ? collatDataList?.ownerName
                      : collatDataList?.collateralType === 'Vehicle'
                      ? collatDataList?.vehicleName
                      : collatDataList?.collateralType === 'Documents'
                      ? collatDataList?.documentName
                      : 'N/A'}
                  </Text>
                  <Chips
                    variant="solid"
                    type="label"
                    size="sm"
                    theme={
                      collatDataList?.status === GuaranteeStatus.Released ? 'danger' : 'success'
                    }
                    label={collatDataList?.status}
                  />
                </Box>
                <Text fontSize="s3" color="gray.500" lineHeight="125%" fontWeight="Regular">
                  {collatDataList?.collateralType}
                </Text>
              </Box>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Box borderBottom="1px solid" borderBottomColor="border.layout" mb="s16">
              {collatDataList?.collateralType === 'Land' && (
                <AccordianListCardComponent accordionCardDetails={landCollatList} />
              )}
              {collatDataList?.collateralType === 'Land and Building' && (
                <AccordianListCardComponent accordionCardDetails={landAndBuildingCollatList} />
              )}
              {collatDataList?.collateralType === 'Vehicle' && (
                <AccordianListCardComponent accordionCardDetails={vehicleCollatList} />
              )}
              {collatDataList?.collateralType === 'Documents' && (
                <AccordianListCardComponent accordionCardDetails={docCollatList} />
              )}
              {collatDataList?.collateralType === 'Others' && (
                <AccordianListCardComponent accordionCardDetails={othersCollatList} />
              )}
              <Grid templateColumns="repeat(2,1fr)" gap="s20">
                {collatDataList?.documents?.map((docs) => (
                  <DocumentComponent keyText={docs?.id} value={docs?.url} />
                ))}
              </Grid>
            </Box>

            {collatDataList?.status !== GuaranteeStatus.Released && (
              <Button mr="s20" onClick={onOpenReleaseModal} leftIcon={<IoSendOutline />}>
                Release
              </Button>
            )}

            {collatDataList?.status !== GuaranteeStatus.Released && (
              <Button
                variant="ghost"
                onClick={onOpenSwitchModal}
                leftIcon={<HiOutlineSwitchHorizontal />}
              >
                Switch Collateral
              </Button>
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Modal
        open={openModal}
        onClose={onCloseReleaseModal}
        primaryButtonLabel="Confirm"
        secondaryButtonLabel="Cancel"
        primaryButtonHandler={onOpenReleaseFormModal}
        secondaryButtonHandler={onCloseReleaseModal}
        title="Release Collateral"
      >
        <FormProvider {...methods}>
          <Box display="flex" flexDir="column" gap="s16">
            <Text fontSize="r1" color="gray.800" lineHeight="20px" fontWeight="Regular">
              Your collateral will be realesed. Do you want to confirm?
            </Text>
          </Box>
        </FormProvider>
      </Modal>
      <Modal
        open={openReleaseFormModal}
        onClose={onCloseReleaseFormModal}
        primaryButtonLabel="Confirm"
        secondaryButtonLabel="Cancel"
        primaryButtonHandler={handelReleaseCollateral}
        secondaryButtonHandler={onCloseReleaseFormModal}
        title="Release Collateral"
      >
        <FormProvider {...methods}>
          <Box display="flex" flexDir="column" gap="s16">
            <FormFileInput multiple label="File Upload" name="files" />
            <FormTextArea label="Note" name="note" />
          </Box>
        </FormProvider>
      </Modal>
      <Modal
        open={openSwitchModal}
        onClose={onCloseSwitchModal}
        primaryButtonLabel="Confirm"
        secondaryButtonLabel="Cancel"
        primaryButtonHandler={() =>
          router.push(
            `${ROUTES.CBS_LOAN_ACCOUNTS_SWITCH_ADD}?id=${accountId}&collatId=${collatDataList?.collateralID}`
          )
        }
        secondaryButtonHandler={onCloseSwitchModal}
        title="Switch Collateral"
      >
        <FormProvider {...methods}>
          <Text fontSize="r1" color="gray.800" lineHeight="20px" fontWeight="Regular">
            All the details of the existing collateral will be lost and replaced by the new
            collateral. Do you want to continue switching this collateral with a new one?
          </Text>
        </FormProvider>
      </Modal>
    </Box>
  );
};
