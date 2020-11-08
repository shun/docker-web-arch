import {Entity, PrimaryColumn, Column} from "typeorm";
import { ObjectType, Field } from "type-graphql";

@Entity()
@ObjectType()
export class UserOrganization {

    @PrimaryColumn({type: "char", length: 8})
    @Field()
    user_cd: string;

    @PrimaryColumn()
    @Field()
    section_id: number;

    @PrimaryColumn()
    @Field()
    position_id: number;

    @Column({default: false})
    @Field()
    priority: number;

    @Column({type: "date", nullable: true})
    @Field(type => Date)
    start_date: Date | null;

    @Column({type: "date", nullable: true})
    @Field(type => Date)
    end_date: Date | null;
}
