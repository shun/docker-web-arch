import { Connection, ViewEntity, ViewColumn, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { PersonalInfo } from "./PersonalInfo";
import { ViewUserOrganization } from "./ViewUserOrganization";

@ViewEntity({
  expression: (connection: Connection) => connection.createQueryBuilder()
    .select("pi1.id", "id")
    .addSelect("pi1.user_cd", "user_cd")
    .addSelect("pi1.key", "key")
    .addSelect("pi1.value", "value")
    .from(PersonalInfo, "pi1")
    .addFrom(subQuery => {
      return subQuery
        .select("pi2.user_cd", "user_cd")
        .addSelect("MAX(pi2.id)", "max_id")
        .from(PersonalInfo, "pi2")
        .where("pi2.delflg = 0")
        .groupBy("pi2.user_cd")
        .addGroupBy("pi2.key")
    }, "pi3")
    .where("pi1.user_cd = pi3.user_cd")
    .andWhere("pi1.id = pi3.max_id")
})
@ObjectType()
export class ViewLatestPersonalInfo {

    @ViewColumn()
    @PrimaryColumn()
    @Field()
    id: number;

    @ViewColumn()
    @Field()
    user_cd: string;

    @ViewColumn()
    @Field()
    key: string;

    @ViewColumn()
    @Field()
    value: string;

    @ManyToOne(type => ViewUserOrganization, user => user.infolist)
    @JoinColumn({
      name: "user_cd",
      referencedColumnName: "user_cd"
    })
    @Field(type => ViewUserOrganization)
    user: ViewUserOrganization;
}
