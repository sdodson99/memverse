import { Application } from 'pixi.js';
import { MemberContainer } from './member-container';
import { Member } from '@/entities/member';
import { ShowcaseBackgroundLogoSprite } from './showcase-background-logo-sprite';

export class MembersApplication {
  private application: Application;
  private memberContainers: MemberContainer[];
  private logoSprite: ShowcaseBackgroundLogoSprite;

  constructor(members: Member[], mountElement: HTMLElement) {
    this.application = new Application({
      backgroundAlpha: 0,
      resizeTo: mountElement ?? window,
    });
    this.application.stage.sortableChildren = true;

    const fixMobileScrolling = () => {
      this.application.renderer.plugins.interaction.autoPreventDefault = false;
      const applicationStyle = this.application.view.style;
      if (applicationStyle) {
        applicationStyle.touchAction = 'auto';
      }
    };

    fixMobileScrolling();

    this.memberContainers = members.map(
      (m) => new MemberContainer(m, this.application.screen)
    );

    this.memberContainers.forEach((m) =>
      this.application.stage.addChild(m.container)
    );

    this.logoSprite = new ShowcaseBackgroundLogoSprite(
      '/logo-light.png',
      this.application.screen
    );
    this.application.stage.addChild(this.logoSprite.sprite);

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
    this.logoSprite.update();

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
