import {ReactNode} from "react";

export default function GetServerSide({children}: { children: ReactNode }) {
    return (
        <p>Layout - {children}</p>
    );
}