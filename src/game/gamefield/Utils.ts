export default class Utils {
    public static detectCollision(ax: number, ay: number, aw: number, ah: number, bx: number, by: number, bw: number, bh: number): boolean {
        return ax < bx + bw && ay < by + bh && bx < ax + aw && by < ay + ah;
    }
}
