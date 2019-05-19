import {Field, ID, ObjectType} from 'type-graphql'
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'
import {User} from '../users/user.entity'

@ObjectType()
@Entity()
export class Poem {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  readonly id: string

  @Field()
  @Column({length: 100})
  title: string

  @Field()
  @Column('text')
  content: string

  @Field({defaultValue: false})
  @Column()
  isPublic: boolean

  @Field()
  @Column()
  createdAt: Date

  @Field()
  @Column()
  updatedAt: Date

  @Field(type => User)
  @ManyToOne(type => User, {lazy: true})
  author: Promise<User> | User
}
