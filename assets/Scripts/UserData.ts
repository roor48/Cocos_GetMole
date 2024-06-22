import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('UserData')
export class UserData extends Component {
    private static _instance: UserData = null;
    public static get instance(): UserData {
        if (!this._instance) {
            console.error("No Instance In UserData");
        }
        return this._instance;
    }

    @property(String)
    private userID: string = "";

    public getUserData(): string {
        return this.userID;
    }

    onLoad() {
        if (UserData._instance) {
            // 이미 인스턴스가 존재하면, 중복된 컴포넌트를 파괴
            this.destroy();
            return;
        }

        this.userID = window.localStorage.getItem("user-info");
        window.localStorage.removeItem("user-info");

        // 인스턴스 설정
        UserData._instance = this;
        this.node.name = "UserData";

        // 씬 전환 시에도 인스턴스를 유지
        // cc.game.addPersistRootNode(this.node);
        director.addPersistRootNode(this.node);
    }
}
