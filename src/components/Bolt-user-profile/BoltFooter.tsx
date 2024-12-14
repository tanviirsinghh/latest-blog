import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'

export default function BoltFooter() {
  return (
    <div>
       <footer className="mt-16 border-t border-gray-200 pt-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h4 className="font-bold text-lg mb-4">Newsletter</h4>
                <p className="text-gray-600 mb-4">
                  Stay updated with our latest stories and architectural insights
                </p>
                <form className="flex gap-2">
                  {/* <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                  /> */}
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
  
              <div>
                <h4 className="font-bold text-lg mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>
                    <a className="hover:text-blue-500">About Us</a>
                  </li>
                  <li>
                    <a className="hover:text-blue-500">Contact</a>
                  </li>
                  <li>
                    <a className="hover:text-blue-500">Privacy Policy</a>
                  </li>
                  <li>
                    <a className="hover:text-blue-500">Terms of Service</a>
                  </li>
                </ul>
              </div>
  
              <div>
                <h4 className="font-bold text-lg mb-4">Contact Us</h4>
                <address className="text-gray-600 not-italic">
                  <p>123 Architecture Avenue</p>
                  <p>New York, NY 10001</p>
                  <p>Email: contact@archblog.com</p>
                  <p>Phone: (555) 123-4567</p>
                </address>
              </div>
  
              <div>
                <h4 className="font-bold text-lg mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a className="text-gray-600 hover:text-blue-500">
                    <Twitter className="w-6 h-6" />
                  </a>
                  <a className="text-gray-600 hover:text-blue-500">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a className="text-gray-600 hover:text-blue-500">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a className="text-gray-600 hover:text-blue-500">
                    <Linkedin className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
  
            <div className="border-t border-gray-200 pt-8 text-center text-gray-600">
              <p>&copy; 2023 Architecture Blog. All rights reserved.</p>
            </div>
          </footer>
    </div>
  )
}
