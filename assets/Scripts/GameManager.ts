import { _decorator, Component, Node, Label, CCInteger } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    @property({
        type: Label
    })
    public scoreLabel;

    currentScore:number;

    protected start(): void {
        this.reset();
    }

    update(deltaTime: number) {
        
    }

    addScore()
    {
        this.updateScore(this.currentScore + 1);
    }

    updateScore(score: number)
    {
        this.currentScore = score;

        this.scoreLabel.string = this.currentScore.toString();
    }

    reset()
    {
        this.updateScore(0);
    }
}
