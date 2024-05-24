import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass
export class ObjectPool{
    public prefab:Prefab = null;
    public arr:Node[] = [];
    public arrSize : number = 0;

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
