import { Link } from "react-router-dom"; 

const Error = () => {
  return (
    <main className="flex items-center justify-center min-h-screen w-full px-4">
      <div className="flex flex-col items-center text-center gap-4">
        <h1 className="text-6xl md:text-8xl font-bold text-[var(--color-light-main)]">
          404
        </h1>

        <p className="text-base md:text-lg text-[var(--color-light-main)] opacity-80">
          Page not found
        </p>

        <Link
          to="/dashboard"
          className="mt-2 bg-[var(--color-light-main)] text-white font-bold px-6 py-2.5 rounded-2xl
                     transition-all duration-200
                     hover:opacity-90 hover:scale-105 active:scale-95
                     focus:outline-none focus:ring-2 focus:ring-[var(--color-light-main)] focus:ring-offset-2"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
};

export default Error