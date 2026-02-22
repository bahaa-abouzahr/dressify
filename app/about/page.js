import Image from "next/image"
import Link from "next/link"
import about1 from "@/public/About/about1.jpg"
import about2 from "@/public/About/about2.jpeg"

export const metadata = {
  title: "About Us",
  description:
    "Learn more about Dressify — a brand built for strength, confidence, and everyday resilience. Discover our mission, values, and the vision behind our collection.",
};


function page() {
  return (
    <div className="flex flex-col gap-10 max-w-7xl max-md2:px-4">
      <div className="flex flex-col gap-3 border-b border-gray-200 pb-6 ">
        <h3 className="text-xl font-semibold text-gray-500">About Dressify</h3>

        <p className="text-gray-600">
          Dressify is an online clothing store offering fashion for women, men, and kids.
          Our goal is to provide stylish, comfortable, and affordable clothing for everyday life.
        </p>

        <p className="text-gray-600">
          We carefully select our products to ensure quality and simplicity, making it easy
          for you to find pieces that match your style and needs.
        </p>
      </div>

       <div className="grid md2:grid-cols-2 gap-6 grid-cols-1">
          <Image 
            src={about1} 
            alt="Shoes store"
            className="h-auto w-full"
          />
          <div className="flex flex-col gap-3">
            <h1 className="text-xl text-gray-500 font-medium">
              Comfort Meets Everyday Style
            </h1>
            <p className="text-1xl text-gray-500">
              At Dressify, we focus on clothing that feels as good as it looks. Our products are selected to provide lasting comfort, reliable quality, and modern design. 
              From casual wear to more refined pieces, we aim to offer clothing that fits naturally into your daily life.
            </p>
            <p className="text-1xl text-gray-500">
              We believe comfort should never limit your style. That’s why our collection includes versatile pieces designed to move with you throughout your day, whether you're working, relaxing, or on the go.
            </p>
          </div>
       </div>

       <div className="grid md2:grid-cols-2 gap-10 grid-cols-1">
          <div className="flex flex-col gap-3 order-2 md2:order-1 max-md2:px-4">
            <h1 className="text-2xl text-gray-500 font-medium">
              Fashion for Every Moment
            </h1>
            <p className="text-1xl text-gray-500">
              Dressify offers a variety of clothing designed to match different styles, needs, and occasions. 
              Whether you&apos;re dressing for work, relaxing at home, or going out, our goal is to help you find pieces that feel right for you.
            </p>
            <p className="text-1xl text-gray-500">
              From modern essentials to seasonal favorites, we continuously expand our collection to ensure you always have access to fresh, practical, and stylish options.
            </p>
          </div>
          <Image 
            src={about2} 
            alt="Shoes store" 
            className="h-auto w-full order-1 md2:order-2"
          />
       </div>
    </div>
  )
}

export default page
