// components/Footer.js
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">AIPoster.app</h3>
            <p className="mt-4 text-base text-gray-500">
              Free AI Poster Generator Online.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="https://aiposter.app/" className="text-base text-gray-500 hover:text-gray-900">
                  Home
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">Connect</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="https://aiposter.app/" target="_blank" className="text-base text-gray-500 hover:text-gray-900">
                  AIPoster.app
                </a>
              </li>
              <li>
                <a href="https://github.com/qiayue/aiposter.app" target="_blank" className="text-base text-gray-500 hover:text-gray-900">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://twitter.com/gefei55" target="_blank" className="text-base text-gray-500 hover:text-gray-900">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} AIPoster.app . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}