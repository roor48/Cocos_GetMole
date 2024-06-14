import { _decorator, Component, Input, input, Size, view, Vec3, Prefab } from 'cc';
import { ObjectPool } from '././ObjectPool';
const { ccclass, property } = _decorator;

@ccclass('GenerateHammer')
export class GenerateHammer extends Component {

    @property(Prefab)
    public hammerPrefab: Prefab;

    @property(Vec3)
    public offset: Vec3 = new Vec3();


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

        newHammer.position = new Vec3(pos.x + this.offset.x, pos.y + this.offset.y, 0);
        newHammer.setParent(this.node);
    }
}
