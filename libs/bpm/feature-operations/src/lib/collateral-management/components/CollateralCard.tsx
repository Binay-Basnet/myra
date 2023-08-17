import React from 'react';
import { AiOutlineDown, AiOutlineSend, AiOutlineUp } from 'react-icons/ai';

import { Box, Button, Chips, Collapse, Grid, GridItem, Icon, Text } from '@myra-ui';

import { GuaranteeStatus, LoanAccountCollateral } from '@coop/cbs/data-access';

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
}) => {
  const { data, isRelease, releaseHandler } = props;

  const [isOpen, setIsOpen] = React.useState(true);

  /* eslint-disable react/destructuring-assignment */
  /* eslint-disable no-nested-ternary */
  return (
    <Box border="1px" borderColor="border.layout">
      <Box p="s16" display="flex" justifyContent="space-between" alignItems="cener" bg="gray.100">
        <Box>
          <Box display="flex">
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
                  <Text fontSize="r2">{Object.values(item)}</Text>
                  <Text fontSize="r2" fontWeight="medium">
                    {data?.[Object.keys(item) as unknown as keyof typeof data] || 'N/A'}
                  </Text>
                </Box>
              </GridItem>
            ))}
          {data?.collateralType === 'Land and Building' &&
            landAndBuildingDataItems?.map((item) => (
              <GridItem>
                <Box>
                  <Text fontSize="r2">{Object.values(item)}</Text>
                  <Text fontSize="r2" fontWeight="medium">
                    {data?.[Object.keys(item) as unknown as keyof typeof data] || 'N/A'}
                  </Text>
                </Box>
              </GridItem>
            ))}
          {data?.collateralType === 'Land' &&
            landDataItems?.map((item) => (
              <GridItem>
                <Box>
                  <Text fontSize="r2">{Object.values(item)}</Text>
                  <Text fontSize="r2" fontWeight="medium">
                    {data?.[Object.keys(item) as unknown as keyof typeof data] || 'N/A'}
                  </Text>
                </Box>
              </GridItem>
            ))}
          {data?.collateralType === 'Documents' &&
            documentsDataItems?.map((item) => (
              <GridItem>
                <Box>
                  <Text fontSize="r2">{Object.values(item)}</Text>
                  <Text fontSize="r2" fontWeight="medium">
                    {data?.[Object.keys(item) as unknown as keyof typeof data] || 'N/A'}
                  </Text>
                </Box>
              </GridItem>
            ))}
        </Grid>
      </Collapse>
      <Box padding="s16" display="flex" borderTop="1px" borderColor="border.layout">
        <Button
          leftIcon={<AiOutlineSend />}
          bg={isRelease ? 'gray.600' : 'primary'}
          onClick={() => releaseHandler(!isRelease)}
        >
          Release
        </Button>
      </Box>
    </Box>
  );
};

export default CollateralCard;
