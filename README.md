
# TaxMate

TaxMate is an intelligent, AI-powered web application designed to simplify tax filing and preparation for individuals and small business owners. By addressing the complexities of tax regulations and reducing the risk of manual entry errors, TaxMate helps users save time and avoid common filing challenges. It automates tax analysis through machine learning and provides guided support to streamline the tax filing process.

## Problem Overview

Filing taxes is often a complicated and time-consuming process, especially for those unfamiliar with tax regulations. Common challenges include:
- Expense Categorization: Difficulty in accurately categorizing expenses for tax purposes.
- Deduction Management: Risk of missing eligible deductions.
- Error Reduction: High potential for manual errors that can lead to penalties or missed refunds.
These challenges can lead to increased tax liabilities and added stress, which is why TaxMate is designed to simplify the process.

## How TaxMate Solves These Issues

The AI-Based Tax Filing Assistant in TaxMate allows users to upload their bank statements and other financial documents, securely analyzing them to generate an Annual Information Statement (AIS) report. This report categorizes and summarizes financial data, improving efficiency and reducing the time and effort required for tax filing. The app also features:
- Built-in Chatbot: Quick answers to tax-filing-related questions with reliable guidance on deductions, tax queries, and regulatory information.
- Automated Insights: The system's machine learning algorithms ensure accurate, personalized support tailored to each user’s financial profile.
By automating document analysis and providing accessible guidance, TaxMate helps users make informed financial decisions and file taxes accurately and confidently.

## Features

- **AIS Document Upload**: Upload AIS (or other tax-related documents) in PDF format to receive detailed, customized analysis.
- **Scheme Selection**: Choose between Old or New tax schemes for tailored insights.
- **User Profile Summary**: View personalized insights based on the selected scheme and uploaded document.
- **Responsive Design**: Accessible on all devices with a sleek, modern look and animated components.
- **Interactive Chat**: Integrated chatbot (Lex) for real-time tax assistance.

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS, Framer Motion, Lucide Icons
- **Components**: Built using Next.js components with a structured layout, Tailwind CSS styling for responsive design, and Framer Motion for animations.
  
## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/docs/installation)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/utsavs26/taxmate.git
   cd taxmate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app.

### File Structure

- **`components/`**: Contains reusable UI components (buttons, cards, dialog boxes).
- **`pages/`**: Houses main pages, with `HomePage.js` set up as the entry point for the landing page.
- **`public/`**: Contains images and icons used in the application.
- **`styles/`**: Contains global styling, including Tailwind configuration.

## Contributing

We welcome contributions! Please open an issue or submit a pull request to suggest improvements or report bugs.
