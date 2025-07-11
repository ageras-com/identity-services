import { Audit } from '../../audit/entities/audit.entity';
import { Organization } from '../../organization/entities/organization.entity';
import { OrganizationProduct } from '../../organization/entities/organizationProduct.entity';
import { Product } from '../../user/entities/product.entity';
import { User } from '../../user/entities/user.entity';
import { UserOrganization } from '../../user/entities/userOrganization.entity';
import { UserProduct } from '../../user/entities/userProduct.entity';

// This is to export all TypeORM entities to be used in the datasource.
// Every new typeorm entity needs to be added here
export default {
  Audit,
  Organization,
  OrganizationProduct,
  Product,
  User,
  UserOrganization,
  UserProduct,
};
