import './App.css';
import GameList from './components/GamesList';
import PlayersList from './components/PlayersList';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <h1 id="title">Scoreboard giochi all'italiana</h1>
      <PlayersList/>
      <GameList />
    </>
  );
}

export default App;
