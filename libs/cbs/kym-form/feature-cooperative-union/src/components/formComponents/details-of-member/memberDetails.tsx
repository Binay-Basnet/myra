import { useMemo } from 'react';
import { Box, Divider, Grid, GridItem, Text } from '@chakra-ui/react';
import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/myra/components';

export const KymMemberdetailsCOOP = ({ watch }: any) => {
  const malememberCurrent = watch('detailsOfMember.noOfMaleMemberCurrent');
  const maleMemberTarget = watch('detailsOfMember.noOfMaleMemberTarget');
  const femalememberCurrent = watch('detailsOfMember.noOfFemaleMemberCurrent');
  const femaleTarget = watch('detailsOfMember.noOfFemaleMemberTarget');
  const institutionalmemberCurrent = watch(
    'detailsOfMember.noOfInstituionalMemberCurrent'
  );
  const institutionalMemberTarget = watch(
    'detailsOfMember.noOfInstituionalMemberTarget'
  );

  const totalmembersCurrent =
    Number(malememberCurrent) +
    Number(femalememberCurrent) +
    Number(institutionalmemberCurrent);

  const totalmembersTarget =
    Number(maleMemberTarget) +
    Number(femaleTarget) +
    Number(institutionalMemberTarget);

  return (
    <Box
      display="flex"
      flexDirection="column"
      id="Current Members"
      scrollMarginTop="200px"
    >
      <Grid
        columnGap={40}
        alignItems="center"
        px="s14"
        templateColumns="repeat(3,1fr)"
      >
        <GridItem>
          <Text
            mb="s16"
            color="neutralColorLight.Gray-80"
            fontSize="s3"
            fontWeight="SemiBold"
          >
            Member Details
          </Text>
        </GridItem>

        <GridItem>
          <Text
            mb="s16"
            color="neutralColorLight.Gray-80"
            fontSize="s3"
            fontWeight="SemiBold"
          >
            Current
          </Text>
        </GridItem>

        <GridItem>
          <Text
            mb="s16"
            color="neutralColorLight.Gray-80"
            fontSize="s3"
            fontWeight="SemiBold"
          >
            Target for next fiscal year
          </Text>
        </GridItem>
      </Grid>

      <Divider />

      <Grid
        alignItems="center"
        px="s8"
        py="s12"
        templateColumns="repeat(3,1fr)"
        gap="s40"
      >
        <GridItem>
          <Text
            color="neutralColorLight.Gray-80"
            fontSize="s3"
            fontWeight="Regular"
          >
            No. of Male members
          </Text>
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="right"
            type="number"
            name="detailsOfMember.noOfMaleMemberCurrent"
            placeholder="Enter No. of Male Members"
          />
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="right"
            type="number"
            name="detailsOfMember.noOfMaleMemberTarget"
            placeholder="Enter No. of Male Members"
          />
        </GridItem>
      </Grid>
      <Divider />
      <Grid
        alignItems="center"
        px="s8"
        py="s12"
        templateColumns="repeat(3,1fr)"
        gap="s40"
      >
        <GridItem>
          <Text
            color="neutralColorLight.Gray-80"
            fontSize="s3"
            fontWeight="Regular"
          >
            No. of Female members
          </Text>
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="right"
            type="number"
            name="detailsOfMember.noOfFemaleMemberCurrent"
            placeholder="Enter No. of Female Members"
          />
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="right"
            type="number"
            name="detailsOfMember.noOfFemaleMemberTarget"
            placeholder="Enter No. of Female Members"
          />
        </GridItem>
      </Grid>
      <Divider />
      <Grid
        alignItems="center"
        px="s8"
        py="s12"
        templateColumns="repeat(3,1fr)"
        gap="s40"
      >
        <GridItem>
          <Text
            color="neutralColorLight.Gray-80"
            fontSize="s3"
            fontWeight="Regular"
          >
            No. of Institutional members
          </Text>
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="right"
            type="number"
            name="detailsOfMember.noOfInstituionalMemberCurrent"
            placeholder="Enter No. of institutional members"
          />
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="right"
            type="number"
            name="detailsOfMember.noOfInstituionalMemberTarget"
            placeholder="Enter No. of institutional members"
          />
        </GridItem>
      </Grid>
      <Divider />
      {/* .................................last part ............................... */}
      <Grid
        alignItems="center"
        px="14px"
        py="s16"
        templateColumns="repeat(3,1fr)"
        gap="s40"
      >
        <GridItem>
          <Text
            mb="s16"
            color="neutralColorLight.Gray-80"
            fontSize="s3"
            fontWeight="SemiBold"
          >
            Total Current Members
          </Text>
        </GridItem>

        <GridItem>
          <FormInput
            isDisabled={true}
            bg="neutralColorLight.Gray-20"
            border="1px solid"
            borderColor="disabled.disabled"
            textAlign="right"
            type="text"
            name="totalAssetsCurrent"
            value={isNaN(totalmembersCurrent) ? '-' : totalmembersCurrent}
            placeholder="Total assets"
          />
        </GridItem>
        <GridItem>
          <FormInput
            isDisabled={true}
            bg="neutralColorLight.Gray-20"
            border="1px solid"
            borderColor="disabled.disabled"
            textAlign="right"
            type="text"
            name="totalAssetsTarget"
            value={isNaN(totalmembersTarget) ? '-' : totalmembersTarget}
            placeholder="Total "
          />
        </GridItem>
      </Grid>
    </Box>
  );
};
