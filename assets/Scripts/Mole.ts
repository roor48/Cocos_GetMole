import { _decorator, Component, Node, find, Animation } from 'cc';
import { GameManager } from './GameManager';
import { CatHandGenerator } from './InGame/CatHandGenerator';
import { MoleGenerator } from './MoleGenerator';
import { GenerateHammer } from './InGame/HammerGenerator';
const { ccclass, property } = _decorator;

@ccclass('Mole')
export class Mole extends Component {

    private gameManager:GameManager;

    private animation: Animation;

    private moleGenerator: MoleGenerator;
    private catHandGenerator: CatHandGenerator;
    private hammerGenerator: GenerateHammer;

    @property(Number)
    public deletedTime: number = 1000;
    private despawnTimeId: number;

    private isCanTouch: boolean;
    
    start() {
        this.initListner();
        this.gameManager = find("GameManager").getComponent(GameManager);
        this.moleGenerator = find("Canvas").getChildByName("MoleGenerator").getComponent(MoleGenerator);
        this.catHandGenerator = find("Canvas").getChildByName("CatHandGenerator").getComponent(CatHandGenerator);
        this.hammerGenerator = find("Canvas").getChildByName("HammerGenerator").getComponent(GenerateHammer);

        this.animation = this.getComponent(Animation);
        
        this.animation.defaultClip = this.animation.clips[3];
        this.animation.play();
        
        this.isCanTouch = false;


        this.animation.on(Animation.EventType.FINISHED, this.onAnimationFinished, this);
    }

    protected update(dt: number): void {
    }
    
    public Spawn() {
        if (!this.animation)
            this.animation = this.getComponent(Animation);
        
        this.animation.defaultClip = this.animation.clips[0];
        this.animation.play();
        
        this.isCanTouch = true;
        
        this.despawnTimeId = setTimeout(function() {
            this.animation.defaultClip = this.animation.clips[2];
            this.animation.play();
            
            this.animation.time
            }.bind(this), this.deletedTime);
    }
            
    private onAnimationFinished() {
        if (this.animation.defaultClip.name == "Death") {
            this.isCanTouch = false;
            this.moleGenerator.despawnMole(this);

            this.animation.defaultClip = this.animation.clips[3];
            this.animation.play();
        }
    }


    initListner(){
        this.node.on(Node.EventType.TOUCH_START, () => {
            if (this.isCanTouch) {
                clearTimeout(this.despawnTimeId);
                this.despawnMole();

                this.isCanTouch = false;
                
                this.gameManager.addScore();
                this.catHandGenerator.generateEffect(this.node.parent.position);
                this.hammerGenerator.generateHammer(this.node.parent.position);
            }
        })
    }
    
    despawnMole() {
        if (this.isCanTouch) {
            this.animation.defaultClip = this.animation.clips[2];
            this.animation.play();
        }
    }
}
