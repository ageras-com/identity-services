import { User } from '../../../user/entities/user.entity';
import { Organization } from '../../../organization/entities/organization.entity';
import { Product } from '../../../product/entities/product.entity';
import { UserProduct } from '../../../user/entities/userProduct.entity';
import { OrganizationProduct } from '../../../organization/entities/organizationProduct.entity';
import { Audit } from '../../../audit/entities/audit.entity';
import { UserOrganization } from 'src/user/entities/userOrganization.entity';

// This is to export all TypeORM entities to be used in the datasource.
// Every new typeorm entity needs to be added here
export default {
  User,
  Organization,
  UserOrganization,
  Product,
  UserProduct,
  OrganizationProduct,
  Audit,
};
