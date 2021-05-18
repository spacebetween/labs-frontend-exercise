import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Pending = () => {
  const router = useRouter()
  const { gameId } = router.query

  useEffect(() => {
    setTimeout(() => document.location = `/games/${gameId}`, 5000)
  }, [])

  return (
    <div>
      <h3>Waiting for other players to join...</h3>
      <p>Share the game ID { gameId } with the other players so they can join this game.</p>
    </div>
  )

}

export default Pending
