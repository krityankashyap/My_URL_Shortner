import Url,{ IUrl } from "../models/URL";


export interface CreateUrl {
  originalUrl: string,
  shortUrl: string
}

export class UrlRepository {

  async create(data: CreateUrl) {
    const url = new Url(data);
    return await url.save();
  }

  async findByShortURL() {}

  async findAll() {}

  async incrementClicks() {}

  async findStatsByShortUrl() {}
}