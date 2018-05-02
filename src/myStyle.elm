module MyStyle exposing (configuration)

{-|


# Functions

@docs configuration

-}

import Dict


{-| Configuration contain the variable that will be replaced in the framework.
As example here we overwrite `primary` with the color `#00d1b2`
-}
configuration : Dict.Dict String String
configuration =
    Dict.fromList
        [ ( "primary", "#bf0000" )

        --, ( "font-url", "https://fonts.googleapis.com/css?family=Gugi" )
        --, ( "font-typeface", "Gugi" )
        --, ( "font-fallback", "sans-serif" )
        --, ( "font-url", "https://fonts.googleapis.com/css?family=Noto+Sans" )
        --, ( "font-typeface", "Noto Sans" )
        ]
