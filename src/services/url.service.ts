import { serverConfig } from "../config";
import { cacheRepository } from "../repositories/cache.repository";
import { UrlRepository } from "../repositories/url.repository";
import { toBase62 } from "../utils/base62";
import { NotFoundError } from "../utils/errors/app.error";

export class UrlService {
  constructor(private readonly urlRepository: UrlRepository , private readonly cacheRepository: cacheRepository){}

  async createShortUrl(originalUrl: string){
    const nextID= await this.cacheRepository.getNextId();

    const shortUrl= toBase62(nextID);

    const url= await this.urlRepository.create({
      originalUrl,
      shortUrl
    })
    // caching the url mapping
    await this.cacheRepository.setUrlMapping(shortUrl, originalUrl);

    const baseUrl= serverConfig.BASE_URL;
    const fullUrl= `${baseUrl}/${shortUrl}`

    return {
      id: url.id.toString(),
      shortUrl,
      originalUrl,
      fullUrl,
      createdAt: url.createdAt,
      updatedAt: url.updatedAt
    }
  }

  async getOriginalUrl(shortUrl: string){
    const originalUrl= await this.cacheRepository.getUrlMapping(shortUrl);

    if(originalUrl){ // original url is present in cache
    await this.urlRepository.incrementClicks(shortUrl); // this is the best time to increment the clicks for the given url
    return {
      originalUrl,
      shortUrl
    }
    }
    // if not present in cache then we have to make database call
    const url= await this.urlRepository.findByShortURL(shortUrl);

    if(!url){
      throw new NotFoundError("URL not found");
    }

    await this.urlRepository.incrementClicks(shortUrl); // this is the best time to increment the clicks for the given url
    await this.cacheRepository.setUrlMapping(shortUrl, url.OriginalURL) // now add this url in cache for next time search

    return {
      originalUrl: url.OriginalURL,
      shortUrl
    }
  }
}
