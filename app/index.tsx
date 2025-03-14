import { useAuth } from "@/hooks/useAuth";
import { useFirstLaunch } from "@/hooks/useFirstLaunch";
import { Redirect } from "expo-router";

export default function Index() {
    const { tokenState } = useAuth();
    const isFirstLaunch = useFirstLaunch();

    if(isFirstLaunch === null)
        return null;

    return (
        isFirstLaunch ?
            <Redirect href={'/welcome'} />
            : tokenState ?
                <Redirect href={'/(tabs)/Index'} />
                : <Redirect href={'/authentication/login'} />
    );
}
