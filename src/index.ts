import GameManager from './game/GameManager';
import Football from './game/gamefield/ball/Sprites';
import Germany from './game/teams/Germany';
import Austria from './game/teams/Austria';
import Team from './game/teams/Team';
import Belgium from './game/teams/Belgium';
import Japan from './game/teams/Japan';
import Italy from './game/teams/Italy';
import Highscore from './game/Highscore';

const teams: [Team] = [new Germany(), new Austria(), new Belgium(), new Japan(), new Italy()];

let gameManager: GameManager;
let teamIndex: number = 0;
let teamAiIndex: number = 0;

document.addEventListener('DOMContentLoaded', () => {

    const bestDiff = Highscore.load();

    if (bestDiff) {
        const highscore = document.querySelector('#menu .highscore');
        (<HTMLElement>highscore.getElementsByClassName('difference')[0]).innerText
            = <string>bestDiff;
        (<HTMLElement>highscore).style.display = 'block';
    }

    const icon = document.createElement('img');
    icon.src = Football.src;
    document.querySelector('#menu .header .icon').appendChild(icon);
    gameManager = new GameManager();
    initMenu();
});

function initMenu(): void {
    document.querySelector('#menu .button.arcade').addEventListener('click', () => {
        document.getElementById('menu').style.display = 'none';
        const userTeam = teams[teamIndex];
        let aiTeam: Team;
        if (teamAiIndex === 0) {
            aiTeam = getRandomAiTeam(userTeam);
        } else {
            aiTeam = teams[teamAiIndex - 1];
        }
        gameManager.initNewGame(userTeam, aiTeam);
    });

    document.querySelector('#menu .button.multiplayer').addEventListener('click', () => {
        document.getElementById('menu').style.display = 'none';
        const userTeam = teams[teamIndex];
        const aiTeam = getRandomAiTeam(userTeam);
        gameManager.initNewGame(userTeam, aiTeam, true);
    });

    document.querySelector('#menu .help .button').addEventListener('click', () => {
        (<HTMLElement>document.querySelector('#helpPopup')).style.display = 'flex';
    });

    document.querySelector('#helpPopup .popup .close').addEventListener('click', () => {
        (<HTMLElement>document.querySelector('#helpPopup')).style.display = 'none';
    });

    const teamContainer = document.querySelector('#menu .team');
    const teamAiContainer = document.querySelector('#menu .teamAi');
    const teamField = teamContainer.querySelector('.teamFlag');
    const teamAiField = teamAiContainer.querySelector('.teamFlag');

    teamContainer.querySelector('.sliderLeft').addEventListener('click', () => {
        const maxLength = teams.length - 1;
        teamIndex = teamIndex > 0 ? teamIndex - 1 : maxLength;
        selectTeam(teamIndex);
    });

    teamAiContainer.querySelector('.sliderLeft').addEventListener('click', () => {
        const maxLength = teams.length;
        teamAiIndex = teamAiIndex > 0 ? teamAiIndex - 1 : maxLength;
        selectTeam(teamAiIndex, 'teamAi');
    });

    teamContainer.querySelector('.sliderRight').addEventListener('click', () => {
        const maxLength = teams.length - 1;
        teamIndex = teamIndex < maxLength ? teamIndex + 1 : 0;
        selectTeam(teamIndex);
    });

    teamAiContainer.querySelector('.sliderRight').addEventListener('click', () => {
        const maxLength = teams.length;
        teamAiIndex = teamAiIndex < maxLength ? teamAiIndex + 1 : 0;
        selectTeam(teamAiIndex, 'teamAi');
    });

    teamAiField.appendChild(getRandomElement());

    const helpMenu = <HTMLElement>document.querySelector('#helpPopup .popup .teamlist');

    teams.forEach((ele: Team) => {
        const teamDiv = document.createElement('div');
        teamDiv.id = `team-${ele.getTeamNameId()}`;
        teamDiv.classList.add('teamFlagEle');
        teamDiv.innerHTML = `<div><img src="${ele.getFlag()}" width="30" height="30"/></div>`
            + `<span>${ele.getTeamName()}</span>`;
        teamDiv.style.display = 'none';
        const teamAiDiv = teamDiv.cloneNode(true);
        teamField.appendChild(teamDiv);
        teamAiField.appendChild(teamAiDiv);

        /* Help menu */
        const teamDescDiv = document.createElement('div');
        teamDescDiv.classList.add('team');
        teamDescDiv.innerHTML = `<div class="name">${ele.getTeamName()}</div>`
            + `<div class="description">${ele.getSpecialAbilityText()}</div>`;
        helpMenu.appendChild(teamDescDiv);
    });

    (<HTMLElement>teamField.getElementsByClassName('teamFlagEle')[0]).style.display = 'flex';
    (<HTMLElement>teamAiField.getElementsByClassName('teamFlagEle')[0]).style.display = 'flex';
}

function selectTeam(teamIndex: number, target: string = 'team'): void {
    const teamEles = document.querySelectorAll(`#menu .${target} .teamFlag .teamFlagEle`);

    for (let i = 0; i < teamEles.length; i = i + 1) {
        (<HTMLElement>teamEles[i]).style.display = 'none';
    }

    (<HTMLElement>teamEles[teamIndex]).style.display = 'flex';
}

function getRandomAiTeam(userTeam: Team): Team {
    const teamsWithoutUser = teams.filter((team: Team) => {
        return team.getTeamNameId() !== userTeam.getTeamNameId();
    });

    const length = teamsWithoutUser.length - 1;
    const randTeam = Math.floor(Math.random() * length);
    return teamsWithoutUser[randTeam];
}

function getRandomElement(): HTMLElement {

    const teamDiv = document.createElement('div');
    teamDiv.id = 'team-ran';
    teamDiv.classList.add('teamFlagEle');
    teamDiv.innerHTML = `<div><img src="${getRandomIcon()}" width="30" height="30"/></div>`
        + '<span>Zufällig</span>';
    teamDiv.style.display = 'none';

    return teamDiv;
}

function getRandomIcon(): string {
    return 'data:image/png;base64,iVBORw0KGgoA' +
        'AAANSUhEUgAAAB4AAAAeCAIAAAC0Ujn1AAAAC' +
        'XBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH4g' +
        'cFDx06IJrOmAAAABl0RVh0Q29tbWVudABDcmV' +
        'hdGVkIHdpdGggR0lNUFeBDhcAAABWSURBVEjH' +
        'YywtLWWgDWBioBmgodEs+KVbW1sxBaurq4dvg' +
        'DBiTSFYwwErwBM4LGRoJtLi4ZT4iExewzFABi' +
        '6jY01wwzqjjxpNVMk3mmVGs8xo4qO/0QAWYxY' +
        'wvNIxJQAAAABJRU5ErkJggg';
}
