import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-semibold">RES</h2>
          <p className="text-sm text-gray-400 mt-2">
            Building careers, one resume at a time. Unlock your dream job with
            ease.
          </p>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h3 className="text-lg font-semibold">Subscribe to our Newsletter</h3>
          <p className="text-sm text-gray-400 mt-2">
            Stay updated with job trends and career advice.
          </p>
          <form className="mt-4 flex items-center ">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 rounded-lg border border-white bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 m-3"
            />

            <button className="bg-blue-500 hover:bg-blue-600 p-2 h-12 border rounded-3xl">
              Subscribe
            </button>
          </form>
        </div>

        {/* Quick Links & Socials */}
        <div>
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-2 text-sm text-gray-400">
            <li>
              <a href="/about" className="hover:text-blue-400">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-blue-400">
                Contact
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-blue-400">
                Privacy Policy
              </a>
            </li>
          </ul>
          <div className="flex space-x-4 mt-4">
            {/* Social Media Icons (Replace with actual links/icons) */}
            <a href="#" className="hover:text-blue-400">
              {" "}
              Facebook
            </a>
            <a href="#" className="hover:text-blue-400">
              {" "}
              Instagram
            </a>
            <a href="#" className="hover:text-blue-400">
              {" "}
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-gray-500 text-sm mt-8">
        © {new Date().getFullYear()} res. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
