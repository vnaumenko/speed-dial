type ActionCreatorReturnType<T extends (...args: any[]) => any> = ReturnType<T>;

export type { ActionCreatorReturnType };
