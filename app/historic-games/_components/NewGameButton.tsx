import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react'

const NewGameButton = () => {
  return (
      <div className="mb-5">
          <Button>
              <Link href="/historic-games/new">New Game</Link>
          </Button>
      </div>
  );
}

export default NewGameButton