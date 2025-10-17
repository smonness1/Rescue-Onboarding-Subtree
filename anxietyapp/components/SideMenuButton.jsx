import hamburgerImage from "../assets/images/hamburger.png";
import {Alert, Image, TouchableOpacity} from "react-native";
import {useRef} from "react";

export default function SideMenuButton({sideNavRef}) {
    function handlePress() {
        sideNavRef.current.open()
    }

    return (
        <TouchableOpacity onPress={handlePress}>
            <Image source={hamburgerImage}/>
        </TouchableOpacity>
    )
}
