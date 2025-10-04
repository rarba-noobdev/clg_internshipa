'use client'
import ProductCard from "@/components/ProductCard";
import { useAppContext } from "@/context/AppContext";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center px-6 py-12 md:py-20">
        <div className="prose max-w-4xl">
          <h2>Privacy Policy for MiNaZoN</h2>
          <p><strong>Effective Date:</strong> October 4, 2025</p>

          <p>Welcome to MiNaZoN! We are committed to protecting your privacy and handling your personal data in an open and transparent manner. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>

          <h3>1. Information We Collect</h3>
          <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
          <ul>
            <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site, such as online chat and message boards.</li>
            <li><strong>Financial Data:</strong> Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, or exchange a product from the Site. We store only very limited, if any, financial information that we collect. Otherwise, all financial information is stored by our payment processor.</li>
            <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
            <li><strong>Data From Your Account:</strong> Information from your user account, such as your username, password, purchase history, and wishlisted items.</li>
          </ul>

          <h3>2. How We Use Your Information</h3>
          <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
          <ul>
            <li>Create and manage your account.</li>
            <li>Process your orders and manage payments and refunds.</li>
            <li>Email you regarding your account or order.</li>
            <li>Deliver targeted advertising, coupons, newsletters, and other promotions to you.</li>
            <li>Improve our website and product offerings.</li>
            <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
            <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
          </ul>

          <h3>3. Disclosure of Your Information</h3>
          <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
          <ul>
            <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others.</li>
            <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, and customer service.</li>
            <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
          </ul>

          <h3>4. Security of Your Information</h3>
          <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>

          <h3>5. Your Rights and Choices</h3>
          <p>Depending on your location, you may have the following rights regarding your personal data:</p>
          <ul>
            <li>The right to be informed about the collection and use of your personal data.</li>
            <li>The right to access your personal data and supplementary information.</li>
            <li>The right to have inaccurate personal data rectified, or completed if it is incomplete.</li>
            <li>The right to erasure (to be forgotten) in certain circumstances.</li>
            <li>The right to restrict processing in certain circumstances.</li>
          </ul>
          <p>To exercise these rights, please contact us using the contact information provided below.</p>

          <h3>6. Contact Us</h3>
          <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
          <ul>
            <li><strong>Email:</strong> Vigneshanbu.tech@gmail.com</li>
            <li><strong>Contact:</strong>8825960371</li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;