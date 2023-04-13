type XPConfigType = {
    card: {
        background: {
            type: "COLOR" | "IMAGE",
            data: string
        },
        status: {
            circle: boolean,
            width: number,
            useCurrent: boolean,
            custom: string
        },
        overlay: {
            color: string,
            opacity: number,
            display: boolean
        }
    }
}

export const XPConfig: XPConfigType = {
    card: {
        background: {
            type: "COLOR", // can be "COLOR" or "IMAGE"
            data: "#2C3E50" // if type is "color" then data is the color, if type is "image" then data is the image url
        },
        status: {
            circle: true, // if true then the status will be circular
            width: 5, // the width of the status circle
            useCurrent: false, // if true then it will use the current status of the user
            custom: "#FF0000" // if useCurrent is false then it will use this color
        },
        overlay: {
            color: "#FFFFFF",
            opacity: 0.5,
            display: true
        }
    }
}