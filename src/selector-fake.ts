import { MemoizedSelector, Selector } from "@ngrx/store";
import { SelectorFake } from "./model";

export function fakeSelector(object: Record<string, any>, selectorName: string): SelectorFake {
    const originalSelector = object?.[selectorName];
    if (!originalSelector || !(originalSelector as any).projector) {
        throw new Error(selectorName + " is not a memoized selector");
    }
    const fake = { and: { useSelectors: () => fake } };

    const useSelectors = (...selectors: any[]): SelectorFake => {
        const fakeSelector = (state: any) => {
            const projectorArgs = (<Selector<any, any>[]>selectors).map((fn) => fn(state));
            return (originalSelector as MemoizedSelector<any, any>).projector(...projectorArgs);
        };
        object[selectorName] = fakeSelector;

        return fake;
    };

    fake.and.useSelectors = useSelectors;
    return fake;
}
