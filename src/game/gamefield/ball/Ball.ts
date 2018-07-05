import GameField from '../GameField';
import User from '../player/User';
import Ai from '../player/Ai';
import Utils from '../Utils';
import Football from './Sprites';
import Game from '../../Game';
import Keeper from '../player/Keeper';

export default class Ball {
    public x: number;
    public y: number;
    private vel;

    public side: number = 20;
    private speed: number = 13;
    private scoreable: boolean = true;

    private readonly game: Game;

    constructor(game: Game) {
        this.game = game;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(Football, this.x, this.y, 20, 20);
    }

    public update(player: Keeper, ai: Keeper): void {
        this.x += this.vel.x;
        this.y += this.vel.y;
        if (0 > this.y || this.y + this.side > GameField.height) {
            const offset = this.vel.y < 0 ? 0 - this.y : GameField.height - (this.y + this.side);
            this.y += 2 * offset;
            this.vel.y *= -1;
        }

        const keeper = this.vel.x < 0 ? player : ai;

        if (
            Utils.detectCollision(
                keeper.x,
                keeper.y,
                keeper.width,
                keeper.height,
                this.x,
                this.y,
                this.side,
                this.side,
            )
        ) {
            // set the x position and calculate reflection angle
            this.x = keeper === player ? player.x + player.width : ai.x - this.side;
            // Relative offset of ball to keeper (between ~ 0.1 & 0.9)
            let normalizedOffset = (this.y + this.side - keeper.y) / (keeper.height + this.side);
            // Value between -1 and 1 based on position relative to keeper (-1 => top)
            normalizedOffset = 2 * normalizedOffset - 1;
            // Reflection angle
            // PI / 4 = 45deg (=> angle between -45deg and 45deg)
            const ballDeg = Math.PI / keeper.team.getBallPhiDivisor(4) * normalizedOffset;
            // Calculate smash value and update velocity
            const smash = Math.abs(ballDeg) > 0.2 * Math.PI ? 1.5 : 1;
            this.vel.x = smash * keeper.team.getBallSmashMultiplier()
                * (keeper === player ? 1 : -1) * this.speed * Math.cos(ballDeg);
            this.vel.y = smash * keeper.team.getBallSmashMultiplier()
                * this.speed * Math.sin(ballDeg);
        }

        // Reset ball on goal
        if (0 > this.x + this.side || this.x > GameField.width) {
            if (!this.scoreable) {
                return;
            }

            this.scoreable = false;
            const playerBall = keeper === player;

            setTimeout(
                () => {
                    this.serve(playerBall, player, ai);
                    this.scoreable = true;
                },
                1000,
            );

            if (playerBall) {
                this.game.scoreFor('ai');
            } else {
                this.game.scoreFor('user');
            }
        }
    }

    public serve(playerSide: boolean, player: Keeper, ai: Keeper): void {
        // set x and random y position
        const randomness = Math.random();
        this.x = playerSide ? player.x + player.width : ai.x - this.side;
        this.y = (GameField.height - this.side) * randomness;
        // Get angle between -0rad and -0.3rad (0deg and 17deg)
        const phi = 0.1 * Math.PI * (-1 * randomness);
        // x directional
        // speed randomized by a number between ~0.9 and 1 (based on random angel)
        // y vel
        this.vel = {
            x: (playerSide ? 1 : -1) * this.speed * Math.cos(phi),
            y: this.speed * Math.sin(phi),
        };
    }
}
