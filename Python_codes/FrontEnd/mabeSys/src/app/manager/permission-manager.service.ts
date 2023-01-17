import { Injectable } from '@angular/core';
import { PermissionType } from './permission-type';
import { Role } from './role';
import { PermissionBase } from './permissions/base.permissions';
import { PermissionsFactory } from './permissions/factory.permissions';

@Injectable()
export class PermissionManagerService {

  private permissions!: PermissionBase;

  constructor() {
    
   }

  isGranted(permission: PermissionType) {
    const permissions = PermissionsFactory.getInstance().permissions;
    for (let perm of permissions) {
      if (perm === permission){
        return true;
      }
    }
    return false;
  }

  authAs(role: Role) {
    localStorage.setItem('role', 
      (role === null)
        ? Role.UNKNOWN
        : role
    );
    //this.permissions = PermissionsFactory.getInstance();
    //console.log(this.permissions);
  }

}