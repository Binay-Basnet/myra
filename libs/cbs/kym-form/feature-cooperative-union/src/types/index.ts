import { CoopUnionInstitutionInformationInput } from '@coop/cbs/data-access';

export interface CustomCoopUnionInstitutionInformationInput
  extends CoopUnionInstitutionInformationInput {
  notAmongDirectors: boolean;
}
