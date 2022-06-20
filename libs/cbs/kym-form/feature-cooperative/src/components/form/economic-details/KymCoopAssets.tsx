import { Box, Divider, Grid, GridItem, Text } from '@chakra-ui/react';
import { FormInput } from '@coop/shared/form';

export const KymCoopAssets = ({ watch }: any) => {
  const cashEquivalent = watch('cashAndCashEquivalent');
  const bank = watch('bank');
  const investments = watch('investments');
  const loan = watch('loan');
  const currentAssets = watch('nonCurrentAssets');
  const nonCurrentAssets = watch('otherNonCurrentAssets');

  const totalAssets =
    Number(cashEquivalent) +
    Number(bank) +
    Number(investments) +
    Number(loan) +
    Number(currentAssets) +
    Number(nonCurrentAssets);

  return (
    <Box id="Assets" display="flex" flexDirection="column">
      <Grid
        columnGap={40}
        alignItems="center"
        px="s14"
        templateColumns="repeat(2,1fr)"
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
            Amount
          </Text>
        </GridItem>
      </Grid>

      <Divider />

      <Grid
        alignItems="center"
        px="s8"
        py="s12"
        templateColumns="repeat(2,1fr)"
        columnGap={40}
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
            name="cashAndCashEquivalent"
            placeholder="0.00"
          />
        </GridItem>
      </Grid>

      <Grid
        alignItems="center"
        px="s8"
        py="s12"
        templateColumns="repeat(2,1fr)"
        columnGap={40}
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
            type="text"
            name="bank"
            placeholder="0.00"
          />
        </GridItem>
      </Grid>

      <Grid
        alignItems="center"
        px="s8"
        py="s12"
        templateColumns="repeat(2,1fr)"
        columnGap={40}
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
            name="investments"
            placeholder="0.00"
          />
        </GridItem>
      </Grid>

      <Grid
        alignItems="center"
        px="s8"
        py="s12"
        templateColumns="repeat(2,1fr)"
        columnGap={40}
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
            type="text"
            name="loan"
            placeholder="0.00"
          />
        </GridItem>
      </Grid>

      <Grid
        alignItems="center"
        px="s8"
        py="s12"
        templateColumns="repeat(2,1fr)"
        columnGap={40}
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
            type="text"
            name="nonCurrentAssets"
            placeholder="0.00"
          />
        </GridItem>
      </Grid>

      <Grid
        alignItems="center"
        px="s8"
        py="s12"
        templateColumns="repeat(2,1fr)"
        columnGap={40}
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
            type="text"
            name="otherNonCurrentAssets"
            placeholder="0.00"
          />
        </GridItem>
      </Grid>

      <Divider />

      <Grid
        alignItems="center"
        px="14px"
        py="s16"
        templateColumns="repeat(2,1fr)"
        columnGap={40}
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
            name="totalAssets"
            value={isNaN(totalAssets) ? '0.00' : totalAssets}
            placeholder="Total assets"
          />
        </GridItem>
      </Grid>
    </Box>
  );
};
