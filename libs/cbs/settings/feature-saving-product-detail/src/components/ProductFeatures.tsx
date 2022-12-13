import { Table } from '@myra-ui';

interface IProductFeaturesProps {
  features: {
    feature: string;
    status: string;
  }[];
}

export const ProductFeatures = ({ features }: IProductFeaturesProps) => (
  <Table
    isStatic
    data={features}
    columns={[
      {
        header: 'Features',
        accessorKey: 'feature',
        meta: {
          width: '70%',
        },
      },
      {
        header: 'Status',
        accessorKey: 'status',
        meta: {
          width: '33%',
        },
      },
    ]}
  />
);
