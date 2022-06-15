import { useMemo } from 'react';
import { Text, Box, Divider, GridItem, Grid } from '@chakra-ui/react';
import { FormInput } from '@coop/myra/components';

export const KymEquityLiabilities = ({ watch }: any) => {
  const shareCapital = watch('shareCapital');
  const reserveAndSurplus = watch('reserveAndSurplus');
  const savingDeposit = watch('savingDeposit');
  const loanAccount = watch('loanAccount');
  const capitalGrant = watch('noncapitalGrant');
  const currentLiabilities = watch('currentLiabilities');
  const nonCurrentLiabilities = watch('nonCurrentLiabilities');

  const totalEquityAndLiabilities = useMemo(() => {
    return (
      Number(shareCapital) +
      Number(reserveAndSurplus) +
      Number(savingDeposit) +
      Number(loanAccount) +
      Number(capitalGrant) +
      Number(currentLiabilities) +
      Number(nonCurrentLiabilities)
    );
  }, [
    shareCapital,
    reserveAndSurplus,
    savingDeposit,
    loanAccount,
    capitalGrant,
    currentLiabilities,
    nonCurrentLiabilities,
  ]);

  console.log(totalEquityAndLiabilities);

  return (
    <Box display="flex" flexDirection="column">
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
            Equity and Liabilities
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
            Share Capital
          </Text>
        </GridItem>

        <GridItem>
          <FormInput
            isNumeric={true}
            textAlign="right"
            type="text"
            name="shareCapital"
            placeholder={0.0}
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
            Reserve and surplus
          </Text>
        </GridItem>

        <GridItem>
          <FormInput
            isNumeric={true}
            textAlign="right"
            type="text"
            name="reserveAndSurplus"
            placeholder={0.0}
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
            Saving/Deposit
          </Text>
        </GridItem>

        <GridItem>
          <FormInput
            isNumeric={true}
            textAlign="right"
            type="text"
            name="savingDeposit"
            placeholder={0.0}
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
            Loan Account (External Loan)
          </Text>
        </GridItem>

        <GridItem>
          <FormInput
            isNumeric={true}
            textAlign="right"
            type="text"
            name="loanAccount"
            placeholder={0.0}
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
            Capital Grant
          </Text>
        </GridItem>

        <GridItem>
          <FormInput
            isNumeric={true}
            textAlign="right"
            type="text"
            name="capitalGrant"
            placeholder={0.0}
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
            Current Liabilities and payable
          </Text>
        </GridItem>

        <GridItem>
          <FormInput
            isNumeric={true}
            textAlign="right"
            type="text"
            name="currentLiabilities"
            placeholder={0.0}
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
            Non-current liabilities
          </Text>
        </GridItem>

        <GridItem>
          <FormInput
            isNumeric={true}
            textAlign="right"
            type="text"
            name="nonCurrentLiabilities"
            placeholder={0.0}
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
            name="totalEquityAndLiabilities"
            value={
              totalEquityAndLiabilities === NaN
                ? 0.0
                : totalEquityAndLiabilities
            }
            placeholder={
              totalEquityAndLiabilities === NaN
                ? 0.0
                : totalEquityAndLiabilities
            }
          />
        </GridItem>
      </Grid>
    </Box>
  );
};
