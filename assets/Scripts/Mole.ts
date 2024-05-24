import { _decorator, Component, Node, find, Vec3 } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('Mole')
export class Mole extends Component {

    public gameManager;
    tempTime = 0;

    @property(Number)
    public deletedTime = 1000;

    protected onEnable(): void {
        setTimeout(function() {
            this.node.active = false;
        }.bind(this), this.deletedTime)
    }

    start() {
        this.initListner();
        this.gameManager = find("GameManager").getComponent("GameManager");
    }

    initListner(){
        // input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        this.node.on(Node.EventType.TOUCH_START, () => {
            this.gameManager.addScore();
            this.node.active = false;
        })
    }
}
