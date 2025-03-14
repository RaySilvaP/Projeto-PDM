import { useAuth } from "@/hooks/useAuth";
import { useFirstLaunch } from "@/hooks/useFirstLaunch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect } from "react";

export default function Index() {
    const { tokenState, logout } = useAuth();
    const isFirstLaunch = useFirstLaunch();
    
    if(isFirstLaunch === null)
        return null;

    return (
        isFirstLaunch ?
            <Redirect href={'/welcome'} />
            : tokenState ?
                <Redirect href={'/(tabs)/ScMyPets'} />
                : <Redirect href={'/authentication/login'} />
    );
}
