import * as functions from 'firebase-functions';
import { Request, Response } from 'firebase-functions';
import { when } from 'jest-when';
import { CreateUserIfNotExistsCommand } from '../../commands/create-user-if-not-exists';
import { IsYouTubeMemberQuery } from '../../queries/is-youtube-member';
import { YouTubeChannel } from '../../queries/youtube-channel/youtube-channel';
import { AccessTokenGenerator } from '../../services/access-tokens/access-token-generator';
import { LoginHandler } from '../login-handler';

describe('LoginHandler', () => {
  let handler: LoginHandler;

  let mockYouTubeChannelQueryExecute: jest.Mock;
  let mockIsYouTubeMemberQueryExecute: jest.Mock;
  let mockAccessTokenGeneratorGenerate: jest.Mock;
  let mockCreateUserIfNotExistsCommandExecute: jest.Mock;

  let req: Request;
  let res: Response;

  beforeEach(() => {
    mockYouTubeChannelQueryExecute = jest.fn();
    const youTubeChannelQuery = {
      execute: mockYouTubeChannelQueryExecute,
    };

    mockIsYouTubeMemberQueryExecute = jest.fn();
    const isYouTubeMemberQuery = {
      execute: mockIsYouTubeMemberQueryExecute,
    } as unknown as IsYouTubeMemberQuery;

    mockAccessTokenGeneratorGenerate = jest.fn();
    const accessTokenGenerator = {
      generate: mockAccessTokenGeneratorGenerate,
    } as unknown as AccessTokenGenerator;

    mockCreateUserIfNotExistsCommandExecute = jest.fn();
    const createUserIfNotExistsCommand = {
      execute: mockCreateUserIfNotExistsCommandExecute,
    } as unknown as CreateUserIfNotExistsCommand;

    handler = new LoginHandler(
      youTubeChannelQuery,
      isYouTubeMemberQuery,
      accessTokenGenerator,
      createUserIfNotExistsCommand,
      {
        info: jest.fn(),
        warn: jest.fn(),
      } as unknown as typeof functions.logger
    );

    req = {
      body: {},
    } as Request;
    res = {
      send: jest.fn(),
      sendStatus: jest.fn(),
    } as unknown as Response;
  });

  it('should return 401 if no access token', async () => {
    await handler.handle(req, res);

    expect(res.sendStatus).toBeCalledWith(401);
  });

  describe('with access token', () => {
    let accessToken: string;

    beforeEach(() => {
      accessToken = '123';
      req.body.accessToken = accessToken;
    });

    it('should return 401 if channel not found', async () => {
      when(mockYouTubeChannelQueryExecute)
        .calledWith(accessToken)
        .mockReturnValue(null);

      await handler.handle(req, res);

      expect(res.sendStatus).toBeCalledWith(401);
    });

    describe('when channel found', () => {
      let channel: YouTubeChannel;

      beforeEach(() => {
        channel = {
          id: 'channel123',
        };
        when(mockYouTubeChannelQueryExecute)
          .calledWith(accessToken)
          .mockReturnValue(channel);
      });

      it('should return 403 if channel is not member', async () => {
        when(mockIsYouTubeMemberQueryExecute)
          .calledWith(channel.id)
          .mockReturnValue(false);

        await handler.handle(req, res);

        expect(res.sendStatus).toBeCalledWith(403);
      });

      it('should return access token for authenticated user', async () => {
        const accessToken = 'accessToken';
        when(mockIsYouTubeMemberQueryExecute)
          .calledWith(channel.id)
          .mockReturnValue(true);
        when(mockAccessTokenGeneratorGenerate)
          .calledWith(channel.id)
          .mockReturnValue(accessToken);

        await handler.handle(req, res);

        expect(res.send).toBeCalledWith(accessToken);
      });
    });
  });
});
