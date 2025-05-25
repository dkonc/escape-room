import { useState } from "react";
import { useNavigate } from "react-router-dom";
import pb from "../pb";

const Home = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const records = await pb.collection("access").getFullList({
        filter: `password="${input}"`,
      });

      if (records.length > 0) {
        navigate("/next-room");
      } else {
        navigate("/failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h1 className="text-xl">Enter the password to continue:</h1>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="p-2 rounded text-black"
        />
        <button type="submit" className="bg-blue-600 px-4 py-2 rounded">
          Submit
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default Home;
