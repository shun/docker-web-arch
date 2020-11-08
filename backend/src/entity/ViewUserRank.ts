import { Connection, ViewEntity, ViewColumn, PrimaryColumn, OneToMany } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { User } from "./User";
import { UserRank } from "./UserRank";
import { OfficialRank } from "./OfficialRank";
@ViewEntity({
  expression: (connection: Connection) => connection.createQueryBuilder()
    .select("u.code",           "user_cd")
    .addSelect("u.lastname",    "lastname")
    .addSelect("u.firstname",   "firstname")
    .addSelect("or.title",      "title")
    .addSelect("or.rankvalue",  "rankvalue")
    .addSelect("ur.start_date", "start_date")
    .addSelect("ur.end_date",   "end_date")
    .from(User, "u")
    .leftJoin(UserRank, "ur", "u.code = ur.user_cd")
    .leftJoin(OfficialRank, "or", "ur.rank_id = or.id")
    .where("u.delflg = 0")
    .andWhere("ur.end_date is NULL")
    .andWhere("or.end_date is NULL")
    .andWhere("or.delflg = 0")
})
@ObjectType()
export class ViewUserRank {

    @ViewColumn()
    @PrimaryColumn()
    @Field()
    user_cd: string;

    @ViewColumn()
    @Field()
    lastname: string;

    @ViewColumn()
    @Field()
    firstname: string;

    @ViewColumn()
    @Field()
    title: string;

    @ViewColumn()
    @Field()
    rankvalue: number;

    @ViewColumn()
    @Field(type => Date)
    start_date: Date | null;

    @ViewColumn()
    @Field(type => Date, {nullable: true})
    end_date: Date | null;
}
