import { _decorator, Component, Node, find, Vec3 } from 'cc';
import { MoleGenerator } from './MoleGenerator';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('Mole')
export class Mole extends Component {

    private gameManager:GameManager;

    private moleGenerator: MoleGenerator;
    private parentIdx;

    @property(Number)
    public deletedTime: number = 1000;
    private timeOutId: number;
    
    onEnable(): void {
        this.timeOutId = setTimeout(function() {
            this.despawnMole();
        }.bind(this), this.deletedTime)
    }

    public Init(mg:MoleGenerator, pi:number)
    {
        this.moleGenerator = mg;
        this.parentIdx = pi;
    }

    start() {
        this.initListner();
        this.gameManager = find("GameManager").getComponent(GameManager);
    }

    initListner(){
        // input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        this.node.on(Node.EventType.TOUCH_START, () => {
            clearTimeout(this.timeOutId);
        
            this.despawnMole();
            this.gameManager.addScore();
        })
    }
    
    despawnMole()
    {
        this.moleGenerator.despawnMole(this.parentIdx);
        this.node.active = false;
    }
}
