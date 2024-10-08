import { _decorator, AudioSource, Component, director } from 'cc';
import { UserSettings } from '../UserSettings';
import { UserData } from '../UserData';
const { ccclass } = _decorator;

@ccclass('MainMenuManager')
export class MainMenuManager extends Component {

    public audioSource: AudioSource = null;

    protected start(): void {
        this.audioSource = this.getComponent(AudioSource);

        if (UserSettings.instance.isSoundOn) {
            this.audioSource.play();
        }
    }

    public GotoPlayScene() {
        if(UserData.instance.getRemainTry() == 0){
            return;
        }
        this.audioSource.stop();
        director.loadScene("Play");
    }
}
