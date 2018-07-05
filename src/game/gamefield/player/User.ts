import GameField from '../GameField';
import { userImage, aiImage } from './Sprites';
import Keeper from './Keeper';
import Team from '../../teams/Team';

export default class User implements Keeper {

    private game: GameField;
    public width: number = 20;
    public height: number = 100;
    public x: number = this.width;
    public y: number = GameField.height / 2 - this.height / 2;

    private up: string = GameField.upKey;
    private down: string = GameField.downKey;

    private image = userImage;

    public team: Team;

    constructor(game: GameField, team: Team, alternateKeys: boolean = false) {
        this.game = game;
        this.team = team;

        this.height = this.team.getKeeperHeight(this.height);

        if (alternateKeys) {
            this.up = GameField.upKeyAlternative;
            this.down = GameField.downKeyAlternative;
            this.y = (GameField.height - this.height) / 2;
            this.x = GameField.width - this.width * 2;
            this.image = aiImage;
        }
    }

    public update() {
        if (this.game.checkKeyState(this.up)) {
            this.y -= this.team.getSpeed(7);
        }

        if (this.game.checkKeyState(this.down)) {
            this.y += this.team.getSpeed(7);
        }

        this.y = Math.max(Math.min(this.y, GameField.height - this.height), 0);
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.shadowColor = '#222222';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 4;

        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
    }

    destroy(): void {
        // Nothing to do
    }
}
