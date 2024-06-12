import { _decorator, Component, Animation } from 'cc';
const { ccclass } = _decorator;

@ccclass('Hammer')
export class Hammer extends Component {
    private animation: Animation;

    protected onEnable(): void {
        if (!this.animation)
            this.animation = this.getComponent(Animation);
        this.animation.play();

        setTimeout(function() {
            this.node.active = false;
        }.bind(this), 500);
    }
}
