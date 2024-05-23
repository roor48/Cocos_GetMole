import { _decorator, assetManager, Component, find, instantiate, Node, Prefab, Scene, Vec3, resources, TextAsset, CCInteger } from 'cc';
const { ccclass, property } = _decorator;

const getRandomInt = (min:number,max:number) => {
    return Math.floor(Math.random() * (max - min) + min);
}

@ccclass
export class GenerateInformation {
    public spawnDelay;
    public maxSpawnCount;

    constructor(spawnDelay: number, maxSpawnCount: number)
    {
        this.spawnDelay = spawnDelay;
        this.maxSpawnCount = maxSpawnCount;
    }
}

@ccclass('MoleGenerator')
export class MoleGenerator extends Component {
    @property({
        type: Prefab,
        tooltip: 'Put Mole Prefab Here'
    })
    public molePrefab: Prefab;

    @property([Node])
    public moleParents : Node[] = [];

    @property(Number)
    public maxSpawnDelay: number = 0;
    @property(Number)
    public curSpawnDelay: number = 0;

    @property(Number)
    public maxSpawnCount: number = 0;
    @property(Number)
    public curSpawnCount: number = 0;

    @property(CCInteger)
    public dataIdx : number;
    public data : GenerateInformation[] = [];

    public createMole;
    public canvas;

    start() {
        this.canvas = find('Canvas');
        
        resources.load('MoleSpawnData', TextAsset, (err, textAsset) => {
            if (err) {
                console.error('Failed to load CSV file:', err);
                return;
            }
        
            // CSV 내용을 문자열로 가져옴
            const csvContent = textAsset.text;
        
            // CSV 파싱
            const rows = csvContent.split('\n');
            const csv_data = rows.map(row => row.split(','));

            // 첫번째 요소 삭제
            csv_data.shift();
            // 파싱된 데이터 출력
            // console.log(csv_data);
        
            // 데이터를 활용하여 게임 로직 구현
            csv_data.forEach(row => {
                // console.log(Number(row[0]), Number(row[1]))
                this.data.push(new GenerateInformation(Number(row[0]), Number(row[1])));
            });

            this.dataIdx = 0;
            this.maxSpawnCount = this.data[0].maxSpawnCount;
            this.maxSpawnDelay = this.data[0].spawnDelay;
        });
    }

    public isSpawnAll : boolean = false;
    update(deltaTime: number) {
        if (this.isSpawnAll) {
            return;
        }
        if (this.data.length == 0) {
            return;
        }

        this.spawnMole(deltaTime);
    }
    
    spawnMole(deltaTime: number)
    {
        if (this.curSpawnDelay > 0) {
            this.curSpawnDelay -= deltaTime;
            return;
        }
        
        this.createMole = instantiate(this.molePrefab);
        this.createMole.setParent(this.moleParents[getRandomInt(0, this.moleParents.length)]);
        this.createMole.setPosition(Vec3.ZERO);
        
        let curWidth = this.canvas.position.x;
        let curHeight = this.canvas.position.y;
        
        // console.log('curWidth: ' + curWidth + ', curHeight: ' + curHeight);
        
        curWidth -= curWidth / 10;
        curHeight -= curHeight / 10;
        
        // let ranVec3 = new Vec3(random(-curWidth, curWidth), random(-curHeight, curHeight), 0);
        
        
        this.curSpawnCount++;
        if (this.curSpawnCount >= this.maxSpawnCount) {
            this.dataIdx++;
            if (this.dataIdx >= this.data.length) {
                this.isSpawnAll = true;
                console.log("Spawn Finish!");
                return;
            }

            this.maxSpawnCount = this.data[this.dataIdx].maxSpawnCount;
            this.maxSpawnDelay = this.data[this.dataIdx].spawnDelay;

            this.curSpawnCount = 0;
        }
        this.curSpawnDelay = this.maxSpawnDelay;
    }
}
