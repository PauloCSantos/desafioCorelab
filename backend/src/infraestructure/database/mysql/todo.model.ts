import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "todos",
  timestamps: false,
})
export default class TodoModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string;

  @Column({ allowNull: false })
  declare title: string;

  @Column({ allowNull: true })
  declare description: string;

  @Column({ allowNull: false })
  declare favorite: boolean;

  @Column({ allowNull: false })
  declare color: string;

  @Column({ allowNull: false, field: "created_at" })
  declare createdAt: Date;

  @Column({ allowNull: false, field: "updated_at" })
  declare updatedAt: Date;
}
