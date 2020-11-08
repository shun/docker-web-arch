import { Connection, ViewEntity, ViewColumn, PrimaryColumn, OneToMany } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { User } from "./User";
import { OrgSection } from "./OrgSection";
import { UserPosition } from "./UserPosition";
import { OfficialPosition } from "./OfficialPosition";
@ViewEntity({
  expression: (connection: Connection) => connection.createQueryBuilder()
    .select("u.code",              "user_cd")
    .addSelect("u.lastname",       "lastname")
    .addSelect("u.firstname",      "firstname")
    .addSelect("op.title",         "title")
    .addSelect("op.positionvalue", "positionvalue")
    .addSelect("up.start_date",    "start_date")
    .addSelect("up.end_date",      "end_date")
    .from(User, "u")
    .leftJoin(UserPosition, "up", "u.code = up.user_cd")
    .leftJoin(OfficialPosition, "op", "up.position_id = op.id")
    .where("u.delflg = 0")
    .andWhere("up.end_date is NULL")
    .andWhere("op.end_date is NULL")
    .andWhere("op.delflg = 0")
})
@ObjectType()
export class ViewUserPosition {

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
    positionvalue: number;

    @ViewColumn()
    @Field(type => Date)
    start_date: Date | null;

    @ViewColumn()
    @Field(type => Date, {nullable: true})
    end_date: Date | null;
}
