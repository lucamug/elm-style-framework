module MyStyle exposing (configuration)

{-|


# Functions

@docs configuration

-}

import Dict


fontName : String
fontName =
    "Gabriela"


{-| Configuration contain the variable that will be replaced in the framework.
As example here we overwrite `primary` with the color `#00d1b2`
-}
configuration : Dict.Dict String String
configuration =
    Dict.fromList
        [ ( "primary", "#9900aa" )
        , ( "font_url", "https://fonts.googleapis.com/css?family=" ++ fontName )
        , ( "font_typeface", fontName )
        , ( "font_fallback", "serif" )
        ]
