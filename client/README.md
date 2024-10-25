Here's an updated README to reflect your project, layout, and functionalities for "TaxMate":

---

# TaxMate

TaxMate is a Next.js-based web application designed to simplify tax-related processes for users. Leveraging AI, it provides insights and recommendations by analyzing uploaded tax documents, such as AIS (Advanced Information System) files, and helps users make informed decisions on tax schemes and saving investments.

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
