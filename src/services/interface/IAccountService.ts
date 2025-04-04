import LoginModel from "../../models/LoginDataModel";
import UserDto from "../../dtos/UserDto";
import UserModel  from "../../database/models/UserModel";
import Response from "../../dtos/Response";
import { LoginDto } from "../../dtos/LoginDto";


export default interface IAccountService {
   login(model: LoginModel): Promise<Response<LoginDto>>;
   register(model: UserModel): Promise<UserDto>;
}
