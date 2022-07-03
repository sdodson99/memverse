import React, { useState } from 'react';
import styles from './SpaceMemberListingItem.module.css';
import { ExternalLinkIcon, ChevronDownIcon } from '@chakra-ui/icons';
import {
  useDisclosure,
  Collapse,
  FormControl,
  FormLabel,
  FormHelperText,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
  Switch,
  Box,
} from '@chakra-ui/react';

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

  const handleSpeedChanged = (
    _valueAsString: string,
    valueAsNumber: number
  ) => {
    if (isNaN(valueAsNumber)) {
      return onSpeedChanged(0);
    }

    return onSpeedChanged(valueAsNumber);
  };

  const handleDirectionDegreesChanged = (
    _valueAsString: string,
    valueAsNumber: number
  ) => {
    if (isNaN(valueAsNumber)) {
      return onDirectionDegreesChanged(0);
    }

    return onDirectionDegreesChanged(valueAsNumber);
  };

  const [focusedX, setFocusedX] = useState(false);
  const [currentValueX, setCurrentValueX] = useState(0);
  const handlePositionXChanged = (valueAsNumber: number) => {
    if (isNaN(valueAsNumber)) {
      setCurrentValueX(0);
      return onPositionXChanged(0);
    }

    setCurrentValueX(valueAsNumber);
    return onPositionXChanged(valueAsNumber);
  };

  const [focusedY, setFocusedY] = useState(false);
  const [currentValueY, setCurrentValueY] = useState(0);
  const handlePositionYChanged = (valueAsNumber: number) => {
    if (isNaN(valueAsNumber)) {
      setCurrentValueY(0);
      return onPositionYChanged(0);
    }

    setCurrentValueY(valueAsNumber);
    return onPositionYChanged(valueAsNumber);
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
              <NumberInput
                id="speed"
                mt="2"
                value={speedPixelsPerSecond}
                onChange={handleSpeedChanged}
                min={0}
                max={1000}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Flex>
            <Flex direction="column" mt="4">
              <FormLabel htmlFor="direction" mb="0">
                Direction
                <FormHelperText display="inline">{' (degrees)'}</FormHelperText>
              </FormLabel>
              <NumberInput
                id="direction"
                mt="2"
                value={Math.round(directionDegrees)}
                onChange={handleDirectionDegreesChanged}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Flex>
            <Flex direction="column" mt="4">
              <FormLabel htmlFor="posX" mb="0">
                Position X
              </FormLabel>
              <NumberInput
                id="posX"
                mt="2"
                value={!focusedX ? Math.round(x) : currentValueX}
                onChange={(_, value) => setCurrentValueX(value)}
                onFocus={() => {
                  setFocusedX(true);
                  setCurrentValueX(Math.round(x));
                }}
                onBlur={() => {
                  setFocusedX(false);
                  handlePositionXChanged(currentValueX);
                }}
                min={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Flex>
            <Flex direction="column" mt="4">
              <FormLabel htmlFor="posY" mb="0">
                Position Y
              </FormLabel>
              <NumberInput
                id="posY"
                mt="2"
                value={!focusedY ? Math.round(y) : currentValueY}
                onChange={(_, value) => setCurrentValueY(value)}
                onFocus={() => {
                  setFocusedY(true);
                  setCurrentValueY(Math.round(y));
                }}
                onBlur={() => {
                  setFocusedY(false);
                  handlePositionYChanged(currentValueY);
                }}
                min={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Flex>
          </Flex>
        </FormControl>
      </Collapse>
    </div>
  );
};

export default SpaceMemberListingItem;
