import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { ObjectType, Field } from "type-graphql";

@Entity()
@ObjectType()
export class OrgSection {

    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column()
    @Field()
    layer_id: number;

    @Column()
    @Field()
    order: number;

    @Column({type: "varchar", length: 32})
    @Field()
    name: string;

    @Column({type: "varchar", length: 255})
    @Field()
    path: string;

    @Column({type: "date", nullable: true})
    @Field(type => Date)
    start_date: Date | null;

    @Column({type: "date", nullable: true})
    @Field(type => Date)
    end_date: Date | null;

    @ManyToOne(type => OrgSection, section => section.chirldren)
    @Field(type => OrgSection)
    parent: OrgSection;

    @OneToMany(type => OrgSection, section =>section.parent)
    @Field(type => [OrgSection])
    chirldren: Promise<OrgSection[]>;
}
