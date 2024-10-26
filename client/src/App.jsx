// src/App.js
import React, { useState } from 'react';
import Header from './header';
import { FaTimes, FaFileAlt, FaComments } from 'react-icons/fa'; // Importing icons for buttons

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [taxInfo, setTaxInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAisReportClick = () => {
    setShowPopup(true);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const response = await fetch('https://api.example.com/tax-info'); // Replace with your API endpoint
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch tax data');
  //     }
  //     const data = await response.json();
  //     setTaxInfo({
  //       income: data.income,
  //       taxableIncome: data.taxableIncome,
  //       tax: data.tax,
  //     });
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //     setShowPopup(false);
  //   }
  // };

  // Replace the entire try-catch block with this code
const handleSubmit = (e) => {
  e.preventDefault();

  // Hard-coded tax data
  const hardCodedTaxData = {
    income: '5,00,000 INR',
    taxableIncome: '4,00,000 INR',
    tax: '30,000 INR',
  };

  // Set the tax information
  setTaxInfo({
    income: hardCodedTaxData.income,
    taxableIncome: hardCodedTaxData.taxableIncome,
    tax: hardCodedTaxData.tax,
  });

  // Hide the popup after submitting
  setShowPopup(false);
};


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 text-center">
        {/* Introduction Section */}
        <section className="bg-green-50 shadow-lg rounded-lg p-6 mb-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to TaxMate</h1>
          <p className="text-gray-700 mb-6">
            Welcome to TaxMate, your one-stop solution for filing Income Tax Returns (ITR) with ease and confidence. 
            We provide all the necessary forms, resources, and expert guidance to make tax filing a smooth and hassle-free experience. 
            Whether you are a first-time filer or looking to streamline your annual filing process, TaxMate is designed with you in mind.
          </p>

          <p className="text-gray-700 mb-6">
            Our platform offers a user-friendly interface that simplifies complex tax regulations, helping you understand your obligations without the confusion. 
            We keep you informed about the latest tax laws and updates so that you can make informed decisions regarding your finances. 
            Explore our features, including personalized tax planning tools, document upload capabilities, and real-time support from tax professionals.
          </p>

          <p className="text-gray-700 mb-6">
            You can rely on us for timely reminders to ensure you never miss a deadline and face penalties. 
            Additionally, our detailed guides and resources are readily available to assist you in maximizing your deductions and minimizing your tax liability. 
            Join thousands of satisfied users who have transformed their tax filing experience with TaxMate and gain the peace of mind you deserve.
          </p>

          <p className="text-gray-700 mb-6">
            Start your journey with TaxMate today, and take the stress out of tax season! 
            Our dedicated support team is here to help you every step of the way, ensuring you have all the information and resources you need to file your taxes accurately and on time. 
            With TaxMate, filing your taxes is not just a task; it's an opportunity to take control of your financial future.
          </p>
        </section>

        {/* Buttons Section */}
        <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
          <section className="flex justify-center space-x-6">
            <button 
              className="flex items-center bg-blue-500 text-white px-8 py-4 rounded-lg hover:bg-blue-600 transition duration-200 text-lg"
              onClick={handleAisReportClick}
            >
              <FaFileAlt className="mr-2" /> AIS Report
            </button>
            <button 
              className="flex items-center bg-green-500 text-white px-8 py-4 rounded-lg hover:bg-green-600 transition duration-200 text-lg"
              onClick={() => window.open('http://127.0.0.1:5000/', '_blank')}
            >
              <FaComments className="mr-2" /> Chat with Lex
            </button>
          </section>
        </section>

        {/* Modal */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
            <div className="bg-green-50 p-8 rounded-lg shadow-lg transform transition-transform duration-300 scale-100 sm:scale-105 relative">
              <button 
                onClick={() => setShowPopup(false)} 
                className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
              >
                <FaTimes className="h-6 w-6" />
              </button>
              <h2 className="text-xl font-bold mb-4 text-center">Upload Document and Select Scheme</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-4">
                  <label className="block text-gray-700">Upload Document:</label>
                  <input 
                    type="file" 
                    accept="application/pdf" 
                    onChange={(e) => setPdfFile(e.target.files[0])} 
                    required 
                    className="border rounded-md p-2 w-full"
                  />
                </div>

                <div className="bg-green-100 p-4 rounded-lg mt-4">
                  <span className="font-semibold">Select Scheme:</span>
                  <div className="flex flex-col space-y-4 mt-2">
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        value="Old Regime" 
                        checked={selectedOption === 'Old Regime'} 
                        onChange={(e) => setSelectedOption(e.target.value)} 
                      />
                      <span className="ml-2">Old Regime</span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        value="New Regime" 
                        checked={selectedOption === 'New Regime'} 
                        onChange={(e) => setSelectedOption(e.target.value)} 
                      />
                      <span className="ml-2">New Regime</span>
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <button 
                    type="submit" 
                    className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Display Tax Info */}
        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {taxInfo && (
          <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-teal-100">
            <div className="bg-white shadow-2xl rounded-xl p-8 max-w-md w-full border-t-4 border-green-500 transform transition duration-500 hover:scale-105">
              <h3 className="text-2xl font-bold text-green-700 text-center mb-4">Your Tax Profile</h3>
              <p className="text-gray-600 text-center mb-8">
                Based on your uploaded document and selected scheme, here's a summary of your tax profile:
              </p>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md shadow-md border-l-4 border-purple-500">
                  <span className="font-semibold text-gray-800">Financial Year:</span>
                  <span className="text-gray-700">2024-2025</span>
                </div>
                <div className="p-4 bg-gray-50 rounded-md shadow-md border-l-4 border-blue-500">
                  <h4 className="font-semibold text-gray-800 mb-2">Summary of AIS Details:</h4>
                  <ul className="space-y-1">
                    <li className="flex items-center">
                      <span className="font-semibold text-gray-700 mr-2">Income:</span>
                      <span className="text-gray-600">₹{taxInfo.income}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="font-semibold text-gray-700 mr-2">Taxable Income:</span>
                      <span className="text-gray-600">₹{taxInfo.taxableIncome}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="font-semibold text-gray-700 mr-2">Tax:</span>
                      <span className="text-gray-600">₹{taxInfo.tax}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;