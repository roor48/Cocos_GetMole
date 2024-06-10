import { _decorator, Color, Component, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CatHand')
export class CatHand extends Component {
    
    @property(Number)
    public deleteTime: number = 1000;

    onEnable(): void {
        setTimeout(function() {
            this.node.active = false;
        }.bind(this), this.deleteTime);
    }
}
