export interface IAppStore {
    nightmode: boolean;
    mobile: boolean;
    menu: boolean;
    loading: boolean;
    toggleAuth(): void;
    toggleMenu(): void;
    auth?: boolean;
    initializeApp(): void;
    onMobile(isMobile: boolean): void;
}