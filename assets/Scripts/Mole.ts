import { _decorator, Component, Node, find, Vec3, Prefab, tween, Animation } from 'cc';
import { MoleGenerator } from './MoleGenerator';
import { GameManager } from './GameManager';
import { CatHandGenerator } from './InGame/CatHandGenerator';
const { ccclass, property } = _decorator;

@ccclass('Mole')
export class Mole extends Component {

    private gameManager:GameManager;

    private animation: Animation;

    private moleGenerator: MoleGenerator;
    private catHandGenerator: CatHandGenerator;

    @property(Number)
    public deletedTime: number = 1000;
    private despawnTimeId: number;
    private delayAnimationId: number;

    private isCanTouch: boolean;
    
    start() {
        console.log("Start");
        this.initListner();
        this.gameManager = find("GameManager").getComponent(GameManager);
        this.moleGenerator = find("Canvas").getChildByName("MoleGenerator").getComponent(MoleGenerator);
        this.catHandGenerator = find("Canvas").getChildByName("CatHandGenerator").getComponent(CatHandGenerator);
        console.log(this.moleGenerator.name, this.catHandGenerator.name);

        this.animation = this.getComponent(Animation);
        
        this.animation.defaultClip = this.animation.clips[3];
        this.animation.play();
        
        this.isCanTouch = false;

    }
    
    public Spawn()
    {
        if (!this.animation)
            this.animation = this.getComponent(Animation);
        
        this.animation.defaultClip = this.animation.clips[0];
        this.animation.play();

        this.isCanTouch = true;

        this.despawnTimeId = setTimeout(function() {
            this.despawnMole();
        }.bind(this), this.deletedTime);
    }


    initListner(){
        // input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        this.node.on(Node.EventType.TOUCH_START, () => {
            if (this.isCanTouch) {
                clearTimeout(this.despawnTimeId);
                this.despawnMole();

                this.isCanTouch = false;
                
                this.gameManager.addScore();
                this.catHandGenerator.generateEffect(this.node.parent.position);
            }
        })
    }
    
    despawnMole() {
        if (this.isCanTouch) {
            clearTimeout(this.delayAnimationId);
            this.delayAnimationId = setTimeout(function() {
                this.moleGenerator.despawnMole(this);
            }.bind(this), 1000);

            // this.moleGenerator.despawnMole(this);
    
            this.animation.defaultClip = this.animation.clips[2];
            this.animation.play();
        }
    }
}
