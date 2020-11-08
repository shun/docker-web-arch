import {Entity, PrimaryColumn, Column} from "typeorm";
import { ObjectType, Field } from "type-graphql";

@Entity()
@ObjectType()
export class UserRank {

    @PrimaryColumn({type: "char", length: 8})
    @Field()
    user_cd: string;

    @PrimaryColumn()
    @Field()
    rank_id: number;

    @Column({type: "date", nullable: true})
    @Field(type => Date)
    start_date: Date | null;

    @Column({type: "date", nullable: true})
    @Field(type => Date)
    end_date: Date | null;

    @Column({default: false})
    @Field()
    delflg: boolean;

}
