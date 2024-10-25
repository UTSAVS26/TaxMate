export function Dialog({ children }) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
        <div className="bg-white p-4 rounded">{children}</div>
      </div>
    );
  }
  
  export function DialogTrigger({ children, onClick }) {
    return <button onClick={onClick}>{children}</button>;
  }
  
  export function DialogTitle({ children }) {
    return <h2 className="text-xl font-bold">{children}</h2>;
  }
  
  export function DialogContent({ children }) {
    return <div>{children}</div>;
  }
  
  export function DialogHeader({ children }) {
    return <div className="border-b pb-2">{children}</div>;
  }
  