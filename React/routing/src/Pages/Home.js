import { useParams } from "react-router-dom";

const Home = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Home Page</h1>
      {id && <h2>Page ID: {id}</h2>}
    </div>
  );
};

export default Home;
