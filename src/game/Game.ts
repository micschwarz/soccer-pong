import GameField from './gamefield/GameField';
import GameManager from './GameManager';
import Team from './teams/Team';
import Highscore from './Highscore';

export default class Game {

    private timePlayed: number = 0;
    private timeString: Element = document.querySelector('#ui .time');
    private timeLoop: number;

    private gameField: GameField;
    private score: {};

    private gameManager: GameManager;
    private team: Team;
    private teamAi: Team;
    private mulitiplayer: boolean = false;

    constructor(gameManager: GameManager, team: Team, teamAi: Team, multiplayer: boolean) {
        this.gameManager = gameManager;
        this.team = team;
        this.teamAi = teamAi;
        this.mulitiplayer = multiplayer;
        this.initGame(multiplayer);
    }

    private initGame(muliplayer: boolean): void {
        this.resetScore();
        this.renderTimeString(0);

        document.querySelector('#ui #score .flagAi').innerHTML
            = `<img src="${this.teamAi.getFlag()}" width="40" height="40"/>`
            + `<span>${this.teamAi.getTeamNameId().toUpperCase()}</span>`;

        document.querySelector('#ui #score .flagUser').innerHTML
            = `<img src="${this.team.getFlag()}" width="40" height="40"/>`
            + `<span>${this.team.getTeamNameId().toUpperCase()}</span>`;

        document.querySelector('#ui .time').classList.remove('blink');
        document.getElementById('ui').style.display = 'block';
        this.gameField = new GameField(this, muliplayer, this.team, this.teamAi);
        (<HTMLElement>document.getElementsByTagName('canvas')[0]).style.boxShadow
            = `4px 4px 10px ${this.teamAi.getTeamColor()},`
            + ` -4px -4px 10px ${this.team.getTeamColor()},`
            + ` 0px -4px 10px #ffffff, 0px 4px 10px #ffffff`;
        this.score = {
            user: 0,
            ai  : 0,
        };
        this.timeLoop = setInterval(() => this.timeLoopExec(this), 1000);
    }

    public scoreFor(player: string): void {
        this.score[player] += 1;
        this.renderScore(player, this.score);
    }

    public destroy(event: boolean = true): void {
        clearInterval(this.timeLoop);
        this.gameField.destroy();
        this.gameField = null;

        let data: {} = { popup: false };

        if (event) {
            data = {
                score      : this.score,
                multiplayer: this.mulitiplayer,
                teams      : {
                    ai  : this.teamAi.getTeamName(),
                    user: this.team.getTeamName(),
                },
                popup      : true,
            };
        }

        document.dispatchEvent(new CustomEvent('gameDestroyed', { detail: data }));
    }

    private timeLoopExec(scope: Game): void {
        scope.timePlayed = scope.timePlayed + 1;
        scope.renderTimeString(this.timePlayed);

        if (scope.timePlayed >= 60) {
            if (!this.mulitiplayer) {
                Highscore.save(this.score['user'] - this.score['ai']);
            }

            scope.destroy();
            return;
        }

        if (scope.timePlayed >= 50) {
            document.querySelector('#ui .time').classList.add('blink');
        }

    }

    private renderTimeString(seconds: number): void {
        const min: string = ('00' + parseInt(seconds / 60, 10)).substr(-2);
        const sec: string = ('00' + seconds % 60).substr(-2);
        this.timeString.innerHTML = `${min}:${sec}`;
    }

    private renderScore(player: string, score: {}): void {
        document.querySelector(`#score .${player}`).innerHTML = score[player];
    }

    private resetScore(): void {
        document.querySelector(`#score .user`).innerHTML = '0';
        document.querySelector(`#score .ai`).innerHTML = '0';
    }
}
