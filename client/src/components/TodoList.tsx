import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Todo } from '../api/todos'

type TodoListProps = {
  todos: Todo[]
  isSubmitting: boolean
  onToggleCompleted: (todo: Todo) => Promise<void>
  onUpdateTitle: (todo: Todo, title: string) => Promise<void>
  onDelete: (todo: Todo) => Promise<void>
}

function TodoList({
  todos,
  isSubmitting,
  onToggleCompleted,
  onUpdateTitle,
  onDelete,
}: TodoListProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState('')

  const startEditing = (todo: Todo) => {
    setEditingId(todo._id)
    setEditingTitle(todo.title)
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditingTitle('')
  }

  const submitEdit = async (event: FormEvent<HTMLFormElement>, todo: Todo) => {
    event.preventDefault()
    const trimmed = editingTitle.trim()
    if (!trimmed) {
      return
    }

    await onUpdateTitle(todo, trimmed)
    cancelEditing()
  }

  if (todos.length === 0) {
    return <p className="empty-state">No todos yet.</p>
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => {
        const isEditing = editingId === todo._id

        return (
          <li key={todo._id} className="todo-item">
            <div className="todo-main">
              <label className="todo-toggle">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  disabled={isSubmitting}
                  onChange={() => onToggleCompleted(todo)}
                />
                <span className={todo.completed ? 'completed' : ''}>{todo.title}</span>
              </label>
              {todo.description && <p className="todo-description">{todo.description}</p>}
            </div>
            <div className="todo-actions">
              {isEditing ? (
                <form className="inline-edit" onSubmit={(event) => submitEdit(event, todo)}>
                  <input
                    type="text"
                    value={editingTitle}
                    disabled={isSubmitting}
                    onChange={(event) => setEditingTitle(event.target.value)}
                  />
                  <button type="submit" disabled={isSubmitting || editingTitle.trim().length === 0}>
                    Save
                  </button>
                  <button type="button" onClick={cancelEditing} disabled={isSubmitting}>
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <button type="button" onClick={() => startEditing(todo)} disabled={isSubmitting}>
                    Edit
                  </button>
                  <button type="button" onClick={() => onDelete(todo)} disabled={isSubmitting}>
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default TodoList
