import { Application } from 'pixi.js';
import { MemberContainer } from './member-container';
import { Member } from './member';

const STAGE_BACKGROUND_COLOR = '#1F232D';

export class MembersApplication {
  private application: Application;
  private memberContainers: MemberContainer[];

  constructor(members: Member[]) {
    this.application = new Application({
      backgroundColor: STAGE_BACKGROUND_COLOR,
      resizeTo: window,
      height: window.innerHeight,
      width: window.innerWidth,
    });
    this.application.stage.sortableChildren = true;

    this.memberContainers = members.map(
      (m) => new MemberContainer(m, this.application.screen)
    );

    this.memberContainers.forEach((m) =>
      this.application.stage.addChild(m.container)
    );

    this.update = this.update.bind(this);
    this.updateMemberMessage = this.updateMemberMessage.bind(this);
  }

  get view() {
    return this.application.view as unknown as Node;
  }

  run() {
    this.application.ticker.add(this.update);
  }

  stop() {
    this.application.ticker.remove(this.update);
  }

  update(delta: number) {
    this.memberContainers.forEach((m) => m.update(delta));
  }

  updateMemberMessage(memberId: string, message: string) {
    const memberContainer = this.memberContainers.find(
      (m) => m.id === memberId
    );

    if (!memberContainer) {
      return;
    }

    memberContainer.message = message;
  }
}
