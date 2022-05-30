import React from 'react';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';

import {
  Text,
  Grid,
  Box,
  IconButton,
  Icon,
  Button,
  GridItem,
} from '../../../ui/src';

import { FormInput, FormSelect } from '../../newFormComponents';

export const MemberHushbandWifeOccupation = ({ control }) => {
  return (
    <>
      <Text fontSize="r1" fontWeight="SemiBold">
        MAIN OCCUPATION OF HUSHBAND/WIFE
      </Text>
      <br />
      <Box p={2} boxShadow="xs" borderRadius={5}>
        <Box
          p={4}
          display="flex"
          flexDirection="column"
          h={220}
          bg="gray.100"
          borderRadius={5}
        >
          <IconButton
            alignSelf="flex-end"
            variant="ghost"
            colorScheme="teal"
            aria-label="close"
            size="md"
            icon={<Icon size="md" as={AiOutlineClose} />}
          />
          <Grid templateColumns="repeat(3, 1fr)" gap={'2em'}>
            <GridItem colSpan={1}>
              <FormSelect
                control={control}
                name="hushbandWifeOccupation"
                label="Occupation"
                placeholder="Select Occupation"
                options={[
                  { label: 'Agriculture', value: 'agriculature' },
                  { label: 'Student', value: 'student' },
                ]}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <FormInput
                control={control}
                type="text"
                name="hushbandWifeOrgFirmName"
                label="Org/Frim Name"
                placeholder="Org/Firm Name"
              />
            </GridItem>

            <FormInput
              control={control}
              type="text"
              name="hushbandWifePanVatNo"
              label="Pan/Vat number"
              placeholder="Pan/Vat number"
            />
            <FormInput
              control={control}
              type="text"
              name="hushbandWifeOccupationAddress"
              label="Address"
              placeholder="Enter Address"
            />
            <FormInput
              control={control}
              type="number"
              name="hushbandWifeOccupationAnnualIncome"
              label="Annual Income"
              placeholder="0.00"
            />
          </Grid>
        </Box>
        <Button
          leftIcon={<Icon size="md" as={AiOutlinePlus} />}
          variant="outline"
          mt={2}
        >
          Add Occupation
        </Button>
      </Box>
    </>
  );
};
