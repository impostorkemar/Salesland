import { PermissionType } from '../permission-type';
import { PermissionBase } from './base.permissions';

export class UnknownPermission extends PermissionBase {

  constructor() {
    super();
    this.permissions = [
      PermissionType.READ
    ];
  }
}
