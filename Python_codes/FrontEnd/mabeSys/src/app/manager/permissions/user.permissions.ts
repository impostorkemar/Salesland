import { PermissionType } from '../permission-type';
import { PermissionBase } from './base.permissions';

export class UserPermission extends PermissionBase {

  constructor() {
    super();
    this.permissions = [
      PermissionType.CREATE,
      PermissionType.READ,
      PermissionType.OTHER
    ];
  }
}
