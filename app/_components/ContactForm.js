import { sendContactEmail } from "../_lib/actions"

function ContactForm() {
  return (
    <form 
      action={sendContactEmail}
      className=""
    >
      <h1 className="font-semibold text-2xl">Contact Us!</h1>
      <div className="text-base grid gap-2 grid-cols-1 mt-3">
        <div className="flex flex-col sm:max-w-90 gap-1">
          <label>Full Name *</label>
          <input
              name="name"
              required
              className="formInput shadow-sm"
              />
        </div>

        <div className="flex flex-col sm:max-w-90 gap-1">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            required
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
            className="formInput shadow-sm"
          />
        </div>

        <div className="flex flex-col sm:max-w-90 gap-1">
          <label>Phone Number</label>
          <input
              name="number"
              type="text"
              inputMode="numeric"
              placeholder="+49 123 4567"
              pattern="^\+?[0-9 ]+$"
              className="formInput shadow-sm"
              />
        </div>
        
        <div className="flex flex-col sm:max-w-90 gap-1 text-sm">
          <label>Message *</label>
          <textarea
              name="message"
              required
              className="formInput shadow-sm min-h-25"
              />
        </div>

        <button 
          className="max-w-40 w-full text-base bg-yellow-400 hover:bg-yellow-300 rounded-lg py-2 px-2 cursor-pointer"
          type="submit"
        >
          Send
        </button>
      </div>

    </form>
  )
}

export default ContactForm
