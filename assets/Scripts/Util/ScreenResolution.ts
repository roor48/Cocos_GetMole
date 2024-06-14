import { _decorator, Component, view, Node, ResolutionPolicy } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScreenResolution')
export class ScreenResolution extends Component {
    protected start(): void {
        view.setDesignResolutionSize(540, 1000, ResolutionPolicy.EXACT_FIT)
    }
}


