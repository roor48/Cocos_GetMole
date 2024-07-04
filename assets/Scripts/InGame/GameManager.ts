import { _decorator, Component, Node, Label, RichText, AudioSource, director } from 'cc';
import { UserSettings } from '../UserSettings';
import { UserData } from '../UserData';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Node)
    private gameFinishPanel;

    private audioSource: AudioSource;

    @property({
        type: Label
    })
    private scoreLabel;
    @property(Label)
    public gameFinishLabel;

    @property(RichText)
    public gameFinishText;

    @property(Node)
    public pointGetText;

    currentScore:number;

    protected start(): void {
        this.init();

        this.audioSource = this.getComponent(AudioSource);
        if (UserSettings.instance.isSoundOn) {
            this.getComponent(AudioSource).play();
        }
    }

    addScore()
    {
        this.updateScore(this.currentScore + 1);
    }

    updateScore(score: number)
    {
        this.currentScore = score;

        if (this.currentScore == 45){
            this.currentScore = 100;
        }

        this.scoreLabel.string = this.currentScore.toString();
    }

    init()
    {
        this.updateScore(0);
    }

    public onGameOver()
    {
        this.gameFinishText.string = '<color=#EB00FF>축하합니다!</color>\n' +
                                     `<size=45><color=#00ff00>${this.currentScore}</color> <color=#0fffff>포인트 획득!</color></size>`;
        // this.gameFinishLabel.string = `축하합니다!\n${this.currentScore} points를 획득 하였습니다`;
        UserData.instance.getUserService().endGame(UserData.instance.getUserData(), this.currentScore);
        if(UserData.instance.getRemainTry() == 0){
            this.pointGetText.active = true;
        }
        this.gameFinishPanel.active = true;
    }

    public onExitBtn() {
        this.audioSource.stop();
        UserData.instance.getUserService().getPointAndStop(UserData.instance.getUserData());
        window.location.href= "https://www.balgurak.com";
    }

    public onRestartBtn(){
        this.audioSource.stop();
        
        director.loadScene("Main");
    }
}
