type PaginationControlsProps = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

function PaginationControls({ page, totalPages, onPageChange }: PaginationControlsProps) {
  return (
    <div className="pagination">
      <button type="button" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        Previous
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  )
}

export default PaginationControls
