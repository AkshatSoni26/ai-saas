"use client"

import {Crisp} from "crisp-sdk-web"
import { useEffect } from "react"

export const CrispChat = () => {
    
    useEffect(
        () => {
            Crisp.configure("48c080e4-9ffb-45ab-8a93-0073de54463d")
        }, []
    )

    return null;
    
}