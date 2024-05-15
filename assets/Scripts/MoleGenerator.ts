import { _decorator, Component, find, instantiate, Node, Prefab, Scene, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

const random = (min,max) => {
    return Math.random() * (max - min) + min;
}

@ccclass('MoleGenerator')
export class MoleGenerator extends Component {

    @property({
        type: Prefab,
        tooltip: 'Put Mole Prefab Here'
    })
    public molePrefab: Prefab;

    @property({
        type: Node
    })
    public moleParent;

    @property(Number)
    public spawnTime: number = 3;

    @property(Number)
    public curSpawnTime: number = 0;

    public createMole;
    public canvas;

    start() {
        this.canvas = find('Canvas');
    }

    update(deltaTime: number) {
        this.spawnMole(deltaTime);
    }

    spawnMole(deltaTime: number)
    {
        if (this.curSpawnTime > 0) {

            this.curSpawnTime -= deltaTime;
            return;
        }
        this.curSpawnTime = this.spawnTime;

        this.createMole = instantiate(this.molePrefab);
        this.createMole.setParent(this.moleParent);

        let curWidth = this.canvas.position.x;
        let curHeight = this.canvas.position.y;

        // console.log('curWidth: ' + curWidth + ', curHeight: ' + curHeight);

        curWidth -= curWidth / 10;
        curHeight -= curHeight / 10;

        let ranVec3 = new Vec3(random(-curWidth, curWidth), random(-curHeight, curHeight), 0);

        this.createMole.setPosition(ranVec3);
    }
}
