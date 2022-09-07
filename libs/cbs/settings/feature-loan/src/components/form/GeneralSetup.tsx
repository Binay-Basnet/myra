import {
  LoanProductSubType,
  LoanProductType,
  NatureOfLoanProduct,
} from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { FormSection, GridItem } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export function GeneralSetup() {
  const { t } = useTranslation();
  const productType = [
    {
      label: t['loanProductAgriculture'],
      value: LoanProductType.Agriculture,
    },
    {
      label: t['loanProductAlternativeEnergy'],
      value: LoanProductType.AlternativeEnergy,
    },
    {
      label: t['loanProductAssetsPurchasesAndMaintenance'],
      value: LoanProductType.AssetsPurchasesAndMaintenance,
    },
    {
      label: t['loanProductTypeBusiness'],
      value: LoanProductType.Business,
    },
    {
      label: t['loanProductCreditUnion'],
      value: LoanProductType.CreditUnion,
    },
    {
      label: t['loanProductEducational'],
      value: LoanProductType.Educational,
    },
    {
      label: t['loanProductForeignEmployee'],
      value: LoanProductType.ForeignEmployee,
    },
    {
      label: t['loanProductHirePurchase'],
      value: LoanProductType.HirePurchase,
    },
    {
      label: t['loanProductTypeIndustrial'],
      value: LoanProductType.Industrial,
    },
    {
      label: t['loanProductMicroEntrepreneur'],
      value: LoanProductType.MicroEntrepreneur,
    },
    {
      label: t['loanProductSocialSector'],
      value: LoanProductType.SocialSector,
    },
    {
      label: t['loanProductStaff'],
      value: LoanProductType.Staff,
    },
  ];

  const productSubType = [
    {
      label: t['agricultureBusiness'],
      value: LoanProductSubType.AgricultureBusiness,
    },
    {
      label: t['bigIndustrial'],
      value: LoanProductSubType.BigIndustrial,
    },
    {
      label: t['bioGas'],
      value: LoanProductSubType.BioGas,
    },
    {
      label: t['handicraftPromotional'],
      value: LoanProductSubType.HandicraftPromotional,
    },

    {
      label: t['smallIndustrial'],
      value: LoanProductSubType.SmallIndustrial,
    },
    {
      label: t['smallAndMediumEnterprises'],
      value: LoanProductSubType.SmallAndMediumEnterprises,
    },
    {
      label: t['livestockBusiness'],
      value: LoanProductSubType.LivestockBusiness,
    },
    {
      label: t['consumerGoodsBusiness'],
      value: LoanProductSubType.ConsumerGoodsBusiness,
    },

    {
      label: t['microEntrepreneur'],
      value: LoanProductSubType.MicroEntrepreneur,
    },
    {
      label: t['constructionEquipmentBusiness'],
      value: LoanProductSubType.ConstructionEquipmentBusiness,
    },
    {
      label: t['landAndBuildingBusiness'],
      value: LoanProductSubType.LandAndBuildingBusiness,
    },
    {
      label: t['stationaryBusiness'],
      value: LoanProductSubType.StationaryBusiness,
    },

    {
      label: t['serviceBusiness'],
      value: LoanProductSubType.ServiceBusiness,
    },
    {
      label: t['fruitsAndHorticulture'],
      value: LoanProductSubType.FruitsAndHorticulture,
    },
    {
      label: t['vegetableAndSeasonalFarming'],
      value: LoanProductSubType.VegetableAndSeasonalFarming,
    },
    {
      label: t['spiceProduction'],
      value: LoanProductSubType.SpiceProduction,
    },

    {
      label: t['cashCropsFraming'],
      value: LoanProductSubType.CashCropsFraming,
    },
    {
      label: t['livestock'],
      value: LoanProductSubType.Livestock,
    },
    {
      label: t['poultryFarming'],
      value: LoanProductSubType.PoultryFarming,
    },
    {
      label: t['honeyBeeFarming'],
      value: LoanProductSubType.HoneyBeeFarming,
    },

    {
      label: t['higherEducation'],
      value: LoanProductSubType.HigherEducation,
    },
    {
      label: t['technicalEducation'],
      value: LoanProductSubType.TechnicalEducation,
    },
    {
      label: t['foreignEducation'],
      value: LoanProductSubType.ForeignEducation,
    },
    {
      label: t['homeConstructionAndMaintenance'],
      value: LoanProductSubType.HomeConstructionAndMaintenance,
    },

    {
      label: t['housePurchase'],
      value: LoanProductSubType.HousePurchase,
    },
    {
      label: t['landPurchase'],
      value: LoanProductSubType.LandPurchase,
    },
    {
      label: t['homeAppliance'],
      value: LoanProductSubType.HomeAppliance,
    },
    {
      label: t['socialWork'],
      value: LoanProductSubType.SocialWork,
    },

    {
      label: t['religiousWork'],
      value: LoanProductSubType.ReligiousWork,
    },
    {
      label: t['homeExpenses'],
      value: LoanProductSubType.HomeExpenses,
    },
    {
      label: t['emergency'],
      value: LoanProductSubType.Emergency,
    },
    {
      label: t['foreignEmployeeWorkingVisa'],
      value: LoanProductSubType.ForeignEmployeeWorkingVisa,
    },

    {
      label: t['foreignEmployeeDependentVisa'],
      value: LoanProductSubType.ForeignEmployeeDependentVisa,
    },
    {
      label: t['solarEnergy'],
      value: LoanProductSubType.SolarEnergy,
    },
    {
      label: t['youthSelfEmployment'],
      value: LoanProductSubType.YouthSelfEmployment,
    },
    {
      label: t['microEntrepreneurGroup'],
      value: LoanProductSubType.MicroEntrepreneurGroup,
    },

    {
      label: t['hirePurchaseLoan_2Wheeler'],
      value: LoanProductSubType.HirePurchaseLoan_2Wheeler,
    },
    {
      label: t['hirePurchaseLoan_4Wheeler'],
      value: LoanProductSubType.HirePurchaseLoan_4Wheeler,
    },
    {
      label: t['hirePurchaseLoanHeavyEquipment'],
      value: LoanProductSubType.HirePurchaseLoanHeavyEquipment,
    },
    {
      label: t['staffLandAndBuilding'],
      value: LoanProductSubType.StaffLandAndBuilding,
    },

    {
      label: t['staffHirepurchase'],
      value: LoanProductSubType.StaffHirepurchase,
    },
    {
      label: t['staffPersonal'],
      value: LoanProductSubType.StaffPersonal,
    },
    {
      label: t['liquidityManagement'],
      value: LoanProductSubType.LiquidityManagement,
    },
    {
      label: t['shortTerm'],
      value: LoanProductSubType.ShortTerm,
    },

    {
      label: t['cooperativePromotion'],
      value: LoanProductSubType.CooperativePromotion,
    },
    {
      label: t['microEnterprisePromotion'],
      value: LoanProductSubType.MicroEnterprisePromotion,
    },
    {
      label: t['lineOfCredit'],
      value: LoanProductSubType.LineOfCredit,
    },
  ];

  const productNature = [
    {
      label: t['loanProductProductive'],
      value: NatureOfLoanProduct.Productive,
    },
    {
      label: t['loanProductUnproductive'],
      value: NatureOfLoanProduct.Unproductive,
    },
  ];

  return (
    <FormSection header="loanProductGeneralSetup">
      <GridItem colSpan={2}>
        <FormInput name="productName" label={t['loanProductProductName']} />
      </GridItem>

      <FormSelect
        name="productType"
        options={productType}
        label={t['loanProductProductType']}
      />
      <GridItem colSpan={2}>
        <FormSelect
          name="productSubType"
          options={productSubType}
          label={t['loanProductProductSubtype']}
        />
      </GridItem>

      <FormSelect
        name="productNature"
        options={productNature}
        label={t['loanProductNatureLoanProduct']}
      />
    </FormSection>
  );
}

export default GeneralSetup;
