import { loadEnv, defineConfig } from "@medusajs/framework/utils"

loadEnv(process.env.NODE_ENV || "development", process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
    workerMode: process.env.WORKER_MODE === "worker" ? "worker" : "server",
  },
  admin: {
    disable: process.env.DISABLE_MEDUSA_ADMIN === "true",
    backendUrl: process.env.MEDUSA_BACKEND_URL,
    path: "/",
  },
  modules: [
    {
      resolve: "@medusajs/medusa/cache-redis",
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    {
      resolve: "@medusajs/medusa/event-bus-redis",
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    {
      resolve: "@medusajs/medusa/workflow-engine-redis",
      options: {
        redis: {
          url: process.env.REDIS_URL,
        },
      },
    },
    {
      resolve: "@medusajs/medusa/file",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/file-s3",
            id: "s3",
            options: {
              file_url: process.env.S3_FILE_URL,
              access_key_id: process.env.S3_ACCESS_KEY_ID,
              secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
              region: process.env.S3_REGION,
              bucket: process.env.S3_BUCKET,
              endpoint: process.env.S3_ENDPOINT,
            },
          },
        ],
      },
    },
    {
      resolve: "medusa-plugin-ses",
      options: {
        access_key_id: process.env.SES_ACCESS_KEY_ID,
        secret_access_key: process.env.SES_SECRET_ACCESS_KEY,
        region: process.env.SES_REGION,
        from: process.env.SES_FROM,
        enable_endpoint: process.env.SES_ENABLE_ENDPOINT,
        template_path: process.env.SES_TEMPLATE_PATH,
        order_placed_template: "order_placed",
        order_shipped_template: "order_shipped",
        user_password_reset_template: "user_password_reset",
        gift_card_created_template: "gift_card_created",
        //order_canceled_template: "order_canceled",
        //order_refund_created_template: "order_refund_created",
        //order_return_requested_template: "order_return_requested",
        //order_items_returned_template: "order_items_returned",
        //swap_created_template: "swap_created",
        //swap_shipment_created_template: "swap_shipment_created",
        //swap_received_template: "swap_received",
        //claim_shipment_created_template: "claim_shipment_created",
        //medusa_restock_template: "medusa_restock",
      }
    },
  ]
})
