// components/ui/card.js
export function Card({ children, className }) {
    return (
      <div className={`bg-white shadow-md rounded-lg ${className}`}>
        {children}
      </div>
    );
  }
  
  export function CardHeader({ children, className }) {
    return (
      <div className={`border-b p-4 ${className}`}>
        {children}
      </div>
    );
  }
  
  export function CardTitle({ children, className }) {
    return (
      <h2 className={`text-lg font-semibold ${className}`}>
        {children}
      </h2>
    );
  }
  
  export function CardContent({ children, className }) {
    return (
      <div className={`p-4 ${className}`}>
        {children}
      </div>
    );
  }  