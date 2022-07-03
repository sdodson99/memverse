import React from 'react';
import styles from './SpaceMemberListingItem.module.css';
import { ExternalLinkIcon, ChevronDownIcon } from '@chakra-ui/icons';
import {
  useDisclosure,
  Collapse,
  FormControl,
  FormLabel,
  FormHelperText,
  Flex,
  Switch,
  Box,
} from '@chakra-ui/react';
import RealTimeNumberInput from '../RealTimeNumberInput/RealTimeNumberInput';

export type SpaceMemberListingItemProps = {
  channelId: string;
  username: string;
  photoUrl: string;
  message?: string;
  paused: boolean;
  onPause: () => void;
  onUnpause: () => void;
  isShowingDetails: boolean;
  onShowDetails: () => void;
  onHideDetails: () => void;
  speedPixelsPerSecond: number;
  onSpeedChanged: (value: number) => void;
  directionDegrees: number;
  onDirectionDegreesChanged: (value: number) => void;
  x: number;
  onPositionXChanged: (value: number) => void;
  y: number;
  onPositionYChanged: (value: number) => void;
};

const SpaceMemberListingItem = ({
  channelId,
  username,
  photoUrl,
  message,
  paused,
  onPause,
  onUnpause,
  isShowingDetails,
  onShowDetails,
  onHideDetails,
  speedPixelsPerSecond,
  onSpeedChanged,
  directionDegrees,
  onDirectionDegreesChanged,
  x,
  onPositionXChanged,
  y,
  onPositionYChanged,
}: SpaceMemberListingItemProps) => {
  const { isOpen, onToggle } = useDisclosure();

  const handleTogglePause = () => {
    if (paused) {
      return onUnpause();
    }

    return onPause();
  };

  const handleToggleShowDetails = () => {
    if (isShowingDetails) {
      return onHideDetails();
    }

    return onShowDetails();
  };

  const channelLink = `https://www.youtube.com/channel/${channelId}`;

  return (
    <div
      className={styles.spaceMemberListingItem}
      data-testid="SpaceMemberListingItem"
    >
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        alignItems="center"
        justifyContent={{ sm: 'space-between' }}
        wordBreak="break-word"
        textAlign="center"
      >
        <Flex direction={{ base: 'column', sm: 'row' }} alignItems="center">
          <img
            className={styles.avatar}
            src={photoUrl}
            alt={`${username} Avatar`}
            referrerPolicy="no-referrer"
          />
          <Flex
            direction="column"
            textAlign={{ base: 'center', sm: 'left' }}
            ml={{ sm: '4' }}
            mt={{ base: '2', sm: '0' }}
          >
            <div className={styles.usernameLine}>
              <span data-testid="SpaceMemberListingItemUsername">
                {username}
              </span>
              <a
                href={channelLink}
                target="_blank"
                rel="noreferrer"
                className={styles.channelLink}
              >
                <ExternalLinkIcon aria-label="Go to channel" />
              </a>
            </div>

            {message && <Box mt="1">{message}</Box>}
          </Flex>
        </Flex>

        <Box mt={{ base: '1', sm: '0' }}>
          <button
            className={`${styles.toggleChevron} ${isOpen && styles.open}`}
            onClick={onToggle}
          >
            <ChevronDownIcon h={10} w={10} aria-label="View settings" />
          </button>
        </Box>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <FormControl
          mt={{ base: '2', sm: '5' }}
          p={'1'}
          display="flex"
          flexDirection="column"
        >
          <Flex direction="column">
            <Flex direction="row" alignItems="center">
              <Switch
                id="pause"
                isChecked={paused}
                onChange={handleTogglePause}
              />
              <FormLabel htmlFor="pause" ml="2" mb="0">
                Pause
              </FormLabel>
            </Flex>
            <Flex direction="row" alignItems="center" mt="4">
              <Switch
                id="showDetails"
                isChecked={isShowingDetails}
                onChange={handleToggleShowDetails}
              />
              <FormLabel htmlFor="showDetails" ml="2" mb="0">
                Show details
              </FormLabel>
            </Flex>
            <Flex direction="column" mt="4">
              <FormLabel htmlFor="speed" mb="0">
                Speed
                <FormHelperText display="inline">
                  {' (pixels per second)'}
                </FormHelperText>
              </FormLabel>
              <RealTimeNumberInput
                id="speed"
                mt="2"
                value={Math.round(speedPixelsPerSecond)}
                onComplete={(value: number) => onSpeedChanged(value)}
                min={0}
                max={1000}
              />
            </Flex>
            <Flex direction="column" mt="4">
              <FormLabel htmlFor="direction" mb="0">
                Direction
                <FormHelperText display="inline">{' (degrees)'}</FormHelperText>
              </FormLabel>
              <RealTimeNumberInput
                id="direction"
                mt="2"
                value={Math.round(directionDegrees)}
                onComplete={(value: number) => onDirectionDegreesChanged(value)}
                min={0}
              />
            </Flex>
            <Flex direction="column" mt="4">
              <FormLabel htmlFor="posX" mb="0">
                Position X
              </FormLabel>
              <RealTimeNumberInput
                id="posX"
                mt="2"
                value={Math.round(x)}
                onComplete={(value: number) => onPositionXChanged(value)}
                min={0}
              />
            </Flex>
            <Flex direction="column" mt="4">
              <FormLabel htmlFor="posY" mb="0">
                Position Y
              </FormLabel>
              <RealTimeNumberInput
                id="posY"
                mt="2"
                value={Math.round(y)}
                onComplete={(value: number) => onPositionYChanged(value)}
                min={0}
              />
            </Flex>
          </Flex>
        </FormControl>
      </Collapse>
    </div>
  );
};

export default SpaceMemberListingItem;
