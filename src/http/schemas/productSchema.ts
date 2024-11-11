export const productSchema = {
  getProducts: {
    response: {
      200: {
        type: "object",
        properties: {
          products: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                name: { type: "string" },
                price: { type: "number" },
                category_id: { type: "string" },
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
  createProduct: {
    body: {
      type: "object",
      required: ["name", "price"],
      properties: {
        name: { type: "string" },
        price: { type: "number" },
      },
    },
    response: {
      201: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          price: { type: "number" },
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
  updateProduct: {
    params: {
      type: "object",
      properties: {
        id: { type: "string" },
      },
    },
    body: {
      type: "object",
      properties: {
        name: { type: "string" },
        price: { type: "number" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
          data: {
            type: "object",
            properties: {
              product: {
                id: { type: "string" },
                name: { type: "string" },
                price: { type: "number" },
                category_id: { type: "string" },
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
};
