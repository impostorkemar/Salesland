import { PermissionType } from '../permission-type';
import { PermissionBase } from './base.permissions';

export class SuperuserPermission extends PermissionBase {

  constructor() {
    super();
    this.permissions = [
      PermissionType.CREATE,
      PermissionType.READ,
      PermissionType.UPDATE,
      PermissionType.DELETE,
      PermissionType.OTHER
    ];
  }
}
