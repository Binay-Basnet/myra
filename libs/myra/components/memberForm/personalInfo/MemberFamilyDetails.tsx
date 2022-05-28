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

import { FormInput } from '../../newFormComponents';

export const MemberFamilyDetails = ({ control }) => {
  return (
    <>
      <Text fontSize="s3">Family members</Text>
      <Box h={190} p={2} boxShadow="xs">
        <Box
          p={4}
          display="flex"
          flexDirection="column"
          h={130}
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
          <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
            <GridItem colSpan={1}>
              <FormInput
                control={control}
                type="text"
                name="familyMemberRelation"
                label="Relation"
                placeholder="Enter Relation"
              />
            </GridItem>
            <GridItem colSpan={2}>
              <FormInput
                control={control}
                type="text"
                name="familyMemberFullName"
                label="FullName"
                placeholder="Enter Fullname"
              />
            </GridItem>
          </Grid>
        </Box>
        <Button
          leftIcon={<Icon size="md" as={AiOutlinePlus} />}
          variant="outline"
          mt={2}
        >
          Add Family Member
        </Button>
      </Box>
    </>
  );
};
