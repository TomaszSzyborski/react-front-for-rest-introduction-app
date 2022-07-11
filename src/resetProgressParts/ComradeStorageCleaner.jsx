import {useModal} from "../utils/contexts/modalContext";


export default function ComradeStorageCleaner() {
    const {setMessage} = useModal();


    const buttonLabel = "Reset progress for information gathering".split(" ").join("\n")

    return (
        <button className={"button is-warning is-large resetProgressButton new-line"}
                onClick={() => {
                    localStorage.clear()
                    sessionStorage.clear()
                    setMessage("Time Variance Branching\nmerged and reset\nto 18:17:24 25-04-1986")
                }}>
            {buttonLabel}
        </button>
    );
}
