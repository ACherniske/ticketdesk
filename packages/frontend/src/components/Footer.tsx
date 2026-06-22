import acwordmark from '../assets/AC-Wordmark.svg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-bg text-text mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-14">
        <div className="flex flex-col items-center justify-center gap-5 text-center">
          <p className="text-sm text-text/70">
            Aiden Cherniske © {currentYear}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
