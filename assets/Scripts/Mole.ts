import { _decorator, Component, Node, find, Vec3 } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('Mole')
export class Mole extends Component {

    public gameManager;

    start() {
        this.gameManager = find("GameManager").getComponent("GameManager");
    }

    update(deltaTime: number) {
        
    }

    onLoad() {
        this.initListner();
    }

    initListner(){
        // input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        this.node.on(Node.EventType.TOUCH_START, () => {
            this.gameManager.addScore();
            this.node.destroy();
        })
    }
}
