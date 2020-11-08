import {Entity, PrimaryColumn, Column} from "typeorm";
import { ObjectType, Field } from "type-graphql";

@Entity()
@ObjectType()
export class User {

    @PrimaryColumn({type: "char", length: 8})
    @Field()
    code: string;

    @Column({type: "varchar", length: 32})
    @Field()
    lastName: string;

    @Column({type: "varchar", length: 32})
    @Field()
    firstName: string;

    @Column({type: "boolean", default: false})
    @Field()
    delflg: boolean;
}
