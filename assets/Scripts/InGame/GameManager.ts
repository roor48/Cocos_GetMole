import { _decorator, Component, Node, Label, CCInteger, ImageAsset } from 'cc';
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

    currentScore:number;

    protected start(): void {
        this.init();
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
        this.gameFinishLabel.string = `축하합니다!\n${this.currentScore} points를 획득 하였습니다`;
        this.gameFinishPanel.active = true;
    }
}
