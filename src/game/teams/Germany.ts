import Team from './Team';

export default class Germany implements Team {

    private flag: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAIAA' +
        'AC0Ujn1AAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH4g' +
        'cEDjMn8eWmPwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR' +
        '0lNUFeBDhcAAAAxSURBVEjHY2AYBaNgFAwOwPje1' +
        'pZGRjPRztWjRo8aPRyNZvx8QWo0QEaNHjV6MBgNADd' +
        'cA21vu86uAAAAAElFTkSuQmCC';

    getFlag(): string {
        return this.flag;
    }

    getTeamColor(): string {
        return '#fafafa';
    }

    getTeamName(): string {
        return 'Deutschland';
    }

    getTeamNameId(): string {
        return 'ger';
    }

    getSpeed(defaultSpeed: number): number {
        return defaultSpeed;
    }

    getKeeperHeight(defaultWidth: number): number {
        return defaultWidth + 10;
    }

    getBallSmashMultiplier(): number {
        return 1;
    }

    getBallPhiDivisor(defaultDivisor: number): number {
        return defaultDivisor;
    }

    getSpecialAbilityText(): string {
        return 'Der Keeper ist 10% breiter';
    }
}
