import ChatDto from "../../dtos/ChatDto";
import Response from "../../dtos/Response";

export default interface IChatService {
  sendToSocket( userId: number, socketId: string, message: string): Promise<Response<ChatDto>>;
  broadcastMessage(message: string): Promise<Response<ChatDto>>;
}
