import { useFirstLaunch } from "@/hooks/useFirstLaunch";
import { Redirect } from "expo-router";

export default function Index() {
    const isFirstLaunch = useFirstLaunch();
    return(
        <Redirect href={'/welcome'}/>
    );
}
