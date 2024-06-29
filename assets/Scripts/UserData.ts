import { _decorator, Component, director, Node, sys } from 'cc';
import UserService from './UserService';
import { UpdateNicknameTxt } from './Main/UpdateNicknameTxt';
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

    @property(Number)
    private remainTry: number = 0;
    public getRemainTry(): number{
        return this.remainTry;
    }

    public nicknameTxt:UpdateNicknameTxt = null;

    private userService = new UserService;
    public getUserService():UserService{
        return this.userService;
    }

    public getHaveData():number{
        console.log(this.userService.getResultCode() === 200) 
        return this.userService.getResultCode();
    }

    protected onLoad() {
        if (UserData._instance) {
            // 이미 인스턴스가 존재하면, 중복된 컴포넌트를 파괴
            this.destroy();
            return;
        }
        UserData._instance = this;
        // 씬 전환 시에도 인스턴스를 유지
        // cc.game.addPersistRootNode(this.node);
        director.addPersistRootNode(this.node);
    }

    async LoadData(){
        // LocalStorage에서 데이터 읽기
        const userInfoString = location.href.split('?')[1];
        if (userInfoString) {
            console.log('User ID:', userInfoString);
            this.userID = userInfoString;
            // 필요한 작업 수행 (예: 게임 내 UI 업데이트)
            try {
                await this.userService.ApiRequest(this.userID);
                const userData = this.userService.getUserData();
                const resultCode = this.userService.getResultCode();
                this.remainTry  = this.userService.getRemainTry();   
    
                if (userData && resultCode === 200) {
                    console.log("resultCode : ", this.userService.getResultCode());
                    console.log("User data:", userData);
                    
                } else {
                    console.error("Failed to fetch user data.");
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        } else {
            console.log('No user info found');
        }
        this.nicknameTxt.Load();
        // 인스턴스 설정
        this.node.name = "UserData";
    }
}
