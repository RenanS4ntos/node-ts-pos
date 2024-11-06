import { FastifyInstance } from "fastify";
import { register } from "./controllers/register";
import { authenticate } from "./controllers/authenticate";
import {
  deleteUser,
  getUserById,
  profile,
  updateUser,
} from "./controllers/user";
import { verifyJWT } from "./middlewares/verify-jwt";
import {
  createProduct,
  getProducts,
  updateProduct,
} from "./controllers/product";
import { createCategory, getCategories } from "./controllers/category";
import { createOrder, getOrders, updateOrder } from "./controllers/order";
import { accountSchema } from "./schemas/accountSchema";
import { productSchema } from "./schemas/productSchema";
import { categorySchema } from "./schemas/categorySchema";
import { orderSchema } from "./schemas/orderSchema";
import { userSchema } from "./schemas/userSchema";

export async function appRoutes(app: FastifyInstance) {
  app.post("/login", { schema: accountSchema.login }, authenticate);
  app.post("/users", { schema: accountSchema.register }, register);

  /** Authenticated */
  // USER
  app.get("/me", { onRequest: verifyJWT, schema: userSchema.profile }, profile);
  app.get(
    "/user/:id",
    { onRequest: verifyJWT, schema: userSchema.getUserById },
    getUserById,
  );
  app.put(
    "/user",
    { onRequest: verifyJWT, schema: userSchema.updateUser },
    updateUser,
  );
  app.delete(
    "/user/:id",
    { onRequest: verifyJWT, schema: userSchema.deleteUser },
    deleteUser,
  );

  // CATEGORIES
  app.get(
    "/categories",
    { onRequest: verifyJWT, schema: categorySchema.getCategories },
    getCategories,
  );
  app.post(
    "/categories",
    { onRequest: verifyJWT, schema: categorySchema.createCategory },
    createCategory,
  );

  // PRODUCTS
  app.get(
    "/products",
    { onRequest: verifyJWT, schema: productSchema.getProducts },
    getProducts,
  );
  app.post(
    "/products",
    { onRequest: verifyJWT, schema: productSchema.createProduct },
    createProduct,
  );
  app.put(
    "/product",
    { onRequest: verifyJWT, schema: productSchema.updateProduct },
    updateProduct,
  );

  // ORDERS
  app.get(
    "/orders",
    { onRequest: verifyJWT, schema: orderSchema.getOrders },
    getOrders,
  );
  app.post(
    "/orders",
    { onRequest: verifyJWT, schema: orderSchema.createOrder },
    createOrder,
  );
  app.put(
    "/order",
    { onRequest: verifyJWT, schema: orderSchema.updateOrder },
    updateOrder,
  );
}
