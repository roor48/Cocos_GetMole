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

    @property(ImageAsset)
    private cursorImage : ImageAsset = null;

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

        const canvas = document.getElementById("GameCanvas");
        // 기본 커서 지정 x: 35, y: 30
        // 로드 실패 시 auto(기본값)로 로드
        canvas.style.cursor = `url("${this.cursorImage.nativeUrl}") 35 30, auto`;
    }

    public onGameOver()
    {
        this.gameFinishPanel.active = true;
    }
}
