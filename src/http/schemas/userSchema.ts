export const userSchema = {
  profile: {
    response: {
      200: {
        type: "object",
        properties: {
          user: {
            type: "object",
            properties: {
              id: { type: "string" },
              email: { type: "string" },
              name: { type: "string" },
              created_at: { type: "string", format: "date-time" },
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
  getUserById: {
    params: {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          user: {
            type: "object",
            properties: {
              id: { type: "string" },
              email: { type: "string" },
              name: { type: "string" },
              created_at: { type: "string", format: "date-time" },
            },
          },
        },
      },
      404: {
        type: "object",
        properties: {
          error: { type: "string" },
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
  updateUser: {
    params: {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "string" },
      },
    },
    body: {
      type: "object",
      properties: {
        name: { type: "string" },
        email: { type: "string" },
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
              user: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  email: { type: "string" },
                  name: { type: "string" },
                  created_at: { type: "string", format: "date-time" },
                },
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
  deleteUser: {
    params: {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
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
