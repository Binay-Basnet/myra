import { DetailCardContent, DetailsCard } from '@myra-ui';

interface IAdditionalInfoCard {
  title: string;
  items: { label: string; value: string }[];
}

export const AdditionalInfoCard = ({ title, items }: IAdditionalInfoCard) => (
  <DetailsCard title={title} bg="white" hasThreeRows>
    {items?.map((item) => (
      <DetailCardContent title={item.label} subtitle={item.value} />
    ))}
  </DetailsCard>
);
