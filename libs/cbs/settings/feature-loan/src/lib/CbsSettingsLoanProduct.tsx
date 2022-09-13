import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { AddIcon } from '@chakra-ui/icons';

import {
  Id_Type,
  LoanProductSubType,
  LoanProductType,
  useGetLoanProductListQuery,
  useGetNewIdMutation,
} from '@coop/cbs/data-access';
import { ActionPopoverComponent } from '@coop/myra/components';
import { Column, Table } from '@coop/shared/table';
import { Box, Button, DEFAULT_PAGE_SIZE, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const SettingsLoanProduct = () => {
  const router = useRouter();

  const { t } = useTranslation();

  const newId = useGetNewIdMutation();

  const { data, isLoading } = useGetLoanProductListQuery(
    router.query['before']
      ? {
          paginate: {
            last: Number(router.query['last'] ?? DEFAULT_PAGE_SIZE),
            before: router.query['before'] as string,
          },
        }
      : {
          paginate: {
            first: Number(router.query['first'] ?? DEFAULT_PAGE_SIZE),
            after: (router.query['after'] ?? '') as string,
          },
        },
    {
      staleTime: 0,
    }
  );

  const rowData = useMemo(() => data?.settings?.general?.loanProducts?.list?.edges ?? [], [data]);

  const popoverTitle = [
    {
      title: 'edit',
      onClick: (id: string) => router.push(`/settings/general/loan-products/edit/${id}`),
    },
  ];

  const productTypes = (data: LoanProductType) => {
    switch (data) {
      case LoanProductType.Agriculture:
        return t['loanProductAgriculture'];
      case LoanProductType.AlternativeEnergy:
        return t['loanProductAlternativeEnergy'];
      case LoanProductType.AssetsPurchasesAndMaintenance:
        return t['loanProductAssetsPurchasesAndMaintenance'];
      case LoanProductType.Business:
        return t['loanProductTypeBusiness'];
      case LoanProductType.CreditUnion:
        return t['loanProductCreditUnion'];
      case LoanProductType.Educational:
        return t['loanProductEducational'];
      case LoanProductType.ForeignEmployee:
        return t['loanProductForeignEmployee'];
      case LoanProductType.HirePurchase:
        return t['loanProductHirePurchase'];
      case LoanProductType.Industrial:
        return t['loanProductTypeIndustrial'];
      case LoanProductType.MicroEntrepreneur:
        return t['loanProductMicroEntrepreneur'];
      case LoanProductType.SocialSector:
        return t['loanProductSocialSector'];
      case LoanProductType.Staff:
        return t['loanProductStaff'];
      default:
        return '-';
    }
  };

  const productSubTypes = (data: LoanProductSubType) => {
    switch (data) {
      case LoanProductSubType.AgricultureBusiness:
        return t['agricultureBusiness'];
      case LoanProductSubType.BigIndustrial:
        return t['bigIndustrial'];
      case LoanProductSubType.BioGas:
        return t['bioGas'];
      case LoanProductSubType.BusinessLineOfCredit:
        return t['businessLineOfCredit'];
      case LoanProductSubType.HandicraftPromotional:
        return t['handicraftPromotional'];
      case LoanProductSubType.SmallIndustrial:
        return t['smallIndustrial'];
      case LoanProductSubType.SmallAndMediumEnterprises:
        return t['smallAndMediumEnterprises'];
      case LoanProductSubType.LivestockBusiness:
        return t['livestockBusiness'];
      case LoanProductSubType.ConsumerGoodsBusiness:
        return t['consumerGoodsBusiness'];
      case LoanProductSubType.MicroEntrepreneur:
        return t['microEntrepreneur'];
      case LoanProductSubType.ConstructionEquipmentBusiness:
        return t['constructionEquipmentBusiness'];
      case LoanProductSubType.LandAndBuildingBusiness:
        return t['landAndBuildingBusiness'];

      case LoanProductSubType.StationaryBusiness:
        return t['stationaryBusiness'];
      case LoanProductSubType.ServiceBusiness:
        return t['serviceBusiness'];
      case LoanProductSubType.FruitsAndHorticulture:
        return t['fruitsAndHorticulture'];
      case LoanProductSubType.VegetableAndSeasonalFarming:
        return t['vegetableAndSeasonalFarming'];
      case LoanProductSubType.SpiceProduction:
        return t['spiceProduction'];
      case LoanProductSubType.CashCropsFraming:
        return t['cashCropsFraming'];
      case LoanProductSubType.Livestock:
        return t['livestock'];
      case LoanProductSubType.PoultryFarming:
        return t['poultryFarming'];
      case LoanProductSubType.HoneyBeeFarming:
        return t['honeyBeeFarming'];
      case LoanProductSubType.HigherEducation:
        return t['higherEducation'];
      case LoanProductSubType.TechnicalEducation:
        return t['technicalEducation'];
      case LoanProductSubType.ForeignEducation:
        return t['foreignEducation'];

      case LoanProductSubType.HomeConstructionAndMaintenance:
        return t['homeConstructionAndMaintenance'];
      case LoanProductSubType.HousePurchase:
        return t['housePurchase'];
      case LoanProductSubType.LandPurchase:
        return t['landPurchase'];
      case LoanProductSubType.HomeAppliance:
        return t['homeAppliance'];
      case LoanProductSubType.SocialWork:
        return t['socialWork'];
      case LoanProductSubType.ReligiousWork:
        return t['religiousWork'];
      case LoanProductSubType.HomeExpenses:
        return t['homeExpenses'];
      case LoanProductSubType.Emergency:
        return t['emergency'];
      case LoanProductSubType.ForeignEmployeeWorkingVisa:
        return t['foreignEmployeeWorkingVisa'];
      case LoanProductSubType.ForeignEmployeeDependentVisa:
        return t['foreignEmployeeDependentVisa'];
      case LoanProductSubType.SolarEnergy:
        return t['solarEnergy'];
      case LoanProductSubType.YouthSelfEmployment:
        return t['youthSelfEmployment'];

      case LoanProductSubType.MicroEntrepreneurGroup:
        return t['microEntrepreneurGroup'];
      case LoanProductSubType.HirePurchaseLoan_2Wheeler:
        return t['hirePurchaseLoan_2Wheeler'];
      case LoanProductSubType.HirePurchaseLoan_4Wheeler:
        return t['hirePurchaseLoan_4Wheeler'];
      case LoanProductSubType.HirePurchaseLoanHeavyEquipment:
        return t['hirePurchaseLoanHeavyEquipment'];
      case LoanProductSubType.StaffLandAndBuilding:
        return t['staffLandAndBuilding'];
      case LoanProductSubType.StaffHirepurchase:
        return t['staffHirepurchase'];
      case LoanProductSubType.StaffPersonal:
        return t['staffPersonal'];
      case LoanProductSubType.LiquidityManagement:
        return t['liquidityManagement'];
      case LoanProductSubType.ShortTerm:
        return t['shortTerm'];
      case LoanProductSubType.CooperativePromotion:
        return t['cooperativePromotion'];
      case LoanProductSubType.MicroEnterprisePromotion:
        return t['microEnterprisePromotion'];
      case LoanProductSubType.LineOfCredit:
        return t['lineOfCredit'];
      default:
        return '-';
    }
  };

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: t['loanProductsProductCode'],
        accessorFn: (row) => row?.node.productCodeString,
      },

      {
        header: t['loanProductsProductName'],
        accessorFn: (row) => row?.node.productName,
        cell: (props) => (
          <Box
            display="flex"
            alignItems="center"
            cursor="pointer"
            gap="s12"
            onClick={() => {
              router.push('/settings/general/loan-products/detail/12123/overview');
            }}
          >
            <Text
              fontSize="s3"
              textTransform="capitalize"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              {props.getValue() as string}
            </Text>
          </Box>
        ),
      },
      {
        header: t['loanProductsProductType'],
        accessorFn: (row) => row?.node.productType,
        cell: (props) => productTypes(props?.row?.original?.node?.productType),
      },
      {
        header: t['loanProductsProductSubType'],
        accessorFn: (row) => row?.node.productSubType,
        cell: (props) => productSubTypes(props?.row?.original?.node?.productSubType),
      },
      {
        header: t['loanProductsInterest'],
        accessorFn: (row) => row?.node.interest?.defaultRate,
        cell: (props) => <span>{props?.row?.original?.node?.interest?.defaultRate} %</span>,
      },
      {
        header: t['loanProductsCreatedDate'],
        accessorFn: (row) => row?.node.createdDate,
      },
      {
        id: '_actions',
        header: '',
        cell: (props) => (
          <ActionPopoverComponent items={popoverTitle} id={props?.row?.original?.node?.id} />
        ),
        meta: {
          width: '50px',
        },
      },
    ],
    [t, router, popoverTitle]
  );

  return (
    <>
      <Box borderBottom="1px solid " borderColor="border.layout" p="8px 16px">
        <Box display="flex" justifyContent="space-between" alignItems="center" h="100%">
          <Text fontSize="r2" fontWeight="600" color="gray.800">
            {t['loanProductsLoanProducts']}
          </Text>
          <Button
            leftIcon={<AddIcon h="11px" />}
            onClick={() =>
              newId
                .mutateAsync({ idType: Id_Type.Loanproduct })
                .then((res) => router.push(`/settings/general/loan-products/add/${res?.newId}`))
            }
          >
            {t['loanProductsNewLoanProduct']}
          </Button>
        </Box>
      </Box>

      <Table
        isLoading={isLoading}
        data={rowData}
        columns={columns}
        pagination={{
          total: data?.settings?.general?.loanProducts?.list?.totalCount ?? 'Many',
          pageInfo: data?.settings?.general?.loanProducts?.list?.pageInfo,
        }}
      />
    </>
  );
};
