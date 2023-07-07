const Header = ({ currentTheme, handleThemeToggle }) => {
  const moonIcon = "https://i.ibb.co/xqD9bx0/icon-moon.png";
  const sunIcon = "https://i.ibb.co/68DMwYf/icon-sun.png";

  const toggleButtonIcon = currentTheme === "light" ? moonIcon : sunIcon;

  return (
    <div className="header">
      <h1>TODO</h1>
      <label
        style={{ backgroundImage: `url(${toggleButtonIcon})` }}
        htmlFor="theme-toggle"
      ></label>
      <input onChange={handleThemeToggle} type="checkbox" id="theme-toggle" />
    </div>
  );
};

export default Header;
