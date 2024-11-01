import { Game } from '@prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import { GameStatusBadge } from '../_components';

const GameDetails = ({ game }: { game: Game}) => {
  return (
      <>
          <Heading>{game.title}</Heading>
          <Flex gap="2" my="2" align="center">
              <GameStatusBadge status={game.result} />
              <Text size="1">{game.eventDate.toDateString()}</Text>
          </Flex>
          {game.event && (
              <Flex gap="2" my="2" align="center">
                  <Text>Event:</Text>
                  <Text>{game.event}</Text>
              </Flex>
          )}
          <Flex gap="2" my="2" align="center">
              <Text>White:</Text>
              <Text>{game.white}</Text>
          </Flex>
          <Flex gap="2" my="2" align="center">
              <Text>Black:</Text>
              <Text>{game.black}</Text>
          </Flex>
          <Card>{game.moves}</Card>
      </>
  );
}

export default GameDetails