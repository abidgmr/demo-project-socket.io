import { inject, injectable } from "inversify";
import { TYPES } from "../config/types";
import IChatService from "./interface/IChatService";
import { Server as SocketIOServer } from "socket.io";
import Response from "../dtos/Response";
import ChatDto from "../dtos/ChatDto";

@injectable()
export default class ChatService implements IChatService {
  constructor(@inject(TYPES.SocketIO) private io: SocketIOServer) {}

  async sendToSocket(
    socketId: string,
    message: string
  ): Promise<Response<ChatDto>> {
    const response = this.io
      .to(socketId)
      .emit("private-message", message, socketId);
    if (response) {
      return {
        success: true,
        data: {
          socketId: socketId,
          message: "Message emitted",
        },
      };
    } else {
      return {
        success: false,
        message: "Message failed",
      };
    }
  }

  async broadcastMessage(message: string): Promise<Response<ChatDto>> {
    const response = this.io.emit("from-server", message);
    if (response) {
      return {
        success: true,
        data: {
          message: "Message emitted",
        },
      };
    } else {
      return {
        success: false,
        message: "Message failed",
      };
    }
  }
}
