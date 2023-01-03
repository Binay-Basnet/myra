import { DetailCardContent, Grid } from '@myra-ui';

interface IAccordianDetailsComponentCard {
  columns?: number;
  accordionCardDetails?: {
    label?: string;
    value?: string | number | undefined | null;
  }[];
}

export const AccordianListCardComponent = ({
  columns = 4,
  accordionCardDetails,
}: IAccordianDetailsComponentCard) => (
  <Grid p="s16" gap="s20" templateColumns={`repeat(${columns},1fr)`}>
    {accordionCardDetails &&
      accordionCardDetails?.map((item) => (
        <DetailCardContent title={item?.label} subtitle={item?.value} />
      ))}
  </Grid>
);
