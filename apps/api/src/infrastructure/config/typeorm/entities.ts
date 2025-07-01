import { User } from "../../../domain/entities/user.entity"
import { Organization } from "../../../domain/entities/organization.entity"
import { UserOrganization } from "../../../domain/entities/userOrganization.entity"
import { Product } from "../../../domain/entities/product.entity"
import { UserProduct } from "../../../domain/entities/userProduct.entity"
import { OrganizationProduct } from "../../../domain/entities/organizationProduct.entity"
import { Audit } from "../../../domain/entities/audit.entity"

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
}
