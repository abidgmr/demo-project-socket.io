"use-strict";
import { Request, Response } from "express";
import { inject } from "inversify";
import {
  controller,
  httpPost,
  interfaces,
  request,
  response,
} from "inversify-express-utils";
import { TYPES } from "../config/types";
import IChatService from "../services/interface/IChatService";

@controller("/chat")
export class ChatController implements interfaces.Controller {
  private readonly _chatService: IChatService;

  constructor(@inject(TYPES.IChatService) chatService: IChatService) {
    this._chatService = chatService;
  }

  @httpPost("/send")
  public async send(@request() req: Request, @response() res: Response): Promise<boolean | void> {
    
    const { socketId, message } = req.body;
    const response = this._chatService.sendToSocket(socketId, message);
    res.status(201).json(response);
  }

  @httpPost("/broadcast")
  public async broadcast(@request() req: Request, @response() res: Response): Promise<boolean | void> {
    const { message } = req.body;
    const response = this._chatService.broadcastMessage(message);
    res.status(201).json(response);
  }
}
