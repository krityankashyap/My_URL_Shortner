import logger from "../config/logger.config";
import { cacheRepository } from "../repositories/cache.repository";
import { UrlRepository } from "../repositories/url.repository";
import { UrlService } from "../services/url.service";
import { InternalServerError } from "../utils/errors/app.error";
import { publicProcedure } from "../routers/trpc/context";
import { z } from "zod"

const urlService= new UrlService(new UrlRepository(), new cacheRepository());

export const urlController= {

  create: publicProcedure
  .input(
    z.object({
      originalUrl: z.string().url('Invalid URL')
    })
  ).mutation(async ({ input }) => {
    try {
      const result= await urlService.createShortUrl(input.originalUrl);
      return result;
    } catch (error) {
      logger.error("Error creating short URL", error);
      throw new InternalServerError("Failed to create short url");
    }
  }),

  getOriginalUrl: publicProcedure
  .input(
    z.object({
      shortUrl: z.string().min(1, 'Short url is required')
    })
  ).query(
    async ({input}) => {
      try {
        const result= await urlService.getOriginalUrl(input.shortUrl);
        return result;
      } catch (error) {
        logger.error("Error getting original URL", error);
        throw new InternalServerError("Failed to get original url");
      }
    }
  )
}