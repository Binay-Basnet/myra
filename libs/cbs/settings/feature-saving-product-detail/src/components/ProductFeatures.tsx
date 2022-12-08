import { Table } from '@myra-ui';

interface IProductFeaturesProps {
  features: {
    feature: string;
    status: 'yes' | 'no';
  }[];
}

export const ProductFeatures = ({ features }: IProductFeaturesProps) => (
  <Table
    variant="report"
    size="report"
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
