import { useMemo } from 'react';
import { Box, Divider, Grid, GridItem, Text } from '@chakra-ui/react';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/myra/components';

export const KymAssestsAndtarget = ({ watch }: any) => {
  const cashCurrent = watch('cashAndCashEquivalentCurrent');
  const cashCurrent2 = isNaN(cashCurrent) == true ? 0 : cashCurrent;
  const bankCurrent = watch('bankCurrent');
  const bankCurrent2 = isNaN(bankCurrent) == true ? 0 : bankCurrent;
  const investemntCurrent = watch('investmentsCurrent');
  const investmentCurrent2 =
    isNaN(investemntCurrent) == true ? 0 : investemntCurrent;
  const loanCurrent = watch('loanCurrent');
  const loanCurrent2 = isNaN(loanCurrent) == true ? 0 : loanCurrent;
  const nonCurrentAssetsCurrent = watch('nonCurrentAssetsCurrent');
  const nonCurrentAssetsCurrent2 =
    isNaN(nonCurrentAssetsCurrent) === true ? 0 : nonCurrentAssetsCurrent;
  const otherNonCurrentAssetsCurrent = watch('otherNonCurrentAssetsCurrent');
  const otherNonCurrentAssetsCurrent2 =
    isNaN(otherNonCurrentAssetsCurrent) === true
      ? 0
      : otherNonCurrentAssetsCurrent;

  const totalassestscurrent =
    Number(cashCurrent2) +
    Number(bankCurrent2) +
    Number(investmentCurrent2) +
    Number(loanCurrent2) +
    Number(nonCurrentAssetsCurrent2) +
    Number(otherNonCurrentAssetsCurrent2);

  const cashTarget = isNaN(watch('cashAndCashEquivalentTarget'))
    ? 0
    : watch('cashAndCashEquivalentTarget');
  const bankTarget = isNaN(watch('bankTarget')) ? 0 : watch('bankTarget');
  const investmentsTarget = isNaN(watch('investmentsTarget'))
    ? 0
    : watch('investmentsTarget');
  const loanTarget = isNaN(watch('loanTarget')) ? 0 : watch('loanTarget');
  const currentAssetsTarget = isNaN(watch('nonCurrentAssetsTarget'))
    ? 0
    : watch('nonCurrentAssetsTarget');
  const nonCurrentAssetsTarget = isNaN(watch('otherNonCurrentAssetsTarget'))
    ? 0
    : watch('otherNonCurrentAssetsTarget');

  const totalassestsTARGET =
    Number(cashTarget) +
    Number(bankTarget) +
    Number(investmentsTarget) +
    Number(loanTarget) +
    Number(currentAssetsTarget) +
    Number(nonCurrentAssetsTarget);

  return (
    <Box
      display="flex"
      flexDirection="column"
      id="Assets"
      scrollMarginTop={'200px'}
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
            Assets
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
            Cash and cash equivalents
          </Text>
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="right"
            type="number"
            name="cashAndCashEquivalentCurrent"
            placeholder="0.00"
          />
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="right"
            type="number"
            name="cashAndCashEquivalentTarget"
            placeholder="0.00"
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
            Bank
          </Text>
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="right"
            type="number"
            name="bankCurrent"
            placeholder="0.00"
          />
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="right"
            type="number"
            name="bankTarget"
            placeholder="0.00"
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
            Investments
          </Text>
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="right"
            type="number"
            name="investmentsCurrent"
            placeholder="0.00"
          />
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="right"
            type="number"
            name="investmentsTarget"
            placeholder="0.00"
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
            Loan (investment)
          </Text>
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="right"
            type="number"
            name="loanCurrent"
            placeholder="0.00"
          />
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="right"
            type="number"
            name="loanTarget"
            placeholder="0.00"
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
            Non current assets
          </Text>
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="right"
            type="number"
            name="nonCurrentAssetsCurrent"
            placeholder="0.00"
          />
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="right"
            type="number"
            name="nonCurrentAssetsTarget"
            placeholder="0.00"
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
            other non current assets
          </Text>
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="right"
            type="number"
            name="otherNonCurrentAssetsCurrent"
            placeholder="0.00"
          />
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="right"
            type="number"
            name="otherNonCurrentAssetsTarget"
            placeholder="0.00"
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
            Total
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
            value={totalassestscurrent}
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
            value={totalassestsTARGET}
            placeholder="Total "
          />
        </GridItem>
      </Grid>
    </Box>
  );
};
