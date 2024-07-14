const Footer = () => {
  return (
    <footer className="bg-[#1c1c24] text-white py-4 text-center">
      <div className="flex justify-center space-x-4">
        <a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-500 hover:underline"
        >
          LinkedIn
        </a>
        <a
          href="mailto:your-email@example.com"
          className="text-orange-500 hover:underline"
        >
          Mail
        </a>
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:underline"
        >
          GitHub
        </a>
      </div>
      <p className="mt-4 text-sm">
        &copy; {new Date().getFullYear()} VideoPlaya. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
