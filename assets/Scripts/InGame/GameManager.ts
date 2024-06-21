import { _decorator, Component, Node, Label, RichText, AudioSource } from 'cc';
import { UserSettings } from '../UserSettings';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Node)
    private gameFinishPanel;

    @property({
        type: Label
    })
    private scoreLabel;
    @property(Label)
    public gameFinishLabel;

    @property(RichText)
    public gameFinishText;

    currentScore:number;

    protected start(): void {
        this.init();

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

        if (score == 39){
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
        this.gameFinishPanel.active = true;
    }

    public onExitBtn() {
        console.log("onExitBtn");
    }
}
