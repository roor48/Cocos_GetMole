import { _decorator, Component, Input, input, Size, view, Vec3, Prefab } from 'cc';
import { ObjectPool } from '../ObjectPool';
const { ccclass, property } = _decorator;

@ccclass('GenerateHammer')
export class GenerateHammer extends Component {

    @property(Prefab)
    public hammerPrefab: Prefab;
    private pool: ObjectPool;

    start() {

        this.pool = new ObjectPool(this.hammerPrefab);

        // input.on(Input.EventType.MOUSE_DOWN, (event) => {
       
        //     var newHammer = this.pool.getNode();

        //     var temp = event.getLocation();
        //     // console.log('temp: ' + temp);

        //     const canvasSize: Size = view.getDesignResolutionSize();
        //     // console.log('canvas: ' + canvasSize);
        //     const centerOfmouseScreen = new Vec3(canvasSize.width/2, canvasSize.height/2, 0);

        //     // var pos = new Vec3((temp.x*2) - centerOfmouseScreen.x + 43, (temp.y*2) - centerOfmouseScreen.y - 7, 0);
        //     // console.log('pos: ' + pos);

        //     // pos = this.camera.worldToScreen(pos);

            
        //     // console.log(pos.y - temp.y);

        //     // newHammer.position = pos;
        //     newHammer.setParent(this.node);
        // });
    }
    public generateHammer(pos: Vec3) {
        var newHammer = this.pool.getNode();

        newHammer.position = pos;
        newHammer.setParent(this.node);
    }
}
