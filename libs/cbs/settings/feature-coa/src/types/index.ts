import { CoaView } from '@coop/cbs/data-access';

export type CoaTree = Partial<CoaView> & {
  children: CoaTree[];
};
