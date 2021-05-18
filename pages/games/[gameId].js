import Cookies from "cookies";
import { useRouter } from "next/router";
import { allPlayersJoined, getGame } from "../../src/gameStore";

export async function getServerSideProps(context) {
  const gameId = context.params.gameId;
  const cookies = new Cookies(context.req, context.res);
  const playerId = cookies.get("playerId");

  let gameState;
  try {
    gameState = getGame(gameId);
  } catch (err) {
    // game not found
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  if (!allPlayersJoined(gameState)) {
    return {
      redirect: {
        destination: `/games/${gameId}/pending`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      currentPlayer: gameState.players[playerId],
    },
  };
}

const Game = ({ currentPlayer: { cards, exchanged } }) => {
  const router = useRouter();
  const { gameId } = router.query;

  console.log(cards);

  return <p>Game: {gameId}</p>;
};

export default Game;
