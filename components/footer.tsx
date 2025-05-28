// import Image from "next/image";

export default function Footer() {
    return (
  <div>
  <footer className="bg-gray-800 text-white py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        {/* About GIQMIS */}
        <div className="footer-widget">
          <h4 className="text-lg font-semibold mb-4 text-orange-500">About GIQMIS</h4>
          <p className="text-gray-300 text-sm leading-6">
            GLADTIDINGS INSTITUTION FOR QUR'AN MEMORIZATION AND ISLAMIC STUDIES FOR FEMALES is dedicated to providing excellent Islamic education in a nurturing environment.
          </p>
        </div>
  
        {/* Quick Links */}
        <div className="footer-widget">
          <h4 className="text-lg font-semibold mb-4 text-orange-500">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a 
                href="/" 
                className="flex items-center text-gray-300 hover:text-orange-500 transition-colors duration-200 text-sm"
              >
                <span className="text-orange-500 text-xl mr-2">✓</span>
                <span>Home</span>
              </a>
            </li>
            <li>
              <a 
                href="About" 
                className="flex items-center text-gray-300 hover:text-orange-500 transition-colors duration-200 text-sm"
              >
                <span className="text-orange-500 text-xl mr-2">✓</span>
                <span>About</span>
              </a>
            </li>
            <li>
              <a 
                href="Programs" 
                className="flex items-center text-gray-300 hover:text-orange-500 transition-colors duration-200 text-sm"
              >
                <span className="text-orange-500 text-xl mr-2">✓</span>
                <span>Programs</span>
              </a>
            </li>
            <li>
              <a 
                href="Gallery" 
                className="flex items-center text-gray-300 hover:text-orange-500 transition-colors duration-200 text-sm"
              >
                <span className="text-orange-500 text-xl mr-2">✓</span>
                <span>Gallery</span>
              </a>
            </li>
            <li>
              <a 
                href="Contact" 
                className="flex items-center text-gray-300 hover:text-orange-500 transition-colors duration-200 text-sm"
              >
                <span className="text-orange-500 text-xl mr-2">✓</span>
                <span>Contact</span>
              </a>
            </li>
          </ul>
        </div>
  
        {/* Programs */}
        <div className="footer-widget">
          <h4 className="text-lg font-semibold mb-4 text-orange-500">Programs</h4>
          <ul className="space-y-2">
            <li>
              <a 
                href="Programs" 
                className="flex items-center text-gray-300 hover:text-orange-500 transition-colors duration-200 text-sm"
              >
                <span className="text-orange-500 text-xl mr-2">✓</span>
                <span>Children's Program</span>
              </a>
            </li>
            <li>
              <a 
                href="Programs" 
                className="flex items-center text-gray-300 hover:text-orange-500 transition-colors duration-200 text-sm"
              >
                <span className="text-orange-500 text-xl mr-2">✓</span>
                <span>Teen Program</span>
              </a>
            </li>
            <li>
              <a 
                href="Programs" 
                className="flex items-center text-gray-300 hover:text-orange-500 transition-colors duration-200 text-sm"
              >
                <span className="text-orange-500 text-xl mr-2">✓</span>
                <span>Adult Program</span>
              </a>
            </li>
            <li>
              <a 
                href="Programs" 
                className="flex items-center text-gray-300 hover:text-orange-500 transition-colors duration-200 text-sm"
              >
                <span className="text-orange-500 text-xl mr-2">✓</span>
                <span>Summer Intensives</span>
              </a>
            </li>
            <li>
              <a 
                href="Programs" 
                className="flex items-center text-gray-300 hover:text-orange-500 transition-colors duration-200 text-sm"
              >
                <span className="text-orange-500 text-xl mr-2">✓</span>
                <span>Online Classes</span>
              </a>
            </li>
          </ul>
        </div>
  
        {/* Contact Us */}
        <div className="footer-widget">
          <h4 className="text-lg font-semibold mb-4 text-orange-500">Contact Us</h4>
          <div className="space-y-3 text-sm text-gray-300">
            <p className="leading-6">
              <span className="font-medium text-white">Address:</span><br />
              66, Amuda Oojeere adjacent Longrich/Olowoyeye hall, Ibadan, Nigeria
            </p>
            <p>
              <span className="font-medium text-white">Phone:</span><br />
              <a href="tel:+2348071032546" className="hover:text-orange-500 transition-colors">
                +234 807 103 2546
              </a>
            </p>
            <p>
              <span className="font-medium text-white">Email:</span><br />
              <a href="mailto:gladtidingsipe@gmail.com" className="hover:text-orange-500 transition-colors">
                gladtidingsipe@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
  
      {/* Copyright */}
      <div className="border-t border-gray-700 pt-6">
        <p className="text-center text-gray-400 text-xs">
          &copy; 2025 GLADTIDINGS INSTITUTION FOR QUR'AN MEMORIZATION AND ISLAMIC STUDIES FOR FEMALES. All Rights Reserved.
        </p>
      </div>
    </div>
  </footer>
  </div>
    );
  }
  