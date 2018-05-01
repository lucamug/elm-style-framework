module FrameworkConfiguration exposing (configuration)

import Dict


configuration : Dict.Dict String String
configuration =
    Dict.fromList [ ( "primary", "#00d1b2" ) ]
