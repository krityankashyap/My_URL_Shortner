import Url,{ IUrl } from "../models/URL";


export interface CreateUrl {
  originalUrl: string,
  shortUrl: string
}

export interface UrlStats {
  id: string,
  originalUrl: string,
  shortUrl: string,
  clicks: string,
  createdAt: Date,
  updatedAt: Date
}

export class UrlRepository {

  async create(data: CreateUrl): Promise<IUrl> {
    const url = new Url(data);
    return await url.save();
  }

  async findByShortURL(ShortUrl: string): Promise<IUrl | null> {
    return await Url.findOne({ShortUrl})
  }

  async findAll() {
    const urls = await Url.find().select({
      _id: 1,
      originalUrl: 1,
      shortUrl: 1,
      clicks: 1,
      createdAt: 1,
      updatedAt: 1
    }).sort({ createdAt: -1 })

    return urls.map(url => ({
      id: url.id?.toString() || "",
      originalUrl: url.OriginalURL,
      shortUrl: url.ShortURL,
      clicks: url.ShortURL,
      createdAt: url.createdAt,
      updatedAt: url.updatedAt
    }));
  }

  async incrementClicks(shortUrl: string): Promise<void> {
     await Url.findOneAndUpdate(
      { shortUrl },
      { $inc: { clicks : 1}},
    );
    return;
  }

  async findStatsByShortUrl(shortUrl: string): Promise<UrlStats | null> {
    const url= await Url.findOne({ shortUrl }).select({
      _id: 1,
      originalUrl: 1,
      shortUrl: 1,
      clicks: 1,
      createdAt: 1,
      updatedAt: 1
    });

    if(!url) return null;

    return {
      id: url.id?.toString() || "",
      originalUrl: url.OriginalURL,
      shortUrl: url.ShortURL,
      clicks: url.ShortURL,
      createdAt: url.createdAt,
      updatedAt: url.updatedAt
    }
  }
}