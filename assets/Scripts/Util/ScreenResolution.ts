import { _decorator, Component, view, Node, ResolutionPolicy } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScreenResolution')
export class ScreenResolution extends Component {
    @property(Number)
    public screenWidth : number = 540;
    @property(Number)
    public screenHeight : number = 1000;

    protected start(): void {
        view.setDesignResolutionSize(540, 1000, ResolutionPolicy.EXACT_FIT)
        view.setDesignResolutionSize(this.screenWidth, this.screenHeight, ResolutionPolicy.EXACT_FIT)
    }
    
}

