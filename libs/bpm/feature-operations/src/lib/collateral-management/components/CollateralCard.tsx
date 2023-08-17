import React, { useState } from 'react';
import { AiOutlineDown, AiOutlineSend, AiOutlineUp } from 'react-icons/ai';
import { IoSwapHorizontal } from 'react-icons/io5';

import { Box, Button, Chips, Collapse, FileViewer, Grid, GridItem, Icon, Text } from '@myra-ui';

import { GuaranteeStatus, LoanAccountCollateral } from '@coop/cbs/data-access';

import NewCollateralModal from './NewCollateralModal';
import {
  documentsDataItems,
  landAndBuildingDataItems,
  landDataItems,
  vehicleDataItems,
} from '../constants/collateralConstant';

export const CollateralCard = (props: {
  data?: LoanAccountCollateral;
  isRelease?: boolean;
  releaseHandler?: (value: boolean) => void;
  isSwitch?: boolean;
  switchHandler?: (value: boolean) => void;
}) => {
  const [isCollateralModalOpen, setIsCollateralModalOpen] = useState(false);
  const { data, isRelease, releaseHandler, isSwitch, switchHandler } = props;

  const [isOpen, setIsOpen] = React.useState(true);

  const handleCloseCollateralModal = () => {
    setIsCollateralModalOpen(false);
  };

  /* eslint-disable react/destructuring-assignment */
  /* eslint-disable no-nested-ternary */
  return (
    <>
      <Box border="1px" borderColor="border.layout">
        <Box p="s16" display="flex" justifyContent="space-between" alignItems="cener" bg="gray.100">
          <Box>
            <Box display="flex" alignItems="center" gap="s4">
              <Text fontSize="r1" fontWeight="medium">
                {data?.collateralType === 'Vehicle'
                  ? data?.vehicleName
                  : data?.collateralType === 'Documents'
                  ? data?.documentName
                  : data?.ownerName}
              </Text>
              {data?.status && (
                <Chips
                  variant="solid"
                  type="label"
                  size="sm"
                  theme={data?.status === GuaranteeStatus.Released ? 'danger' : 'success'}
                  label={data?.status}
                />
              )}
            </Box>
            <Text fontSize="s3" color="gray.400">
              {data?.collateralType}
            </Text>
          </Box>
          <Icon
            as={isOpen ? AiOutlineUp : AiOutlineDown}
            onClick={() => setIsOpen(!isOpen)}
            color="gray.500"
            size="sm"
          />
        </Box>
        <Collapse in={isOpen}>
          <Grid templateColumns="repeat(4, 1fr)" gap="s16" p="s16">
            {data?.collateralType === 'Vehicle' &&
              vehicleDataItems?.map((item) => (
                <GridItem>
                  <Box>
                    <Text fontSize="r1">{Object.values(item)}</Text>
                    <Text fontSize="r1" fontWeight="medium">
                      {data?.[Object.keys(item) as unknown as keyof typeof data] || 'N/A'}
                    </Text>
                  </Box>
                </GridItem>
              ))}
            {data?.collateralType === 'Land and Building' &&
              landAndBuildingDataItems?.map((item) => (
                <GridItem>
                  <Box>
                    <Text fontSize="r1">{Object.values(item)}</Text>
                    <Text fontSize="r1" fontWeight="medium">
                      {data?.[Object.keys(item) as unknown as keyof typeof data] || 'N/A'}
                    </Text>
                  </Box>
                </GridItem>
              ))}
            {data?.collateralType === 'Land' &&
              landDataItems?.map((item) => (
                <GridItem>
                  <Box>
                    <Text fontSize="r1">{Object.values(item)}</Text>
                    <Text fontSize="r1" fontWeight="medium">
                      {data?.[Object.keys(item) as unknown as keyof typeof data] || 'N/A'}
                    </Text>
                  </Box>
                </GridItem>
              ))}
            {data?.collateralType === 'Documents' &&
              documentsDataItems?.map((item) => (
                <GridItem>
                  <Box>
                    <Text fontSize="r1">{Object.values(item)}</Text>
                    <Text fontSize="r1" fontWeight="medium">
                      {data?.[Object.keys(item) as unknown as keyof typeof data] || 'N/A'}
                    </Text>
                  </Box>
                </GridItem>
              ))}
          </Grid>
          <Grid templateColumns="repeat(4, 1fr)" gap="s16" p="s16">
            {data?.documents?.map((docs) => (
              <GridItem colSpan={2}>
                <FileViewer fileName={docs?.id} fileUrl={docs?.url} />
              </GridItem>
            ))}
          </Grid>
        </Collapse>
        <Box padding="s16" display="flex" borderTop="1px" borderColor="border.layout">
          <Box display="flex" gap="s16">
            <Button
              leftIcon={<AiOutlineSend />}
              bg={isRelease ? 'gray.600' : 'primary'}
              onClick={() => {
                releaseHandler(!isRelease);
                switchHandler(false);
              }}
            >
              Release
            </Button>
            <Button
              variant="ghost"
              leftIcon={<IoSwapHorizontal />}
              color={isSwitch ? 'gray.600' : 'primary'}
              onClick={() => {
                switchHandler(!isSwitch);
                releaseHandler(false);
                setIsCollateralModalOpen(true);
              }}
            >
              Switch Collateral
            </Button>
          </Box>
        </Box>
      </Box>
      <NewCollateralModal
        isCollateralModalOpen={isCollateralModalOpen}
        handleCloseCollateralModal={handleCloseCollateralModal}
      />
    </>
  );
};

export default CollateralCard;
