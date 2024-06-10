import { _decorator, Component, Node, find, Vec3, Prefab, tween } from 'cc';
import { MoleGenerator } from './MoleGenerator';
import { GameManager } from './GameManager';
import { CatHandGenerator } from './InGame/CatHandGenerator';
const { ccclass, property } = _decorator;

@ccclass('Mole')
export class Mole extends Component {

    private gameManager:GameManager;

    private moleGenerator: MoleGenerator;
    private parentIdx: number;
    private catHandGenerator: CatHandGenerator;

    @property(Number)
    public deletedTime: number = 1000;
    private timeOutId: number;
    
    onEnable(): void {
        this.timeOutId = setTimeout(function() {
            this.despawnMole();
        }.bind(this), this.deletedTime);
    }

    public Init(mg:MoleGenerator, pi:number, ch:CatHandGenerator)
    {
        this.moleGenerator = mg;
        this.parentIdx = pi;
        this.catHandGenerator = ch;
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
            
            this.catHandGenerator.generateEffect(this.node.parent.position);
        })
    }
    
    despawnMole()
    {
        this.moleGenerator.despawnMole(this.parentIdx);
        this.node.active = false;

    }
}
