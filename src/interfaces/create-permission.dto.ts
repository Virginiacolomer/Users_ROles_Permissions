export class CreatePermissionDto {
  readonly name: string;
  readonly description?: string;
  readonly roleIds: number[];  // IDs de roles a asignar
}