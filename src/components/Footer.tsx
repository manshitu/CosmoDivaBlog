export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-800 to-pink-700 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div>
          <h3 className="text-xl font-semibold mb-3">CosmoDiva</h3>
          <p className="text-sm opacity-80">
            Empowering women to understand their cycles and embrace their
            feminine energy through knowledge & community.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Categories</h3>
          <ul className="space-y-2">
            <li>
              <a href="#">Cycle Health</a>
            </li>
            <li>
              <a href="#">Fertility</a>
            </li>
            <li>
              <a href="#">Wellness</a>
            </li>
            <li>
              <a href="#">Nutrition</a>
            </li>
          </ul>
        </div>

        {/* Contact + Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact</h3>
          <p>
            <i className="fas fa-envelope mr-2"></i> hello@cosmodiva.com
          </p>
          <p>{/*<i className="fas fa-phone mr-2"></i> +1 (555) 123-4567*/}</p>

          <h4 className="text-lg font-semibold mt-4 mb-2">Follow Us</h4>
          <div className="flex space-x-4">
            {/* Social media links here */}
            <a
              href="https://facebook.com/mycosmodiva"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-300"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://instagram.com/mycosmodiva"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-300"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://x.com/mycosmodiva"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-300"
            >
              <svg
                className="fab x-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
            </a>
            <a
              href="https://pinterest.com/mycosmodiva"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-300"
            >
              <i className="fab fa-pinterest"></i>
            </a>
            <a
              href="https://youtube.com/@mycosmodiva"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-300"
            >
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>        
      </div>

      {/* Footer Bottom */}
      <div className="text-center py-4 border-t border-white/20 text-sm opacity-75">
        © 2025 CosmoDiva. All rights reserved.
      </div>
    </footer>
  );
}
