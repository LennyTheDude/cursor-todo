import { InferSchemaType, Schema, model } from 'mongoose';

const todoSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export type Todo = InferSchemaType<typeof todoSchema>;

export const TodoModel = model<Todo>('Todo', todoSchema);
