interface StyleAttrs {
    mainCol: string;
    loginBg: string;
    mainBg: string;
    loginCenterBg: string;
    buttonBg: string;
    loginCenterShadow: string;
    [x: string]: string;
}

declare interface Result {
    [x: string]: {
        styles: StyleAttrs;
        name: string
    }
}

declare interface PropChild {
    type: StringConstructor;
    default: string;
}

