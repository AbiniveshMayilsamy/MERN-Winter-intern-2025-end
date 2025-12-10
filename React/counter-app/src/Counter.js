import ButtonContainer from "./ButtonContainer";
import "./App.css";

const Counter = ({ val, handleIncrement, handleDecrement, data, posts }) => {
  let v = null;
  if (val < 0) {
    v = <p>Negative Value</p>;
  } else if (val > 5) {
    v = <p>Positive Value</p>;
  }
  return (
    <div className="Counter">
      <h1>Counter</h1>
      <h1>{val}</h1>
      <p
        style={{
          border: "1px solid red",
          color: "red",
          fontSize: "13px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
      {v}
      {/* {val < 0 ? (
        <h1
          style={{
            border: "1px solid red",
            color: "red",
            fontSize: "13px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Negative Value
        </h1>
      ) : null} */}
      <ButtonContainer
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
      />
      <br />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>contact</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <br />
      <table>
        <thead>
          <tr>
            <th>UserId</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {posts &&
            posts.map((post) => (
              <tr key={post.id}>
                <td>{post.userId}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Counter;
