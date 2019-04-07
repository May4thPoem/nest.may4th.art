import {Field, ID, ObjectType} from 'type-graphql'
import {Column, Entity, PrimaryGeneratedColumn, Unique} from 'typeorm'

@ObjectType()
@Unique('user_validation', ['name', 'email'])
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
