import { _decorator, Component, Node, RichText } from 'cc';
import { UserData } from '../UserData';
const { ccclass, property } = _decorator;

@ccclass('UpdateNicknameTxt')
export class UpdateNicknameTxt extends Component {
    @property(String)
    private succesUser = new String;
    @property(String)
    private failUser = new String;

    @property(RichText)
    private userDataText = new RichText;
    @property(RichText)
    private remainTryText = new RichText;

    @property(Node)
    private failScreenNode = new Node;
    @property(Node)
    private startBtn = new Node;

    protected start(): void {
        UserData.instance.nicknameTxt = this;
        UserData.instance.LoadData();
    }

    public Load(){
        console.log("인증 중");
        if(UserData.instance.getHaveData() === 200){
            this.succesUser = `<color=black>${UserData.instance.getUserData()}님 어서오세요!</color>`
            this.userDataText.string = `${this.succesUser}`;
            this.remainTryText.string = `${UserData.instance.getRemainTry()}회 플레이 가능`;
            this.failScreenNode.active = false;
            this.startBtn.active = true;
            return;
        }
        this.failUser = `<color=black>잘못된 접근입니다.</color>`
        this.userDataText.string = `${this.failUser}`;
        this.failScreenNode.active = true;
        this.remainTryText.node.active = false;
        this.startBtn.active = false;
    }

}


