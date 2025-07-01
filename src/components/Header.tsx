import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaGithub } from "react-icons/fa";

export default function Header() {
    return (
        // Type of the Component
        // [Styling] First of all, we will style the whole header by adding a className,
        // [Styling] that will automatically adjust the sessions inside
        <header className="flex items center justify-between p-4 bg-white shadow-md">
            {/* First Session */}
            {/* [Styling] Now we need to adjust the session in which */}
                {/* The "logo" and GitHub button are */}
                {/* Same thing.. we will use a className */}
            <div className="flex items-center gap-4">
                {/* [LOGIC] This Session will have a logo, and a link inside.*/}
                    {/* The logo at this point, will be represented by the name */}
                    {/* To create it, we need a h1 TAG */}
                {/* [Styling] Now, we need to adjust the text and size of it */}
                <h1 className="text-2xl font-bold text-gray-800">Supernova</h1>

                {/* [LOGIC]  To create a link, we use the `a` TAG */}
                {/* [Styling] Finally, we will adjust the GitHub button */}
                <a 
                    href="https://github.com/77InnovationLabs/NebulaQuest"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-600 transition-colors"
                >
                    {/*  [LOGIC] Inside of this link, we will add the github icon to redirect to our repository */}
                    <FaGithub size={24}/>
                </a>
            </div>
            {/*  [LOGIC] Right after our div, we will have the connect Button */}
            {/*  [LOGIC] Which means, it will be in the extreme right side of the page */}
            <ConnectButton/>
        </header>
    )
}