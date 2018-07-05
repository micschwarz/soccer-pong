import Team from '../../teams/Team';

export default interface Keeper {

    x: number;
    y: number;
    width: number;
    height: number;
    team: Team;

    draw(ctx: CanvasRenderingContext2D): void;
    update(): void;
    destroy(): void;
}
