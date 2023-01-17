import { PermissionType } from '../permission-type';
import { Role } from '../role';
import { AdminPermission } from './admin.permissions';
import { SuperuserPermission } from './superuser.permissions';
import { UserPermission } from './user.permissions';
import { UnknownPermission } from './unknown.permissions';

export abstract class PermissionBase {

  public permissions!: PermissionType[];

  constructor() {
    
  }
  
}