import Link from 'next/link';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-4 xl:gap-8">
          {/* Company Info */}
          <div className="space-y-8 xl:col-span-1">
            <h3 className="text-2xl font-bold text-white">HealthConnect</h3>
            <p className="text-gray-400 text-sm">
              Empowering healthcare through innovative digital solutions.
              Connecting patients and healthcare providers seamlessly.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <FaInstagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-3">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                  For Patients
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/patient/medical-records" className="text-base text-gray-400 hover:text-white">
                      Medical Records
                    </Link>
                  </li>
                  <li>
                    <Link href="/appointments" className="text-base text-gray-400 hover:text-white">
                      Book Appointment
                    </Link>
                  </li>
                  <li>
                    <Link href="/prescriptions" className="text-base text-gray-400 hover:text-white">
                      Prescriptions
                    </Link>
                  </li>
                  <li>
                    <Link href="/billing" className="text-base text-gray-400 hover:text-white">
                      Billing & Payments
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                  For Providers
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/provider/dashboard" className="text-base text-gray-400 hover:text-white">
                      Provider Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/provider/schedule" className="text-base text-gray-400 hover:text-white">
                      Schedule Management
                    </Link>
                  </li>
                  <li>
                    <Link href="/provider/patients" className="text-base text-gray-400 hover:text-white">
                      Patient Management
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                  Support
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/help" className="text-base text-gray-400 hover:text-white">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-base text-gray-400 hover:text-white">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="text-base text-gray-400 hover:text-white">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                  Legal
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/privacy" className="text-base text-gray-400 hover:text-white">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-base text-gray-400 hover:text-white">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="/compliance" className="text-base text-gray-400 hover:text-white">
                      HIPAA Compliance
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 text-center">
            © {currentYear} HealthConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
