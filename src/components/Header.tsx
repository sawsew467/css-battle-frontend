import Logo from "../assets/images/header/logo.svg";

function Header() {
  return (
    <div className="w-[100vw] h-[64px] px-4 bg-black flex items-center justify-between">
      <a href="/">
        <img src={Logo}></img>
      </a>
      <div className="bg-slate-700 px-3 py-2 flex flex-row items-center gap-3 rounded-md cursor-pointer hover:bg-slate-600 transition-all">
        <img
          className="w-7 h-7 rounded-full object-fit"
          src="https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-6/279078416_3068619873468458_6489132673043206887_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=TW_0aSAOXY4AX-xoS9m&_nc_oc=AQkRjGpQUueH4uEazun8NZyKZf-y9MSw7HQw-1K2K_aYhYsTzQdct9AwUZzK5S2lGKFUwHDKiImREVpDILPcfbd6&_nc_ht=scontent.fdad1-3.fna&oh=00_AfASJfy8YABPY8hzjhBMl5_9_wbcTbKQLobEl1bs90uiCg&oe=644D930A"
        ></img>
        <p className="text-white font-semibold">DE170145</p>
        <i className="fa-sharp fa-solid fa-caret-down text-slate-400"></i>
      </div>
    </div>
  );
}

export default Header;
