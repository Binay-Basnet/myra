import React from 'react';
import { useRouter } from 'next/router';

import { PageLayout } from './PageLayout';

interface IInventoryPageLayoutProps {
  children: React.ReactNode;
  rows?: {
    title: string;
    key: string;
  }[];
  mainTitle: string;
  onBtnClick?: () => void;
}

const inventoryColumns = [
  {
    title: 'inventoryItems',
    link: '/inventory/items',
  },
  {
    title: 'inventoryItemGroup',
    link: '/inventory/item-group',
  },

  {
    title: 'inventoryVendor',
    link: '/inventory/vendor',
  },
  {
    title: 'inventoryUnitOfMeasure',
    link: '/inventory/units-of-measure',
  },
];

export const InventoryPageLayout = ({
  children,
  mainTitle,
  onBtnClick,
}: IInventoryPageLayoutProps) => {
  const router = useRouter();

  return (
    <PageLayout
      mainTitle={mainTitle}
      settingOnClick={() => router.push('/share/settings')}
      rows={[]}
      columns={inventoryColumns}
      btnOnClick={() => onBtnClick && onBtnClick()}
      heading={'Inventory'}
    >
      {children}
    </PageLayout>
  );
};
