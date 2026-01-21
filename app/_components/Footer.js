export default function Footer() {
  return (
    <footer className="flex justify-center text-center gap-5 mt-10 border-t border-gray-200 py-6  text-sm text-gray-500">
      <div className="mb-2">
        <a href="/contact" className="hover:text-gray-700 hover:underline hover:underline-offset-4 transition">
          Contact Us
        </a>
      </div>
      <p>© {new Date().getFullYear()} Dressify</p>
    </footer>
  );
}