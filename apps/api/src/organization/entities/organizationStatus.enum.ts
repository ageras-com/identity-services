export const organizationStatuses = {
  active: 'active',
  locked: 'locked',
  terminated: 'terminated',
} as const;

type OrganizationStatusKeys = keyof typeof organizationStatuses;
export type OrganizationStatus =
  (typeof organizationStatuses)[OrganizationStatusKeys];
