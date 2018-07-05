import Team from './Team';

export default class Italy implements Team {

    private flag: string = 'data:image/png;base64,iVBORw0KGgo' +
        'AAAANSUhEUgAAAB4AAAAeCAIAAAC0Ujn1AAAACXBIWXMAAC4jAAAu' +
        'IwF4pT92AAAAB3RJTUUH4gcEECIa7OxHRAAAABl0RVh0Q29tbWVu' +
        'dABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA0SURBVEjHY5SarMmA' +
        'GzzNuYZH9oOdHR5ZJgaagVGjR40eNXrU6FGjR40eNXrU6FGjh7/R' +
        'ALcPBKVxB5CbAAAAAElFTkSuQmCC';

    getFlag(): string {
        return this.flag;
    }

    getTeamColor(): string {
        return '#1a9329';
    }

    getTeamName(): string {
        return 'Italien';
    }

    getTeamNameId(): string {
        return 'ita';
    }

    getSpeed(defaultSpeed: number): number {
        return defaultSpeed;
    }

    getKeeperHeight(defaultWidth: number): number {
        return defaultWidth;
    }

    getBallSmashMultiplier(): number {
        return 1.05;
    }

    getBallPhiDivisor(defaultDivisor: number): number {
        return defaultDivisor;
    }

    getSpecialAbilityText(): string {
        return 'Alle Rückschüsse sind 5% schneller';
    }
}
