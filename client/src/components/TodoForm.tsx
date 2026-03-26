import { useState } from 'react'
import type { FormEvent } from 'react'

type TodoFormProps = {
  onSubmit: (data: { title: string; description?: string }) => Promise<void>
  isSubmitting: boolean
}

function TodoForm({ onSubmit, isSubmitting }: TodoFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedTitle = title.trim()
    if (!trimmedTitle) {
      return
    }

    await onSubmit({
      title: trimmedTitle,
      description: description.trim(),
    })

    setTitle('')
    setDescription('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <h2>Create Todo</h2>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Todo title"
        disabled={isSubmitting}
      />
      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Description (optional)"
        rows={3}
        disabled={isSubmitting}
      />
      <button type="submit" disabled={isSubmitting || title.trim().length === 0}>
        {isSubmitting ? 'Creating...' : 'Add Todo'}
      </button>
    </form>
  )
}

export default TodoForm
