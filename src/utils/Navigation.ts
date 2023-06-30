import {CommonActions, StackActions, DrawerActions, useNavigation} from '@react-navigation/native';

let _navigator: any;

const reset = (name: string) => {
    _navigator.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [{name}],
        }),
    );
};

function setTopLevelNavigator(navigatorRef: any) {
    _navigator = navigatorRef;
}

function navigate(name: string, params?: object, key?: string): any {
    _navigator.dispatch(
        CommonActions.navigate({
            name,
            params,
            key,
        }),
    );
}

function push(name: string, params?: object) {
    _navigator.dispatch(StackActions.push(name, params));
}

function openDrawer() {
    _navigator.dispatch(DrawerActions.openDrawer());
}

function goBack() {
    _navigator.dispatch(CommonActions.goBack());
}

function pop(n = 1) {
    _navigator.dispatch(StackActions.pop(n));
}

function popToTop() {
    _navigator.dispatch(StackActions.popToTop());
}

// add other navigation functions that you need and export them

export const Navigation = {
    navigate,
    setTopLevelNavigator,
    push,
    openDrawer,
    goBack,
    reset,
    pop,
    popToTop,
};
