import ContactForm from "../_components/ContactForm";
import FaqPreview from "../_components/FaqPreview";
import { getFaqQuestions } from "../_lib/data-service";


export const metadata = {
  title: "Contact Us",
  description:
    "Have a question or need assistance? Reach out to the Dressify team and let us help you with orders, products, or anything else you need.",
};

async function page() {

  const faqQuestions = await getFaqQuestions();

  return (
    <div className="grid md:grid-cols-[3fr_2fr] grid-cols-1 md2:px-4 xs:px-3 px-2 gap-10 mb-10">
      {/* Contact details and Form */}
      <div className="max-w-xl flex flex-col gap-5">
        <div className="flex flex-col md2:gap-5 gap-2 ">
          <h1 className="font-semibold text-2xl">Need More Support?</h1>
          <span>
            Our dedicated Customer Service Team are here to help you.
            or for quicker assistance you can explore our FAQ to find the information you need.
          </span>
          <span>You can use our Contact Form to reach us:</span>
        </div>

        {/* Contact Form */}
        <ContactForm />
      </div>

      {/* FAQ */}
      <FaqPreview faqQuestions={faqQuestions} />
    </div>
  )
}

export default page
