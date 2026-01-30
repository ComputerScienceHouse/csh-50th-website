import { useEffect } from "react";

const Registration = () => {
  useEffect(() => {
    // Redirect to the Google Forms URL
    window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLSej0P2wOo8jeijvSJdIkvamh63844aDeJyNADBRQzkajQXVtQ/viewform?usp=dialog";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting to registration form...</p>
    </div>
  );
};

export default Registration;
