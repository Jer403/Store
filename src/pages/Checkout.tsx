import {  useState } from 'react';
import { CreditCard } from 'lucide-react';

export default function Checkout() {

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  return (
    <div className="min-h-screen-minus-64 bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>
            
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="border-t border-b py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Adventure Game Pro</h3>
                    <p className="text-sm text-gray-600">Digital Download</p>
                  </div>
                  <span className="font-semibold">$29.99</span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="font-semibold">Total</span>
                <span className="font-semibold text-xl">$29.99</span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVC
                    </label>
                    <input
                      type="text"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 flex items-center justify-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}