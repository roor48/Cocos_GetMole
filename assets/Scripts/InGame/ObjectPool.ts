import { instantiate, Node, Prefab } from 'cc';

export class ObjectPool{
    private prefab:Prefab = null;
    private arr:Node[] = [];
    private arrSize : number = 0;

    constructor(prefab:Prefab) {
        this.prefab = prefab;
    }

    public getNode() : Node{
        for (let i = 0; i < this.arrSize; i++) {
            if (!this.arr[i].active) {
                this.arr[i].active = true;
                return this.arr[i];
            }
        }

        let obj = instantiate(this.prefab);

        this.arrSize = this.arr.push(obj);
        return obj;
    }
}
