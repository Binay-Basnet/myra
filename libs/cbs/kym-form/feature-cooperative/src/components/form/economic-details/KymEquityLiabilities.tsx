import { Box, Divider, Grid, GridItem, Text } from '@chakra-ui/react';
import { FormInput } from '@coop/shared/form';

export const KymEquityLiabilities = ({ watch }: any) => {
  const shareCapital = watch('shareCapital');
  const reserveAndSurplus = watch('reserveAndSurplus');
  const savingDeposit = watch('savingDeposit');
  const loanAccount = watch('loanAccount');
  const capitalGrant = watch('capitalGrant');
  const currentLiabilities = watch('currentLiabilities');
  const nonCurrentLiabilities = watch('nonCurrentLiabilities');

  const totalEquityAndLiabilities =
    Number(shareCapital) +
    Number(reserveAndSurplus) +
    Number(savingDeposit) +
    Number(loanAccount) +
    Number(capitalGrant) +
    Number(currentLiabilities) +
    Number(nonCurrentLiabilities);

  return (
    <Box id="Equity and Liabilities" display="flex" flexDirection="column">
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
            textAlign="right"
            type="text"
            name="shareCapital"
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
            Reserve and surplus
          </Text>
        </GridItem>

        <GridItem>
          <FormInput
            textAlign="right"
            type="text"
            name="reserveAndSurplus"
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
            Saving/Deposit
          </Text>
        </GridItem>

        <GridItem>
          <FormInput
            textAlign="right"
            type="text"
            name="savingDeposit"
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
            Loan Account (External Loan)
          </Text>
        </GridItem>

        <GridItem>
          <FormInput
            textAlign="right"
            type="text"
            name="loanAccount"
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
            Capital Grant
          </Text>
        </GridItem>

        <GridItem>
          <FormInput
            textAlign="right"
            type="text"
            name="capitalGrant"
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
            Current Liabilities and payable
          </Text>
        </GridItem>

        <GridItem>
          <FormInput
            textAlign="right"
            type="text"
            name="currentLiabilities"
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
            Non-current liabilities
          </Text>
        </GridItem>

        <GridItem>
          <FormInput
            textAlign="right"
            type="text"
            name="nonCurrentLiabilities"
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
            name="totalEquityAndLiabilities"
            value={
              isNaN(totalEquityAndLiabilities)
                ? '0.00'
                : totalEquityAndLiabilities
            }
            placeholder="Enter Total Equity and liabilities"
          />
        </GridItem>
      </Grid>
    </Box>
  );
};
