import { createClient } from "redis"
import { serverConfig } from "."

export const redisClient = createClient({
  url: serverConfig.REDIS_URL
});

redisClient.on('error', (err)=>{
  console.error("Redis error ", err)
});

redisClient.on('connect', ()=>{
  console.log("Redis connected successfully")
});

export async function initRedis(){
  try {
    await redisClient.connect();
    console.log("Redis Connected")
  } catch (error) {
    console.log("Redis connection error", error)
    throw error;
  }
}

export async function closeRedis(){
  try {
    await redisClient.quit()
  } catch (error) {
    
  }
}
