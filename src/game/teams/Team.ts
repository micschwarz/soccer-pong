export default interface Team {
    getFlag(): string;

    getTeamName(): string;

    getTeamNameId(): string;

    getTeamColor(): string;

    getSpeed(defaultSpeed: number): number;

    getKeeperHeight(defaultWidth: number): number;

    getBallSmashMultiplier(): number;

    getBallPhiDivisor(defaultDivisor: number): number;

    getSpecialAbilityText(): string;
}
