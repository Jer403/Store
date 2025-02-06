import { CheckCircle } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen-minus-64 bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-5xl font-bold text-center mb-4 flex justify-center items-center gap-3">
              <CheckCircle className="h-20 w-20 text-[--good]"></CheckCircle>
              <span>Payment Success</span>
            </p>
            <div className="flex justify-center items-center mb-12"></div>

            <p className="text-lg text-gray-700 mb-6">
              DigitalMarket is your premier destination for digital content,
              games, and software. We believe in providing high-quality digital
              products while ensuring a seamless and secure shopping experience
              for our customers.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              To create a trusted marketplace where creators can share their
              digital products and where customers can discover and purchase
              with confidence.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>Curated selection of high-quality digital products</li>
              <li>Secure payment processing</li>
              <li>Instant digital delivery</li>
              <li>24/7 customer support</li>
              <li>Money-back guarantee</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
            <p className="text-gray-700">
              We're a dedicated team of technology enthusiasts, developers, and
              customer service professionals working together to provide you
              with the best digital marketplace experience possible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
