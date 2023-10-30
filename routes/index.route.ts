import express from "express";
import authRoutes from "./auth.route";
import userRoutes from "./user.route";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },

  {
    path: "/user",
    route: userRoutes,
  },
];

defaultRoutes.forEach((route) => {
  if (route) {
    router.use(route.path, route.route);
  }
});

export default router;
