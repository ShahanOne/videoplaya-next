const Navbar = ({ Nav1, Nav2, Nav3, Nav4, onNav1, onNav2, onNav3, onNav4 }) => {
  function handleHome() {
    window.location.reload();
  }
  return (
    <nav className="py-[1%] grid grid-cols-1 sm:grid-cols-2 px-4 font-fredoka bg-gradient-to-r bg-[#1b1b20]">
      <div className="py-2 text-center sm:text-start">
        <button
          className="text-[#f1f1f6] hover:text-[#ffffff] md:ml-6 text-3xl md:text-4xl"
          onClick={handleHome}
        >
          <img src="/videoplayer.png" width={128} alt="" />
        </button>
      </div>
      <div className="grid grid-cols-4 py-4">
        <button
          className="text-lg font-semibold border-none active:translate-y-0.5 text-[#f1f1f6] hover:text-[#ffffff]"
          onClick={onNav1}
        >
          {Nav1}
        </button>{' '}
        <button
          className="text-lg font-semibold border-none active:translate-y-0.5 text-[#f1f1f6] hover:text-[#ffffff]"
          onClick={onNav2}
        >
          {Nav2}
        </button>{' '}
        <button
          className="text-lg font-semibold border-none active:translate-y-0.5 text-[#f1f1f6] hover:text-[#ffffff]"
          onClick={onNav3}
        >
          {Nav3}
        </button>
        <button
          className="text-lg font-semibold border-none active:translate-y-0.5 text-[#f1f1f6] hover:text-[#ffffff]"
          onClick={onNav4}
        >
          {Nav4}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
