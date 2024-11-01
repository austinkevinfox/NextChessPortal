import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import { FaEdit } from 'react-icons/fa';

const EditGameButton = ({gameId}: {gameId: number}) => {
  return (
      <Button>
          <FaEdit />
          <Link href={`/historic-games/${gameId}/edit`}>Edit</Link>
      </Button>
  );
}

export default EditGameButton