"use strict";
import {
  Table,
  Model,
  Column,
  DataType,
  // ForeignKey,
} from "sequelize-typescript";
// import  UserModel  from "./UserModel";

@Table({
  tableName: "chat_contacts",
  timestamps: false,
})
export class ChatContactModel extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  declare id: number;

  // @ForeignKey(() => UserModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  userId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  currentUserId!: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isMuted!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isArchived!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isBlocked!: boolean;

  @Column({
    type: DataType.DATE(7),
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  createdOn!: Date;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  createdBy!: string;

  @Column({
    type: DataType.DATE(7),
    allowNull: true,
  })
  updatedOn!: Date;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  updatedBy!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  isActive!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  })
  isDeleted!: boolean;
}
