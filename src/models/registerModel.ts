import mongoose, { Model, Schema } from 'mongoose';

/** Avoid OverwriteModelError when Next.js reloads API route modules in dev */
export function registerModel<T extends mongoose.Document>(
  name: string,
  schema: Schema<T>
): Model<T> {
  if (mongoose.models[name]) {
    return mongoose.models[name] as Model<T>;
  }
  return mongoose.model<T>(name, schema);
}
