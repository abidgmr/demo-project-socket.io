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
import { MessageDto } from "../dtos/ChatDto";

@controller("/chat")
export class ChatController implements interfaces.Controller {
  private readonly _chatService: IChatService;

  constructor(@inject(TYPES.IChatService) chatService: IChatService) {
    this._chatService = chatService;
  }

  @httpPost("/send")
  public async send(
    @request() req: Request,
    @response() res: Response
  ): Promise<Response<MessageDto>> {
    try {
      const { userId, socketId, message } = req.body;
      const response = await this._chatService.sendToSocket(
        userId,
        socketId,
        message
      );
      console.log("response", response);

      return res.status(201).json(response);
    } catch (error) {
      console.error("Error sending message:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }

  @httpPost("/broadcast")
  public async broadcast(
    @request() req: Request,
    @response() res: Response
  ): Promise<boolean | void> {
    const { message } = req.body;
    const response = this._chatService.broadcastMessage(message);
    res.status(201).json(response);
  }
}
