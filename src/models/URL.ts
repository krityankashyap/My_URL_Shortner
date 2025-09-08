import mongoose , {Schema, Document} from "mongoose"

export interface IUrl extends Document {
  OriginalURL: string,
  ShortURL: string,
  clicks: number,
  createdAt: Date,
  updatedAt: Date
}

const URLSchema = new Schema<IUrl>({
  OriginalURL: {type: String, required: true},
  ShortURL: {type: String, required: true, unique: true, index: true},
  clicks: {type: Number, default: 0},
  updatedAt: {type: Date, default: Date.now},
  createdAt: {type: Date, default: Date.now}
})

URLSchema.index({ createdAt : -1})  /** Defines an index (most likely compound) for this schema. */
// URLSchema.index({shortURL : 1})

const Url = mongoose.model<IUrl>('Url' , URLSchema)

export default Url