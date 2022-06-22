import { useMemo } from 'react';
import { Box, Divider, Grid, GridItem, Text } from '@chakra-ui/react';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const KymMemberdetailsCOOP = ({ watch }: any) => {
  const { t } = useTranslation();
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
            {t['kymCoopUnionRepMemberDetails']}
          </Text>
        </GridItem>

        <GridItem>
          <Text
            mb="s16"
            color="neutralColorLight.Gray-80"
            fontSize="s3"
            fontWeight="SemiBold"
          >
            {t['kymCoopUnionRepCurrent']}
          </Text>
        </GridItem>

        <GridItem>
          <Text
            mb="s16"
            color="neutralColorLight.Gray-80"
            fontSize="s3"
            fontWeight="SemiBold"
          >
            {t['kymCoopUnionRepTarget']}
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
            {t['kymCoopUnionRepNoofMaleMembers']}
          </Text>
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="left"
            type="number"
            name="detailsOfMember.noOfMaleMemberCurrent"
            placeholder={t['kymCoopUnionRepEnterNofMaleMembers']}
            defaultValue={0}
          />
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="left"
            type="number"
            name="detailsOfMember.noOfMaleMemberTarget"
            placeholder={t['kymCoopUnionRepEnterNofMaleMembers']}
            defaultValue={0}
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
            {t['kymCoopUnionRepNoofFemaleMembers']}
          </Text>
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="left"
            type="number"
            name="detailsOfMember.noOfFemaleMemberCurrent"
            placeholder={t['kymCoopUnionRepEnterNoofFemaleMembers']}
            defaultValue={0}
          />
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="left"
            type="number"
            name="detailsOfMember.noOfFemaleMemberTarget"
            placeholder={t['kymCoopUnionRepEnterNoofFemaleMembers']}
            defaultValue={0}
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
            {t['kymCoopUnionRepNoofInstitutionalMembers']}
          </Text>
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="left"
            type="number"
            name="detailsOfMember.noOfInstituionalMemberCurrent"
            placeholder={t['kymCoopUnionRepEnterNoOfInstitutionalMembers']}
            defaultValue={0}
          />
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="left"
            type="number"
            name="detailsOfMember.noOfInstituionalMemberTarget"
            placeholder={t['kymCoopUnionRepEnterNoOfInstitutionalMembers']}
            defaultValue={0}
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
            {t['kymCoopUnionRepTotalCurrentMembers']}
          </Text>
        </GridItem>

        <GridItem>
          <FormInput
            isDisabled={true}
            bg="neutralColorLight.Gray-20"
            border="1px solid"
            borderColor="disabled.disabled"
            textAlign="left"
            type="text"
            name="totalAssetsCurrent"
            value={isNaN(totalmembersCurrent) ? '-' : totalmembersCurrent}
            placeholder={t['kymCoopUnionRepTotalAssets']}
          />
        </GridItem>
        <GridItem>
          <FormInput
            isDisabled={true}
            bg="neutralColorLight.Gray-20"
            border="1px solid"
            borderColor="disabled.disabled"
            textAlign="left"
            type="text"
            name="totalAssetsTarget"
            value={isNaN(totalmembersTarget) ? '-' : totalmembersTarget}
            placeholder={t['kymCoopUnionRepTotal']}
          />
        </GridItem>
      </Grid>
    </Box>
  );
};
