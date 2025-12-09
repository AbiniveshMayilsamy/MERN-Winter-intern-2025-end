import ButtonContainer from "./ButtonContainer";

const Counter = ({ val, handleIncrement, handleDecrement }) => {
  return (
    <div className="Counter">
      <h1>Counter</h1>
      <h1>{val}</h1>
      <ButtonContainer
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
      />
    </div>
  );
};

export default Counter;
