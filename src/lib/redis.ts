// lib/redis.ts
import Redis from "ioredis";

// Create a dummy Redis client if no URL is provided
const createRedisClient = () => {
  if (!process.env.REDIS_URL) {
    console.warn("REDIS_URL not provided, using mock Redis client");
    // Return a mock Redis client with basic functionality
    return {
      get: async () => null,
      set: async () => "OK",
      del: async () => 1,
      on: () => {},
      connect: () => {},
    } as unknown as Redis;
  }

  try {
    const client = new Redis(process.env.REDIS_URL, {
      maxRetriesPerRequest: 3,
      retryStrategy: (times) => {
        if (times > 3) {
          console.warn("Redis connection failed after 3 retries");
          return null; // Stop retrying
        }
        return Math.min(times * 100, 3000); // Retry with exponential backoff
      },
      connectTimeout: 5000, // 5 seconds
    });

    client.on("error", (err) => {
      console.warn("Redis connection error:", err);
    });

    return client;
  } catch (error) {
    console.error("Failed to initialize Redis client:", error);
    // Return a mock Redis client as fallback
    return {
      get: async () => null,
      set: async () => "OK",
      del: async () => 1,
      on: () => {},
      connect: () => {},
    } as unknown as Redis;
  }
};

const redis = createRedisClient();

export default redis;