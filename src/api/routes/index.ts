import { Router } from "express";
import IRouter from './interfaces/router'

import { injectable, inject } from "inversify";
import { TYPES } from '../../types';

@injectable()
class IndexRouter {
  public router: Router;

  constructor(

    @inject(TYPES.UserRouter) private userRouter: IRouter,
    @inject(TYPES.AuthRouter) private authRouter: IRouter,
    @inject(TYPES.PostRouter) private postRouter: IRouter,
    @inject(TYPES.ProfileRouter) private profileRouter: IRouter,
    @inject(TYPES.CommentRouter) private commentRouter: IRouter,
    @inject(TYPES.LikeRouter) private likeRouter: IRouter,
    @inject(TYPES.CategoryRouter) private categoryRouter: IRouter,
    @inject(TYPES.RemasLikeRouter) private remasLikeRouter: IRouter,
    @inject(TYPES.CommentRemasRouter) private commentRemasRouter: IRouter,
    @inject(TYPES.RegistrationMemberRemasRouter) private registrationMemberRemasRouter: IRouter,
    @inject(TYPES.EventRouter) private EventRouter: IRouter,
    @inject(TYPES.RequestRemasRouter) private requestRemasRouter: IRouter,
    @inject(TYPES.TokenRouter) private tokenRouter: IRouter

  ) {
    this.router = Router();
    this.routes();
  }

  routes(): IRouter {
    this.router.use("/api/v1/users", this.userRouter.router)
    this.router.use("/api/v1/auth", this.authRouter.router)
    this.router.use("/api/v1/posts", this.postRouter.router)
    this.router.use("/api/v1/profiles", this.profileRouter.router)
    this.router.use("/api/v1/comments", this.commentRouter.router)
    this.router.use("/api/v1/category", this.categoryRouter.router)
    this.router.use("/api/v1/likes", this.likeRouter.router)
    this.router.use("/api/v1/remas-likes", this.remasLikeRouter.router)
    this.router.use("/api/v1/remas-comments", this.commentRemasRouter.router)
    this.router.use("/api/v1/remas-member-register", this.registrationMemberRemasRouter.router)
    this.router.use("/api/v1/events", this.EventRouter.router)
    this.router.use("/api/v1/request-remas", this.requestRemasRouter.router)
    this.router.use("/api/v1/token", this.tokenRouter.router)

    return this
  }

}
export default IndexRouter;
