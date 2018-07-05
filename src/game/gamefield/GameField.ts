import User from './player/User';
import Ai from './player/Ai';
import Ball from './ball/Ball';
import Game from '../Game';
import Keeper from './player/Keeper';
import Team from '../teams/Team';

export default class GameField {

    public static width: number = Math.min(window.innerWidth, 900);
    public static height: number = Math.min(window.innerHeight, 500);

    public static upKey: string = 'ArrowUp';
    public static upKeyAlternative: string = 'PageUp';
    public static downKey: string = 'ArrowDown';
    public static downKeyAlternative: string = 'PageDown';

    private keyState: object = {};

    private readonly drawContext: CanvasRenderingContext2D;

    private user: Keeper;
    private ai: Keeper;
    private ball: Ball;

    private gameLoop: () => void;

    constructor(game: Game, multiplayer: boolean, user: Team, ai: Team) {
        const canvas = document.createElement('canvas');
        canvas.width = GameField.width;
        canvas.height = GameField.height;
        canvas.style.cursor = 'none';

        this.drawContext = canvas.getContext('2d');
        this.drawContext.imageSmoothingEnabled = false;
        document.body.appendChild(canvas);

        document.addEventListener('keydown', (evt) => {
            this.keyState[evt.key] = true;
        });

        document.addEventListener('keyup', (evt) => {
            delete this.keyState[evt.key];
        });

        this.init(game, multiplayer, user, ai);

        this.gameLoop = () => {
            this.update();
            this.draw();

            window.requestAnimationFrame(this.gameLoop);
        };

        window.requestAnimationFrame(this.gameLoop);
    }

    public checkKeyState(key: string): boolean {
        return this.keyState[key] !== undefined && this.keyState[key];
    }

    private init(game: Game, twoPlayer: boolean, user: Team, ai: Team): void {
        this.ball = new Ball(game);
        this.user = new User(this, user);
        this.ai = twoPlayer ? new User(this, ai, true) : new Ai(this.ball, ai);
        this.ball.serve(true, this.user, this.ai);
    }

    private update(): void {
        this.user.update();
        this.ai.update();
        this.ball.update(this.user, this.ai);
    }

    private draw(): void {
        this.drawContext.fillStyle = '#7cb342';
        this.drawContext.fillRect(0, 0, GameField.width, GameField.height);

        this.drawContext.save();

        this.drawField();
        this.drawContext.fillStyle = '#ffffff';

        this.user.draw(this.drawContext);
        this.ai.draw(this.drawContext);
        this.ball.draw(this.drawContext);

        this.drawContext.restore();
    }

    private drawField(): void {
        const lineWidth = 4;
        const xPos = (GameField.width - lineWidth) / 2;

        this.drawContext.lineWidth = lineWidth;
        this.drawContext.fillStyle = '#dcedc8';
        this.drawContext.strokeStyle = '#dcedc8';

        this.drawContext.fillRect(xPos, 0, lineWidth, GameField.height);

        this.drawContext.beginPath();
        this.drawContext.arc(GameField.width / 2, GameField.height / 2, 100, 0, Math.PI * 2);
        this.drawContext.stroke();
    }

    public destroy(): void {
        this.gameLoop = () => {
        };

        this.ai.destroy();
    }
}
