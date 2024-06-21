import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UserSettings')
export class UserSettings extends Component {
    private static _instance: UserSettings = null;
    public static get instance(): UserSettings {
        if (!this._instance) {
            let newNode = new Node();
            newNode.addComponent(UserSettings);
            newNode.parent = director.getScene().getChildByName("Canvas").parent;
        }
        return this._instance;
    }

    @property(Boolean)
    public _isSoundOn: boolean = true;
    public get isSoundOn(): boolean {
        return this._isSoundOn;
    }
    public set_isSoundOn(val: boolean) {
        this._isSoundOn = val;
    }

    onLoad() {
        if (UserSettings._instance) {
            // 이미 인스턴스가 존재하면, 중복된 컴포넌트를 파괴
            this.destroy();
            return;
        }

        // 인스턴스 설정
        UserSettings._instance = this;
        this.node.name = "UserSettings";

        // 씬 전환 시에도 인스턴스를 유지
        // cc.game.addPersistRootNode(this.node);
        director.addPersistRootNode(this.node);
    }
}
