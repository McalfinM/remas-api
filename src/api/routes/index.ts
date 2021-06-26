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
    @inject(TYPES.LikeRouter) private likeRouter: IRouter
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
    this.router.use("/api/v1/likes", this.likeRouter.router)
    return this
  }

}
export default IndexRouter;
