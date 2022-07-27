import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {AssetStatus} from "./_assetStatus"
import {UniqueInstance} from "./uniqueInstance.model"
import {Attribute} from "./_attribute"

@Entity_()
export class UniqueClass {
  constructor(props?: Partial<UniqueClass>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("text", {nullable: true})
  owner!: string | undefined | null

  @Column_("text", {nullable: true})
  admin!: string | undefined | null

  @Column_("text", {nullable: true})
  issuer!: string | undefined | null

  @Column_("text", {nullable: true})
  creator!: string | undefined | null

  @Column_("text", {nullable: true})
  freezer!: string | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  totalDeposit!: bigint | undefined | null

  @Column_("text", {nullable: true})
  name!: string | undefined | null

  @Column_("varchar", {length: 9, nullable: false})
  status!: AssetStatus

  @OneToMany_(() => UniqueInstance, e => e.uniqueClass)
  instances!: UniqueInstance[]

  @Column_("text", {nullable: true})
  metadata!: string | undefined | null

  @Column_("jsonb", {transformer: {to: obj => obj.map((val: any) => val.toJSON()), from: obj => marshal.fromList(obj, val => new Attribute(undefined, marshal.nonNull(val)))}, nullable: false})
  attributes!: (Attribute)[]
}
