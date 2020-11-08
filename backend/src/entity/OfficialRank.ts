import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { ObjectType, Field } from "type-graphql";

@Entity()
@ObjectType()
export class OfficialRank {

    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column({type: "varchar", length: 32, default: ""})
    @Field()
    title: string;

    @Column()
    @Field()
    rankvalue: number;

    @Column({type: "date", nullable: true})
    @Field(type => Date)
    start_date: Date | null;

    @Column({type: "date", nullable: true})
    @Field(type => Date)
    end_date: Date | null;

    @Column()
    @Field()
    delflg: boolean;

}
