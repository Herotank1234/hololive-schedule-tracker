import "./Header.css";
import icon from "../images/holo_icon.png"

function Header() {
  return(
    <div className="Header">
      <div className="Container">
        <div className="Icon">
          <img src={icon} height="40"/>
        </div>
        <div className="Title">
          <h4 className="NoMargin">hololive production schedule</h4>
        </div>
      </div>
    </div>
  );
}

export default Header;