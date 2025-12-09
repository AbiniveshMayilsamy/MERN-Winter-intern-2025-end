const GuessInput = ({ guess, setGuess, handleCheck }) => {
  return (
    <section className="left">
      <input
        type="number"
        className="guess"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
      />
      <button className="btn check" onClick={handleCheck}>
        Check!
      </button>
    </section>
  );
};

export default GuessInput;
