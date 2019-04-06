import {Field, ID, ObjectType} from 'type-graphql'
import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@ObjectType()
@Entity()
export class User {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field()
  @Column({length: 30})
  name: string

  @Field()
  @Column()
  email: string

  @Column()
  password_digest: string
}
