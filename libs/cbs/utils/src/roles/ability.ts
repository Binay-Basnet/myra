import { Ability, AbilityBuilder, AbilityClass } from '@casl/ability';

import { permissions as roles } from './permissions';
import { Actions, Subjects } from './types';

export type AppAbilityType = Ability<[Actions, Subjects]>;
export const AppAbility = Ability as AbilityClass<AppAbilityType>;

export const defineEmptyPermissions = () => {
  const { rules } = new AbilityBuilder(AppAbility);

  return rules;
};

export function buildEmptyPermissions(): AppAbilityType {
  return new AppAbility(defineEmptyPermissions(), {
    // https://casl.js.org/v5/en/guide/subject-type-detection,
    // TODO! Fix this ts error
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    detectSubjectType: (object) => object.type,
  });
}

export function updateAbility(
  ability: AppAbilityType,
  permissions: Partial<Record<Subjects, string>> = roles.SUPERADMIN
) {
  const { can, rules } = new AbilityBuilder(AppAbility);

  const aclKeyArray = Object.keys(permissions) as Subjects[];

  aclKeyArray.forEach((aclKey) => {
    const action = permissions?.[aclKey]?.split('/') as Actions[];

    can(action, aclKey);
  });

  ability.update(rules);
}
