import { _decorator, Component, Node, Label, CCInteger } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Node)
    private gameFinishPanel;

    @property({
        type: Label
    })
    private scoreLabel;

    currentScore:number;

    protected start(): void {
        this.reset();
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

    reset()
    {
        this.updateScore(0);
    }

    public onGameOver()
    {
        this.gameFinishPanel.active = true;
    }
}
