import { _decorator, Component, Node, find, Animation, AudioSource } from 'cc';
import { GameManager } from './GameManager';
import { MoleGenerator } from './MoleGenerator';
import { GenerateHammer } from '././HammerGenerator';
import { UserSettings } from '../UserSettings';
const { ccclass, property } = _decorator;

@ccclass('Mole')
export class Mole extends Component {

    private gameManager:GameManager;

    private animation: Animation;

    private audioSource: AudioSource;

    private moleGenerator: MoleGenerator;
    private hammerGenerator: GenerateHammer;

    @property(Number)
    public deletedTime: number = 1000;
    private despawnTimeId: number;

    private isCanTouch: boolean;
    
    start() {
        this.initListner();
        this.gameManager = find("GameManager").getComponent(GameManager);
        this.moleGenerator = find("Canvas").getChildByName("MoleGenerator").getComponent(MoleGenerator);
        this.hammerGenerator = find("Canvas").getChildByName("HammerGenerator").getComponent(GenerateHammer);

        this.animation = this.getComponent(Animation);
        this.audioSource = this.getComponent(AudioSource);
        
        this.animation.defaultClip = this.animation.clips[3];
        this.animation.play();
        
        this.isCanTouch = false;


        this.animation.on(Animation.EventType.FINISHED, this.onAnimationFinished, this);

        this.node.active = false;
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

                if (UserSettings.instance.isSoundOn) {
                    this.audioSource.play();
                }

                this.isCanTouch = false;
                
                this.gameManager.addScore();
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
