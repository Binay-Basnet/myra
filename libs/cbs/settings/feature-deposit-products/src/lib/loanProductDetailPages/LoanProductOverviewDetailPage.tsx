import { DetailPageContentCard } from '@coop/cbs/settings/ui-layout';
import { Box, Text } from '@coop/shared/ui';

export function LoanProductOverviewDetailPage() {
  return (
    <Box display="flex" flexDirection="column" p="s16" gap="s16">
      <DetailPageContentCard header="loanProductGeneralInformation">
        <Box
          display="grid"
          gridTemplateColumns="repeat(2,1fr)"
          p="s16"
          gap="s20"
        >
          <Box display="flex" flexDirection="column" gap="s4">
            <Text
              color="neutralColorLight.Gray-70"
              fontWeight="Medium"
              fontSize="s3"
            >
              Product Name
            </Text>
            <Text
              color="neutralColorLight.Gray-80"
              fontWeight="SemiBold"
              fontSize="r1"
            >
              House Purchase Loan
            </Text>
          </Box>
          <Box display="flex" flexDirection="column" gap="s4">
            <Text
              color="neutralColorLight.Gray-70"
              fontWeight="Medium"
              fontSize="s3"
            >
              Product Type
            </Text>
            <Text
              color="neutralColorLight.Gray-80"
              fontWeight="SemiBold"
              fontSize="r1"
            >
              Assets Purchases and Maintanance Loan
            </Text>
          </Box>
          <Box display="flex" flexDirection="column" gap="s4">
            <Text
              color="neutralColorLight.Gray-70"
              fontWeight="Medium"
              fontSize="s3"
            >
              Product Subtype
            </Text>
            <Text
              color="neutralColorLight.Gray-80"
              fontWeight="SemiBold"
              fontSize="r1"
            >
              House Purchase Loan
            </Text>
          </Box>
          <Box display="flex" flexDirection="column" gap="s4">
            <Text
              color="neutralColorLight.Gray-70"
              fontWeight="Medium"
              fontSize="s3"
            >
              Nature of Loan Product
            </Text>
            <Text
              color="neutralColorLight.Gray-80"
              fontWeight="SemiBold"
              fontSize="r1"
            >
              Unproductive
            </Text>
          </Box>
        </Box>
      </DetailPageContentCard>

      <DetailPageContentCard header="loanProductDetailCriteria">
        <Box p="s16">
          <Box px="s16" display="grid" gridTemplateColumns="repeat(2,1fr)">
            <Box>
              <ul>
                <li>
                  <Text
                    fontSize="r1"
                    color="neutralColorLight.Gray-70"
                    fontWeight="Regular"
                  >
                    Minimum Age: <b>12</b>
                  </Text>
                </li>

                <li>
                  <Text
                    fontSize="r1"
                    color="neutralColorLight.Gray-70"
                    fontWeight="Regular"
                  >
                    Maximum Age: <b>35</b>
                  </Text>
                </li>

                <li>
                  <Text
                    fontSize="r1"
                    color="neutralColorLight.Gray-70"
                    fontWeight="Regular"
                  >
                    Gender: <b>Male, Female</b>
                  </Text>
                </li>

                <li>
                  <Text
                    fontSize="r1"
                    color="neutralColorLight.Gray-70"
                    fontWeight="Regular"
                  >
                    Marital Status: <b>Married</b>
                  </Text>
                </li>

                <li>
                  <Text
                    fontSize="r1"
                    color="neutralColorLight.Gray-70"
                    fontWeight="Regular"
                  >
                    Occupation Detail: <b>Business, Agriculture</b>
                  </Text>
                </li>

                <li>
                  <Text
                    fontSize="r1"
                    color="neutralColorLight.Gray-70"
                    fontWeight="Regular"
                  >
                    Education Qualification: <b>SEE</b>
                  </Text>
                </li>
              </ul>
            </Box>

            <Box>
              <ul>
                <li>
                  <Text
                    fontSize="r1"
                    color="neutralColorLight.Gray-70"
                    fontWeight="Regular"
                  >
                    Foreign Employment:
                    <Text
                      as="span"
                      fontSize="r1"
                      color="neutralColorLight.Gray-70"
                      fontWeight="Medium"
                    >
                      No
                    </Text>
                  </Text>
                </li>

                <li>
                  <Text
                    fontSize="r1"
                    color="neutralColorLight.Gray-70"
                    fontWeight="Regular"
                  >
                    Nature of Business (Institutions):{' '}
                    <Text
                      as="span"
                      fontSize="r1"
                      color="neutralColorLight.Gray-70"
                      fontWeight="Medium"
                    >
                      Club
                    </Text>
                  </Text>
                </li>

                <li>
                  <Text
                    fontSize="r1"
                    color="neutralColorLight.Gray-70"
                    fontWeight="Regular"
                  >
                    Nature of Business ( COOP Union): <b>Club</b>
                  </Text>
                </li>

                <li>
                  <Text
                    fontSize="r1"
                    color="neutralColorLight.Gray-70"
                    fontWeight="Regular"
                  >
                    Cooperative Type: <b>Saving & Loan</b>
                  </Text>
                </li>

                <li>
                  <Text
                    fontSize="r1"
                    color="neutralColorLight.Gray-70"
                    fontWeight="Regular"
                  >
                    Ethinicity: <b>Buddhist</b>
                  </Text>
                </li>
              </ul>
            </Box>
          </Box>
        </Box>
      </DetailPageContentCard>

      <DetailPageContentCard header="loanProductAdditionalFeatures">
        <Box
          display="grid"
          gridTemplateColumns="repeat(2,1fr)"
          p="s16"
          gap="s20"
        >
          <Box display="flex" flexDirection="column" gap="s4">
            <Text
              color="neutralColorLight.Gray-70"
              fontWeight="Medium"
              fontSize="s3"
            >
              Allow Partial Installment
            </Text>
            <Text
              color="neutralColorLight.Gray-80"
              fontWeight="SemiBold"
              fontSize="r1"
            >
              Yes
            </Text>
          </Box>
          <Box display="flex" flexDirection="column" gap="s4">
            <Text
              color="neutralColorLight.Gray-70"
              fontWeight="Medium"
              fontSize="s3"
            >
              Is Monthly Interest Compulsory
            </Text>
            <Text
              color="neutralColorLight.Gray-80"
              fontWeight="SemiBold"
              fontSize="r1"
            >
              Yes
            </Text>
          </Box>
          <Box display="flex" flexDirection="column" gap="s4">
            <Text
              color="neutralColorLight.Gray-70"
              fontWeight="Medium"
              fontSize="s3"
            >
              Insurance
            </Text>
            <Text
              color="neutralColorLight.Gray-80"
              fontWeight="SemiBold"
              fontSize="r1"
            >
              No
            </Text>
          </Box>
          <Box display="flex" flexDirection="column" gap="s4">
            <Text
              color="neutralColorLight.Gray-70"
              fontWeight="Medium"
              fontSize="s3"
            >
              Collateral
            </Text>
            <Text
              color="neutralColorLight.Gray-80"
              fontWeight="SemiBold"
              fontSize="r1"
            >
              No
            </Text>
          </Box>

          <Box display="flex" flexDirection="column" gap="s4">
            <Text
              color="neutralColorLight.Gray-70"
              fontWeight="Medium"
              fontSize="s3"
            >
              Staff Product
            </Text>
            <Text
              color="neutralColorLight.Gray-80"
              fontWeight="SemiBold"
              fontSize="r1"
            >
              Yes
            </Text>
          </Box>
          <Box display="flex" flexDirection="column" gap="s4">
            <Text
              color="neutralColorLight.Gray-70"
              fontWeight="Medium"
              fontSize="s3"
            >
              Support Multiple Account
            </Text>
            <Text
              color="neutralColorLight.Gray-80"
              fontWeight="SemiBold"
              fontSize="r1"
            >
              Yes
            </Text>
          </Box>
          <Box display="flex" flexDirection="column" gap="s4">
            <Text
              color="neutralColorLight.Gray-70"
              fontWeight="Medium"
              fontSize="s3"
            >
              Loan Schedule Change Override
            </Text>
            <Text
              color="neutralColorLight.Gray-80"
              fontWeight="SemiBold"
              fontSize="r1"
            >
              No
            </Text>
          </Box>
          <Box display="flex" flexDirection="column" gap="s4">
            <Text
              color="neutralColorLight.Gray-70"
              fontWeight="Medium"
              fontSize="s3"
            >
              Override Interest
            </Text>
            <Text
              color="neutralColorLight.Gray-80"
              fontWeight="SemiBold"
              fontSize="r1"
            >
              No
            </Text>
          </Box>
        </Box>
      </DetailPageContentCard>
    </Box>
  );
}

export default LoanProductOverviewDetailPage;