import { useState } from "react";

function App() {
  const [position, setPosition] = useState("");
  const [players, setPlayers] = useState([]);

  const handleSearch = async () => {
    const res = await fetch(
      `http://localhost:3000/search?position=${position}&min_xg=0.1&min_xa=0.1`
    );
    const data = await res.json();
    setPlayers(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">⚽ YouScout Demo</h1>
      <input
        className="p-2 border rounded w-64 mb-2"
        placeholder="Posición (Forward, Midfielder...)"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Buscar jugadores
      </button>

      <div className="mt-6 w-full max-w-2xl">
        {players.map((p, i) => (
          <div key={i} className="bg-white shadow p-4 mb-2 rounded">
            <h2 className="text-xl font-bold">{p.name}</h2>
            <p>{p.team} - {p.league}</p>
            <p>Posición: {p.position} | Edad: {p.age}</p>
            <p>xG90: {p.xg90} | xA90: {p.xa90}</p>
            <p>Minutos jugados: {p.minutes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
