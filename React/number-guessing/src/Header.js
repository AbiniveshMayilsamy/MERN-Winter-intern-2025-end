const Header = ({ numberDisplay, numberWidth, handleAgain }) => {
  return (
    <header>
      <h1>Guess My Number!</h1>
      <p className="between">(Between 1 and 20)</p>
      <button className="btn again" onClick={handleAgain}>
        Again!
      </button>
      <div className="number" style={{ width: numberWidth }}>
        {numberDisplay}
      </div>
    </header>
  );
};

export default Header;
