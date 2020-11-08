import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { ObjectType, Field } from "type-graphql";

@Entity()
@ObjectType()
export class OrgLayer {

    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column()
    @Field()
    layerno: number;

    @Column({type: "varchar", length: 32})
    @Field()
    name: string;

    @Column({type: "date", nullable: true})
    @Field(type => Date)
    start_date: Date | null;

    @Column({type: "date", nullable: true})
    @Field(type => Date)
    end_date: Date | null;
}
