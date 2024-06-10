import { _decorator, Component, Node, Prefab, Quat, Vec3, misc, Vec2, random } from 'cc';
import { ObjectPool } from '../ObjectPool';
const { ccclass, property } = _decorator;

const getRandom = (min:number,max:number) => {
    return Math.random() * (max - min) + min;
}

@ccclass('CatHandGenerator')
export class CatHandGenerator extends Component {

    @property(Prefab)
    private catHandPrefab: Prefab;

    private pool: ObjectPool;

    protected start(): void {
        this.pool = new ObjectPool(this.catHandPrefab);
    }

    public generateEffect(position: Vec3)
    {
        let newCatHand = this.pool.getNode();

        // -60도에서 60도 사이의 랜덤 각도 생성
        let randomDegree = getRandom(-60, 60); // -60도 ~ 60도
        let radian = misc.degreesToRadians(randomDegree); // 라디안으로 변환

        // 회전 축 (여기서는 Z축을 중심으로 회전)
        let axis = new Vec3(0, 0, 1);

        // 회전을 나타내는 Quat 객체 생성
        let quat = new Quat();
        Quat.fromAxisAngle(quat, axis, radian);

        // targetNode의 회전을 Quat 객체로 설정
        newCatHand.setRotation(quat);
        newCatHand.setParent(this.node);
        newCatHand.setPosition(position);
    }
}
