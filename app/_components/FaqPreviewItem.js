function FaqPreviewItem({ faq, openId, lastClosedId, handleToggle }) {
  const isOpen = openId === faq.id;
  const disableHover = lastClosedId === faq.id;
 
  return (
    <div className="flex flex-col">
      <button 
        onClick={() => handleToggle(faq.id)}
        className={`flex justify-between cursor-pointer ${isOpen ? "font-semibold" : ""} ${!isOpen && !disableHover ? "hover:text-(--gray-text)" : ""}`}
      >
        <span>{faq.question}</span>
        <span className="text-2xl">{openId === faq.id ? "-" : "+"}</span>
      </button>

      <div 
        className={`
          overflow-hidden transition-all ease-in-out duration-500 text-(--gray-text)
          ${
            isOpen
            ? "max-h-96 opacity-100 " 
            : "max-h-0 opacity-0 "
          }`}
      >
        <p>{faq.answer}</p>
      </div>

    </div>
  )
}

export default FaqPreviewItem
