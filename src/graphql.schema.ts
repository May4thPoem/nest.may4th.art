/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export interface IQuery {
  user(id: string): User | Promise<User>
  temp__(): boolean | Promise<boolean>
}

export interface User {
  id: string
  name: string
  email: string
}
