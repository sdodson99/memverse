import * as functions from 'firebase-functions';
import { Request, Response } from 'firebase-functions';
import { when } from 'jest-when';
import { CreateUserIfNotExistsCommand } from '../../services/create-user-if-not-exists';
import { UpdateUserClaimsCommand } from '../../services/update-user-claims';
import { IsYouTubeMemberQuery } from '../../services/is-youtube-member';
import { YouTubeChannel } from '../../services/youtube-channel/youtube-channel';
import { AccessTokenGenerator } from '../../services/access-tokens/access-token-generator';
import { LoginHandler } from '../login-handler';
import { GenerateAccessTokenCommand } from '../../services/generate-access-token';

describe('LoginHandler', () => {
  let handler: LoginHandler;

  let mockYouTubeChannelQueryExecute: jest.Mock;
  let mockIsYouTubeMemberQueryExecute: jest.Mock;
  let mockAccessTokenGeneratorGenerate: jest.Mock;
  let mockCreateUserIfNotExistsCommandExecute: jest.Mock;
  let mockUpdateUserClaimsCommandExecute: jest.Mock;
  let mockGenerateAccessTokenCommandExecute: jest.Mock;

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

    mockUpdateUserClaimsCommandExecute = jest.fn();
    const updateUserClaimsCommand = {
      execute: mockUpdateUserClaimsCommandExecute,
    } as unknown as UpdateUserClaimsCommand;

    mockGenerateAccessTokenCommandExecute = jest.fn();
    const generateAccessTokenCommand = {
      execute: mockGenerateAccessTokenCommandExecute,
    } as unknown as GenerateAccessTokenCommand;

    handler = new LoginHandler(
      youTubeChannelQuery,
      isYouTubeMemberQuery,
      accessTokenGenerator,
      createUserIfNotExistsCommand,
      updateUserClaimsCommand,
      generateAccessTokenCommand,
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

      describe('when user is member', () => {
        beforeEach(() => {
          when(mockIsYouTubeMemberQueryExecute)
            .calledWith(channel.id)
            .mockReturnValue(true);
        });

        it('should attempt to create user if they do not exist', async () => {
          await handler.handle(req, res);

          expect(mockCreateUserIfNotExistsCommandExecute).toBeCalledWith(
            channel.id,
            {
              displayName: channel.displayName,
              photoUrl: channel.photoUrl,
            }
          );
        });

        it('should update user claims with member as of date', async () => {
          await handler.handle(req, res);

          expect(mockUpdateUserClaimsCommandExecute.mock.calls[0][0]).toBe(
            channel.id
          );
          expect(
            mockUpdateUserClaimsCommandExecute.mock.calls[0][1].memberAsOf
          ).toBeDefined();
        });

        it('should return access token for authenticated user', async () => {
          const accessToken = { token: '123' };
          when(mockAccessTokenGeneratorGenerate)
            .calledWith(channel.id)
            .mockReturnValue(accessToken);
          const customAccessToken = 'customAccessToken123';
          when(mockGenerateAccessTokenCommandExecute)
            .calledWith(channel.id)
            .mockReturnValue(customAccessToken);

          await handler.handle(req, res);

          expect(res.send).toBeCalledWith({
            ...accessToken,
            accessToken: customAccessToken,
          });
        });
      });
    });
  });
});
