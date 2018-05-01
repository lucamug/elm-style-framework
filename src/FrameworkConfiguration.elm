module FrameworkConfiguration exposing (configuration)

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
    Dict.fromList [ ( "primary", "#00d1b2" ) ]
