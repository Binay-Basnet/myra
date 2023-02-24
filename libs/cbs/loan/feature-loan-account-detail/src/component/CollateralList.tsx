import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Grid,
  Modal,
  Text,
} from '@myra-ui';

import { LoanAccountCollateral } from '@coop/cbs/data-access';

import { AccordianListCardComponent } from './AccordianCard';
import { DocumentComponent } from './DocumentsCard';

type CollateralProps = {
  collatDataList: LoanAccountCollateral | null;
};

export const CollateralList = ({ collatDataList }: CollateralProps) => {
  const methods = useForm();
  const [openModal, setOpenModal] = useState(false);

  const onCloseModal = () => {
    setOpenModal(false);
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
    <Box>
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
                  {/* <Chips variant="solid" type="label" size="sm" theme="success" label="Active" /> */}
                </Box>
                <Text fontSize="s3" color="gray.500" lineHeight="125%" fontWeight="Regular">
                  {collatDataList?.collateralType}
                </Text>
              </Box>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
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
            {/* <Divider />
           <Box display="flex" w="50px" gap="s16" p="s16" onClick={() => setOpenModal(true)}>
              <IconButton
                colorScheme="transparent"
                aria-label="Release"
                icon={<IoTrash />}
                color="danger.500"
                size="sm"
              />
              <Button color="danger.500" variant="link">
                Release
              </Button>
            </Box> */}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Modal
        open={openModal}
        onClose={onCloseModal}
        primaryButtonLabel="Confirm"
        secondaryButtonLabel="Cancel"
        secondaryButtonHandler={onCloseModal}
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
    </Box>
  );
};
