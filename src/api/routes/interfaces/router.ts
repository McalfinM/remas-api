import { Router } from "express";

interface IRouter {
    router: Router
    routes(): IRouter
  }
  
  export default IRouter
  