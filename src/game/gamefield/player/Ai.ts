import Ball from '../ball/Ball';
import GameField from '../GameField';
import { aiImage } from './Sprites';
import Keeper from './Keeper';
import Team from '../../teams/Team';

export default class Ai implements Keeper {

    private ball: Ball;
    public width = 20;
    public height = 100;
    public x: number = GameField.width - this.width * 2;
    public y: number = (GameField.height - this.height) / 2;
    private nextRandInactiveMove: number = 0;
    private readonly randomMoveLoop: number;
    public team: Team;

    constructor(ball: Ball, team: Team) {
        this.ball = ball;
        this.team = team;

        this.height = this.team.getKeeperHeight(this.height);

        this.randomMoveLoop = setInterval(() => this.calculateRandomMovement(this), 500);
    }

    public update(): void {
        if (this.ball.x < GameField.width / 3) {
            this.y += this.nextRandInactiveMove;
        } else {
            // New Position based on ball
            const newPosY = Math.min(this.ball.y - (this.height - this.ball.side) / 2);
            let movement = (newPosY - this.y) * 0.2;

            // Slow down ai keeper if to fast
            movement = this.correctMovementSpeed(movement);

            this.y += movement;
        }

        // Correct position if Player is outside of game-field
        this.y = Math.max(Math.min(this.y, GameField.height - this.height), 0);
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.shadowColor = '#222222';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 4;

        ctx.drawImage(aiImage, this.x, this.y, this.width, this.height);
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
    }

    private correctMovementSpeed(currentSpeed: number): number {
        if (currentSpeed > this.team.getSpeed(7) || currentSpeed < this.team.getSpeed(7) * -1) {
            const negativeMov = currentSpeed < 0;
            return negativeMov ? this.team.getSpeed(7) * -1 : this.team.getSpeed(7);
        }
        return currentSpeed;
    }

    private calculateRandomMovement(scope: Ai): void {
        scope.nextRandInactiveMove = Math.floor(Math.random() * 5);
        if (Math.random() < 0.5) {
            scope.nextRandInactiveMove *= -1;
        }
    }

    public destroy(): void {
        clearInterval(this.randomMoveLoop);
    }
}
