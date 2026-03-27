import { z } from 'zod';

export const createTodoSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>;

export const updateTodoSchema = z
  .object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    completed: z.boolean().optional(),
  })
  .refine(
    (value) => value.title !== undefined || value.description !== undefined || value.completed !== undefined,
    {
      message: 'At least one field must be provided',
      path: ['body'],
    },
  );

export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;

export const listTodosQuerySchema = z
  .object({
    page: z
      .string()
      .transform((value) => Number(value))
      .pipe(z.number().int().positive())
      .optional(),
    limit: z
      .string()
      .transform((value) => Number(value))
      .pipe(z.number().int().positive())
      .optional(),
  })
  .transform((value) => ({
    page: value.page ?? 1,
    limit: value.limit ?? 10,
  }));

export type ListTodosQuery = z.infer<typeof listTodosQuerySchema>;

