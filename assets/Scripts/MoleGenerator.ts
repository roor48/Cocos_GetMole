import { _decorator, Component, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MoleGenerator')
export class MoleGenerator extends Component {

    @property({
        type: Prefab,
        tooltip: 'Put Mole Prefab Here'
    })
    public molePrefab: Prefab;

    public spawnTime: number;

    start() {

    }

    update(deltaTime: number) {
        
    }
}


