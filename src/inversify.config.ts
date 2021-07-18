
import IndexRouter from "./api/routes";
import IRouter from "./api/routes/interfaces/router";
import { IConnector } from "./events/connectors/IConnector";
import KafkaConnector from "./events/connectors/kafka";
import { ConsumerDispatcher } from "./events/consumers/dispatcher";
import { ProducerDispatcher } from "./events/producers/dispatcher";
import Subscribers from "./events/subscribers";
import { TYPES } from "./types";
import { EventDispatcher } from "event-dispatch";
import { Container, decorate, injectable } from "inversify";
import BaseRouter from "./api/routes/baseRouter";
import { ISeeder } from "./seeds/interfaces/seeder"
import { SEEDER_TYPES } from "./seeds/seeder.types";
import UserRepository from "./repositories/user";
import { IUserRepository } from "./repositories/interfaces/user";
import { IUserController } from "./api/controllers/interfaces/user";
import UserController from "./api/controllers/user";
import { IUserService } from "./services/interfaces/user";
import UserService from "./services/user";
import PostRouter from "./api/routes/post";
import AuthRouter from "./api/routes/auth";
import { IAuthController } from "./api/controllers/interfaces/auth";
import AuthController from "./api/controllers/auth";
import { IPostRepository } from "./repositories/interfaces/post";
import PostRepository from "./repositories/post";
import { IPostService } from "./services/interfaces/post";
import PostService from "./services/post";
import { IPostController } from "./api/controllers/interfaces/post";
import PostController from "./api/controllers/post";
import { IProfileService } from "./services/interfaces/profile";
import { IProfileRepository } from "./repositories/interfaces/profile";
import ProfileRepository from "./repositories/profile";
import ProfileService from "./services/profile";
import { IProfileController } from "./api/controllers/interfaces/profile";
import ProfileCotnroller from "./api/controllers/profile";
import ProfileRouter from "./api/routes/profile";
import CommentRouter from "./api/routes/comment";
import { ICommentController } from "./api/controllers/interfaces/comment";
import CommentController from "./api/controllers/comment";
import { ICommentService } from "./services/interfaces/comment";
import CommentService from "./services/comment";
import { ICommentRepository } from "./repositories/interfaces/comment";
import CommentRepository from "./repositories/comment";
import { ILikeController } from "./api/controllers/interfaces/like";
import LikeRouter from './api/routes/like'
import LikeController from "./api/controllers/like";
import { ILikeService } from "./services/interfaces/like";
import LikeService from "./services/like";
import { ILikeRepository } from "./repositories/interfaces/like";
import LikeRepository from "./repositories/like";
import { ICategoryConrtoller } from "./api/controllers/interfaces/categories";
import { ICategoryService } from "./services/interfaces/categories";
import { ICategoryRepository } from "./repositories/interfaces/categories";
import CategoryController from "./api/controllers/categories";
import CategoryRouter from "./api/routes/categories";
import CategoryRepository from "./repositories/categories";
import CategoryService from "./services/categories";
import RemasLikeRouter from "./api/routes/remasLike";
import { IRemasLikeController } from "./api/controllers/interfaces/remasLike";
import RemasLikeController from "./api/controllers/remasLike";
import { IRemasLikeService } from "./services/interfaces/remasLike";
import RemasLikeService from "./services/remasLike";
import { IRemasLikeRepository } from "./repositories/interfaces/remasLike";
import RemasLikeRepository from "./repositories/remasLike";
import CommentRemasRouter from "./api/routes/commentRemas";
import { ICommentRemasController } from "./api/controllers/interfaces/commentRemas";
import CommentRemasController from "./api/controllers/commentRemas";
import { ICommentRemasService } from "./services/interfaces/commentRemas";
import CommentRemasService from './services/commentRemas'
import { ICommentRemasRepository } from "./repositories/interfaces/commentRemas";
import CommentRemasRepository from './repositories/commentRemas'
import RegistrationMemberRemasRouter from "./api/routes/registrationMemberRemasRouter";
import { IRegistrationMemberRemasService } from "./services/interfaces/registrationMemberRemas";
import { IRegistrationMemberRemasRepository } from "./repositories/interfaces/registrationMemberRemas";
import RegistrationMemberRemasRepository from "./repositories/registrationMemberRemas";
import RegistrationMemberRemasService from "./services/registrationMemberRemas";
import { IRegistrationMemberRemasController } from "./api/controllers/interfaces/registrationMemberRemas";
import RegistrationMemberRemasController from "./api/controllers/registrationMembeREmasController";


decorate(injectable(), BaseRouter);
decorate(injectable(), EventDispatcher);


const container = new Container();

container.bind<Subscribers>(TYPES.Subscribers).to(Subscribers).inSingletonScope()
container.bind<IConnector>(TYPES.Connector).to(KafkaConnector).inSingletonScope()

container.bind<IRouter>(TYPES.IndexRouter).to(IndexRouter).inSingletonScope()

container.bind<IRouter>(TYPES.AuthRouter).to(AuthRouter).inSingletonScope()
container.bind<IAuthController>(TYPES.AuthController).to(AuthController).inSingletonScope()

container.bind<IRouter>(TYPES.UserRouter).to(PostRouter).inSingletonScope()
container.bind<IUserController>(TYPES.UserController).to(UserController).inSingletonScope()
container.bind<IUserService>(TYPES.UserService).to(UserService).inSingletonScope()
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository).inSingletonScope()

container.bind<IRouter>(TYPES.PostRouter).to(PostRouter).inSingletonScope()
container.bind<IPostController>(TYPES.PostController).to(PostController).inSingletonScope()
container.bind<IPostService>(TYPES.PostService).to(PostService).inSingletonScope()
container.bind<IPostRepository>(TYPES.PostRepository).to(PostRepository).inSingletonScope()

container.bind<IRouter>(TYPES.ProfileRouter).to(ProfileRouter).inSingletonScope()
container.bind<IProfileController>(TYPES.ProfileController).to(ProfileCotnroller).inSingletonScope()
container.bind<IProfileService>(TYPES.ProfileService).to(ProfileService).inSingletonScope()
container.bind<IProfileRepository>(TYPES.ProfileRepository).to(ProfileRepository).inSingletonScope()

container.bind<IRouter>(TYPES.CommentRouter).to(CommentRouter).inSingletonScope()
container.bind<ICommentController>(TYPES.CommentController).to(CommentController).inSingletonScope()
container.bind<ICommentService>(TYPES.CommentService).to(CommentService).inSingletonScope()
container.bind<ICommentRepository>(TYPES.CommentRepository).to(CommentRepository).inSingletonScope()

container.bind<IRouter>(TYPES.LikeRouter).to(LikeRouter).inSingletonScope()
container.bind<ILikeController>(TYPES.LikeController).to(LikeController).inSingletonScope()
container.bind<ILikeService>(TYPES.LikeService).to(LikeService).inSingletonScope()
container.bind<ILikeRepository>(TYPES.LikeRepository).to(LikeRepository).inSingletonScope()

container.bind<IRouter>(TYPES.CategoryRouter).to(CategoryRouter).inSingletonScope()
container.bind<ICategoryConrtoller>(TYPES.CategoryController).to(CategoryController).inSingletonScope()
container.bind<ICategoryService>(TYPES.CategoryService).to(CategoryService).inSingletonScope()
container.bind<ICategoryRepository>(TYPES.CategoryRepository).to(CategoryRepository).inSingletonScope()

container.bind<IRouter>(TYPES.RemasLikeRouter).to(RemasLikeRouter).inSingletonScope()
container.bind<IRemasLikeController>(TYPES.RemasLikeController).to(RemasLikeController).inSingletonScope()
container.bind<IRemasLikeService>(TYPES.RemasLikeService).to(RemasLikeService).inSingletonScope()
container.bind<IRemasLikeRepository>(TYPES.RemasLikeRepository).to(RemasLikeRepository).inSingletonScope()

container.bind<IRouter>(TYPES.CommentRemasRouter).to(CommentRemasRouter).inSingletonScope()
container.bind<ICommentRemasController>(TYPES.CommentRemasController).to(CommentRemasController).inSingletonScope()
container.bind<ICommentRemasService>(TYPES.CommentRemasService).to(CommentRemasService).inSingletonScope()
container.bind<ICommentRemasRepository>(TYPES.CommentRemasRepository).to(CommentRemasRepository).inSingletonScope()

container.bind<IRouter>(TYPES.RegistrationMemberRemasRouter).to(RegistrationMemberRemasRouter).inSingletonScope()
container.bind<IRegistrationMemberRemasController>(TYPES.RegistrationMemberRemasController).to(RegistrationMemberRemasController).inSingletonScope()
container.bind<IRegistrationMemberRemasService>(TYPES.RegistrationMemberRemasService).to(RegistrationMemberRemasService).inSingletonScope()
container.bind<IRegistrationMemberRemasRepository>(TYPES.RegistrationMemberRemasRepository).to(RegistrationMemberRemasRepository).inSingletonScope()

container.bind<EventDispatcher>(TYPES.ProducerDispatcher).to(ProducerDispatcher).inSingletonScope()
container.bind<EventDispatcher>(TYPES.ConsumerDispatcher).to(ConsumerDispatcher).inSingletonScope()

export { container };