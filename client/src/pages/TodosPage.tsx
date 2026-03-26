import { useCallback, useEffect, useState } from 'react'
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from '../api/todos'
import type { PaginatedTodos, Todo } from '../api/todos'
import PaginationControls from '../components/PaginationControls'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'

const PAGE_LIMIT = 5

function TodosPage() {
  const [todosData, setTodosData] = useState<PaginatedTodos>({
    items: [],
    total: 0,
    page: 1,
    limit: PAGE_LIMIT,
    totalPages: 1,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const loadTodos = useCallback(async (page: number) => {
    setIsLoading(true)
    setErrorMessage('')
    try {
      const response = await getTodos(page, PAGE_LIMIT)
      setTodosData(response)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load todos'
      setErrorMessage(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadTodos(1)
  }, [loadTodos])

  const handleCreate = async (data: { title: string; description?: string }) => {
    setIsSubmitting(true)
    setErrorMessage('')
    try {
      await createTodo(data)
      await loadTodos(1)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create todo'
      setErrorMessage(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleToggleCompleted = async (todo: Todo) => {
    setIsSubmitting(true)
    setErrorMessage('')
    try {
      await updateTodo(todo._id, { completed: !todo.completed })
      await loadTodos(todosData.page)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update todo'
      setErrorMessage(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateTitle = async (todo: Todo, title: string) => {
    setIsSubmitting(true)
    setErrorMessage('')
    try {
      await updateTodo(todo._id, { title })
      await loadTodos(todosData.page)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update todo'
      setErrorMessage(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (todo: Todo) => {
    setIsSubmitting(true)
    setErrorMessage('')
    try {
      await deleteTodo(todo._id)
      const targetPage = todosData.items.length === 1 ? Math.max(1, todosData.page - 1) : todosData.page
      await loadTodos(targetPage)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete todo'
      setErrorMessage(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="todo-page">
      <h1>To-Do App</h1>
      <TodoForm onSubmit={handleCreate} isSubmitting={isSubmitting} />
      {errorMessage && <p className="error">{errorMessage}</p>}
      {isLoading ? (
        <p>Loading todos...</p>
      ) : (
        <>
          <TodoList
            todos={todosData.items}
            isSubmitting={isSubmitting}
            onToggleCompleted={handleToggleCompleted}
            onUpdateTitle={handleUpdateTitle}
            onDelete={handleDelete}
          />
          <PaginationControls
            page={todosData.page}
            totalPages={todosData.totalPages}
            onPageChange={(nextPage) => void loadTodos(nextPage)}
          />
        </>
      )}
    </main>
  )
}

export default TodosPage
