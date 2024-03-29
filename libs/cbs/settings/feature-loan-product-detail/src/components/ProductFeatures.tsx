import { Table } from '@myra-ui';

interface IProductFeaturesProps {
  features: {
    feature: string;
    status: string;
  }[];
}

export const ProductFeatures = ({ features }: IProductFeaturesProps) => {
  const featuresListWithIndex =
    features?.map((feature, index) => ({
      index: index + 1,
      ...feature,
    })) ?? [];

  return (
    <Table
      isDetailPageTable
      isStatic
      data={featuresListWithIndex}
      columns={[
        {
          header: 'SN',
          accessorKey: 'index',
        },
        {
          header: 'Features',
          accessorKey: 'feature',
          meta: {
            width: '80%',
          },
        },
        {
          header: 'Status',
          accessorKey: 'status',
        },
      ]}
    />
  );
};
