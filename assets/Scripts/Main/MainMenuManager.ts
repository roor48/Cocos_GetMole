import { _decorator, Component, director } from 'cc';
const { ccclass } = _decorator;

@ccclass('MainMenuManager')
export class MainMenuManager extends Component {

    public GotoPlayScene() {
        director.loadScene("Play");
    }
}
