import { _decorator, Component, find, Node, Sprite, SpriteFrame } from 'cc';
import { UserSettings } from '../UserSettings';
import { MainMenuManager } from './MainMenuManager';
const { ccclass, property } = _decorator;

@ccclass('SoundBtn')
export class SoundBtn extends Component {
    @property([SpriteFrame])
    public sprites: SpriteFrame[] = [];

    private spriteRenderer: Sprite = null;


    protected start(): void {
        this.spriteRenderer = this.getComponent(Sprite);

        this.node.on(Node.EventType.TOUCH_START, this.onClick.bind(this));

        this.spriteRenderer.spriteFrame = UserSettings.instance.isSoundOn ? this.sprites[1] : this.sprites[0];
    }

    private onClick(): void {
        this.spriteRenderer.spriteFrame = UserSettings.instance.isSoundOn ? this.sprites[0] : this.sprites[1];
        
        let mainMenuManager = find("MainMenuManager")
        if (mainMenuManager) {
            if (UserSettings.instance.isSoundOn) {
                mainMenuManager.getComponent(MainMenuManager).audioSource.stop();
            } else {
                mainMenuManager.getComponent(MainMenuManager).audioSource.play();
            }
        }

        UserSettings.instance.set_isSoundOn(!UserSettings.instance.isSoundOn);
    }
}
