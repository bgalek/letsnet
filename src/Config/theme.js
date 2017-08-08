import {
    cyan500,
    grey300,
    white,
    darkBlack,
    fullBlack,
    teal400, amber500, amber100, amber200, tealA700, tealA400
} from "material-ui/styles/colors";

import {fade} from "material-ui/utils/colorManipulator";

export default {
    palette: {
        primary1Color: tealA700,
        primary2Color: tealA400,
        primary3Color: teal400,
        accent1Color: amber500,
        accent2Color: amber100,
        accent3Color: amber200,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: cyan500,
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: fullBlack,
    }
}