"use-strict";
import { Request, Response } from "express";
import { inject } from "inversify";
import {
  controller,
  httpGet,
  httpPost,
  interfaces,
  request,
  response,
} from "inversify-express-utils";
import { TYPES } from "../config/types";
import IAccountService from "../services/interface/IAccountService";
import LoginModel from "../models/LoginDataModel";
import UserDto from "../dtos/UserDto";
// import sequelize from "../database/connection";
import { UserModel } from "../database/models/UserModel";

@controller("/account")
export class AccountController implements interfaces.Controller {
  private readonly _accountService: IAccountService;

  constructor(@inject(TYPES.IAccountService) accountService: IAccountService) {
    this._accountService = accountService;
  }

  @httpGet("/health")
  public async account(
    @request() req: Request,
    @response() res: Response
  ): Promise<void> {
    res.status(200).send({
      success: true,
      message: "Health OK!",
      data: "Health OK!",
    });
  }

  @httpPost("/login")
  public async login(
    @request() req: Request,
    @response() res: Response
  ): Promise<void> {
    const model: LoginModel = req.body;
    try {
      const response = await this._accountService.login(model);

      if (response && response.data) {
        res.status(200).send({
          success: true,
          message: "Login successful!",
          data: response.data,
        });
      }
    } catch (error) {
      res.status(400).send({
        message: "Try again!",
        error: error,
      });
    }
  }

  @httpPost("/register")
  public async register(
    @request() req: Request,
    @response() res: Response
  ): Promise<UserDto | void> {
    // const t = await sequelize.transaction();
    try {
      const model = req.body as UserModel;
      const roleName = req.body.role as string;
      const confirmPassword = req.body.confirmPassword as string;
      console.log(model, roleName, confirmPassword);


      // await t.commit();
      res.status(201).json(response);
    } catch (error) {
      // await t.rollback();
      res.status(400).json({
        success: false,
        message: "Some error occurred!",
        error: error,
      });
    }
  }
}
