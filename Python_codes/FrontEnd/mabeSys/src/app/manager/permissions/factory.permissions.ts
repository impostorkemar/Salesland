import { PermissionBase } from './base.permissions';
import { Role } from '../role';
import { SuperuserPermission } from './superuser.permissions';
import { AdminPermission } from './admin.permissions';
import { UserPermission } from './user.permissions';
import { UnknownPermission } from './unknown.permissions';

export class PermissionsFactory {

  public static instance: PermissionBase;
  private constructor() {}

  public static getInstance() {
    if (this.instance) {
      return this.instance;
    } else {
      const role = localStorage.getItem('role');
      switch(role) {
        case Role.SUPERUSER:
          this.instance = new SuperuserPermission();
          break;
        case Role.ADMIN:
          this.instance = new AdminPermission();
          break;
        case Role.USER:
          this.instance = new UserPermission();
          break;
        case Role.UNKNOWN:
          this.instance = new UnknownPermission();
          break;
        default:
          this.instance = new UnknownPermission();
          break;
      }
      return this.instance = new UnknownPermission();
    }
  }
}