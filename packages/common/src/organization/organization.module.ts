import { Module } from '@nestjs/common';

import { OrganizationService } from './organization.service';

@Module({
  exports: [OrganizationService],
  providers: [OrganizationService],
})
export class OrganizationModule {}
