import { Message } from '../../models/message';

export type MemberIdToMessageMap = Record<string, Message | null>;
