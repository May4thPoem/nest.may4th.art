import {Field, ID, ObjectType} from 'type-graphql'
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
} from 'typeorm'
import {Poem} from '../poems/poem.entity'

@ObjectType()
@Unique('username_validation', ['name'])
@Unique('email_validation', ['email'])
@Entity()
export class User {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  readonly id: string

  @Field()
  @Column({length: 30})
  name: string

  @Field()
  @Column()
  email: string

  @Field(type => [Poem])
  @OneToMany(type => Poem, poem => poem.author, {lazy: true})
  poems: Promise<Poem[]> | Poem[]

  @Column()
  password_digest: string
}
