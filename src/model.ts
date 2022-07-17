export interface FakeAnd {
    useSelectors: (...selectors: any[]) => SelectorFake;
}

export interface SelectorFake {
    and: FakeAnd;
}
