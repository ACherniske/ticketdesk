import acwordmark from '../assets/AC-Wordmark.svg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-bg text-text mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-14">
        <div className="flex flex-col items-center justify-center gap-5 text-center">
          <div className="w-full flex justify-center">
            {/* Wordmark Asset: Reactive to system dark preference preferences */}
            <img
              src={acwordmark}
              alt="Aiden Cherniske"
              className="h-10 w-auto dark:invert mx-auto transition-all duration-200"
            />
          </div>

          <p className="text-sm text-text/70">
            © {currentYear}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
