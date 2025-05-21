import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4 text-lg">
        Sorry, the page you are looking for does not exist.
      </p>

      <Link href="/">
        <span className="text-blue-500">Return Home</span>
      </Link>
    </div>
  );
};

export default NotFound;
