import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  readonly id: number

  @Column({length: 30})
  name: string

  @Column()
  email: string

  @Column()
  password_digest: string
}
