export const orderSchema = {
  getOrders: {
    response: {
      200: {
        type: "object",
        properties: {
          orders: {
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                user_id: { type: "string" },
                product_id: { type: "string" },
                quantity: { type: "number" },
                created_at: { type: "string", format: "date-time" },
                updated_at: { type: "string", format: "date-time" },
              },
            },
          },
        },
      },
    },
    headers: {
      type: "object",
      properties: {
        authorization: { type: "string", description: "Bearer token" },
      },
    },
  },
  createOrder: {
    body: {
      type: "object",
      required: ["user_id", "product_id", "quantity"],
      properties: {
        user_id: { type: "string" },
        product_id: { type: "string" },
        quantity: { type: "number" },
      },
    },
    response: {
      201: {
        type: "object",
        properties: {
          id: { type: "string" },
          user_id: { type: "string" },
          product_id: { type: "string" },
          quantity: { type: "number" },
          created_at: { type: "string", format: "date-time" },
          updated_at: { type: "string", format: "date-time" },
        },
      },
    },
    headers: {
      type: "object",
      properties: {
        authorization: { type: "string", description: "Bearer token" },
      },
    },
  },
  updateOrder: {
    body: {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "string" },
        user_id: { type: "string" },
        product_id: { type: "string" },
        quantity: { type: "number" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          id: { type: "string" },
          user_id: { type: "string" },
          product_id: { type: "string" },
          quantity: { type: "number" },
          created_at: { type: "string", format: "date-time" },
          updated_at: { type: "string", format: "date-time" },
        },
      },
    },
    headers: {
      type: "object",
      properties: {
        authorization: { type: "string", description: "Bearer token" },
      },
    },
  },
};
