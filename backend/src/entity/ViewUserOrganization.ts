import { Connection, ViewEntity, ViewColumn, PrimaryColumn, OneToMany } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { User } from "./User";
import { OrgSection } from "./OrgSection";
import { OfficialPosition } from "./OfficialPosition";
import { UserOrganization } from "./UserOrganization";
import { ViewLatestPersonalInfo } from "./ViewLatestPersonalInfo";

@ViewEntity({
  expression: (connection: Connection) => connection.createQueryBuilder()
    .select("u.code",          "user_cd")
    .addSelect("u.lastname",   "lastname")
    .addSelect("u.firstname",  "firstname")
    .addSelect("os.order",      "order")
    .addSelect("uo.priority",   "priority")
    .addSelect("os.path",       "path")
    .addSelect("op.title",      "title")
    .addSelect("uo.start_date", "start_date")
    .addSelect("uo.end_date",   "end_date")
    .from(User, "u")
    .leftJoin(UserOrganization, "uo", "u.code = uo.user_cd")
    .leftJoin(OrgSection, "os", "uo.section_id = os.id")
    .leftJoin(OfficialPosition, "op", "uo.position_id = op.id")
    .where("u.delflg = 0")
    .andWhere("uo.end_date is NULL")
    .andWhere("os.end_date is NULL")
})
@ObjectType()
export class ViewUserOrganization {

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
    order: number;

    @ViewColumn()
    @Field()
    priority: number;

    @ViewColumn()
    @Field()
    path: string;

    @ViewColumn()
    @Field()
    title: string;

    @ViewColumn()
    @Field(type => Date)
    start_date: Date | null;

    @ViewColumn()
    @Field(type => Date, {nullable: true})
    end_date: Date | null;

    @OneToMany(type => ViewLatestPersonalInfo, info => info.user)
    @Field(type => [ViewLatestPersonalInfo])
    infolist: ViewLatestPersonalInfo[];
}
