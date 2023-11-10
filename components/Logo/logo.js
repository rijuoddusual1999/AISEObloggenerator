import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenFancy } from "@fortawesome/free-solid-svg-icons";

export const Logo = () =>{
    return (
        <div className="text-3xl text-center py-4">BlogBrainiac<FontAwesomeIcon icon={faPenFancy} className="text-2xl text-lime-400 pl-2"/></div>
    )
}