import { inject, injectable } from "inversify";
import IAccountService from "./interface/IAccountService";
import UserDto from "../dtos/UserDto";
import LoginDataModel from "../models/LoginDataModel";
import BcryptUtils from "../utils/bcrypt.utils";
import { UserModel } from "../database/models/UserModel";
import sequelize from "../database/connection";
import { RoleModel } from "../database/models/RoleModel";
import Response from "../dtos/Response";
import IMiscellaneousService from "./interface/IMiscellaneousService";
import { TYPES } from "../config/types";

@injectable()
export default class AccountService implements IAccountService {
  private readonly _miscellaneousService: IMiscellaneousService;

  constructor(
    @inject(TYPES.IMiscellaneousService)
    miscellaneousService: IMiscellaneousService
  ) {
    this._miscellaneousService = miscellaneousService;
  }

  async login(
    model: LoginDataModel
  ): Promise<Response<UserDto | { uniqueId: string }>> {
    const t = await sequelize.transaction();
    try {
      if (!model.username && !model.password) {
        throw new Error("Login credentials required");
      }

      const _user = await UserModel.findOne({
        where: {
          email: model.username,
          isActive: true,
          isDeleted: false,
        },
        raw: true,
      });

      if (!_user) {
        throw new Error("Invalid username or password");
      }

      const isPasswordValid = await BcryptUtils.comparePassword(
        model.password,
        _user.password
      );

      if (!isPasswordValid) {
        throw new Error("Invalid username or password");
      }

      await t.rollback();
      const roleResponse = await RoleModel.findOne({
        where: {
          roleId: _user?.roleId,
        },
        raw: true,
      });

      if (!roleResponse) {
        throw new Error("Invalid role!");
      }

      const tokenResponse = await this._miscellaneousService.generateToken(
        _user,
        roleResponse
      );

      if (tokenResponse && tokenResponse.data && tokenResponse.success) {
        return tokenResponse;
      }
    } catch {
      await t.rollback();
      throw new Error("Some error occurred!");
    }

    return {
      success: false,
      message: "Unexpected error: operation did not complete",
    };
  }

  register(model: UserModel): Promise<UserDto> {
    console.log(model);
    throw new Error("Method not implemented.");
  }
}
