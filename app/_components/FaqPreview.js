"use client"

import { useState } from "react";
import FaqPreviewItem from "./FaqPreviewItem"

function FaqPreview({ faqQuestions }) {
  const [openId, setOpenId] = useState(null);
  const [lastClosedId, setLastClosedId] = useState(null);

  function handleToggle(id) {
    if(openId === id) {
      // clicking opened one -> close it and remember
      setOpenId(null);
      setLastClosedId(id)
    } else {
      // clicking another one -> reset hover blockage
      setOpenId(id);
      setLastClosedId(null);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <span className="font-bold text-xl">FAQ</span>
      {!faqQuestions ? 
          <span className="text-lg text-(--gray-text)">There are no current FAQ&apos;s available</span> 
        : (
          faqQuestions.map((faq) => {
            return <FaqPreviewItem faq={faq} openId={openId} lastClosedId={lastClosedId} handleToggle={handleToggle} key={faq.id} />
          })
      )}
    </div>
  )
}

export default FaqPreview
