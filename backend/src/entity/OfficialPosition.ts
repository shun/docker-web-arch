import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { ObjectType, Field } from "type-graphql";

@Entity()
@ObjectType()
export class OfficialPosition {

    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column({type: "varchar", length: 32, default: ""})
    @Field()
    title: string;

    @Column()
    @Field()
    positionvalue: number;

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
