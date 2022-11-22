import {useState} from "react";

export default function useToggle(initial = true) {
    const [visible, setVisible] = useState(initial);

    function toggle() {
        setVisible(prevState => !prevState);
    }

    return [visible, toggle];
}