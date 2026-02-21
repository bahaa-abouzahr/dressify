function ApplyResetButtons({apply, reset}) {
  return (
    <div className="grid grid-cols-2">
      <button
        type="button"
        onClick={reset}
        className="bg-(--cream-input) hover:bg-white py-1 px-4  text-black text-sm font-semibold "
        >
          Reset
      </button>

      <button
        type="button"
        onClick={() => apply()}
        className="bg-(--orange-main) hover:bg-(--orange-secondary) py-1 px-4  text-white font-bold"
        >
          Apply
      </button>
    </div>
)
}

export default ApplyResetButtons
